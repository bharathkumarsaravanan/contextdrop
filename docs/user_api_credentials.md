# ContextDrop Database Setup

This document contains the database setup queries used by ContextDrop.

## User API Credentials

The `user_api_credentials` table stores encrypted third-party API
credentials for each authenticated user.

Current provider:

-   OpenRouter

The API key must **never** be stored as plaintext. Encryption and
decryption are handled only on the server.

## 1. Create the credentials table

``` sql
create table public.user_api_credentials (
  id uuid primary key default gen_random_uuid(),

  user_id uuid not null unique
    references auth.users(id)
    on delete cascade,

  provider text not null default 'openrouter',

  encrypted_api_key text not null,
  iv text not null,
  auth_tag text not null,

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
```

### Column purpose

  Column                Purpose
  --------------------- --------------------------------------------------------
  `id`                  Unique credential record ID
  `user_id`             Owner of the credential
  `provider`            API provider, currently `openrouter`
  `encrypted_api_key`   Encrypted API key ciphertext
  `iv`                  Initialization vector used during encryption
  `auth_tag`            Authentication tag used to verify ciphertext integrity
  `created_at`          Record creation timestamp
  `updated_at`          Last update timestamp

## 2. Enable Row Level Security

``` sql
alter table public.user_api_credentials
enable row level security;
```

## 3. RLS Policies

### Select own credentials

``` sql
create policy "Users can view own API credentials"
on public.user_api_credentials
for select
using (auth.uid() = user_id);
```

### Insert own credentials

``` sql
create policy "Users can insert own API credentials"
on public.user_api_credentials
for insert
with check (auth.uid() = user_id);
```

### Update own credentials

``` sql
create policy "Users can update own API credentials"
on public.user_api_credentials
for update
using (auth.uid() = user_id)
with check (auth.uid() = user_id);
```

### Delete own credentials

``` sql
create policy "Users can delete own API credentials"
on public.user_api_credentials
for delete
using (auth.uid() = user_id);
```

## Security Notes

-   Never store raw API keys in the database.
-   Never expose decrypted API keys to Client Components.
-   Encryption and decryption must happen in server-only code.
-   The encryption secret must be stored in a server-side environment
    variable.
-   Do not prefix the encryption secret with `NEXT_PUBLIC_`.
-   The saved API key should not be returned to the browser after
    storage.
-   The settings UI should only expose configuration state, such as
    `API key configured`.

## Planned Request Flow

``` text
User enters OpenRouter API key
        |
        v
Client form
        |
        v
Server Action
        |
        v
Validate input
        |
        v
Encrypt on server
        |
        v
Store encrypted credential in Supabase
```

Optimization flow:

``` text
Optimization request
        |
        v
Does the user have an API key?
       / \
     Yes  No
      |    |
      v    v
Decrypt   Check free quota
      |      / \
      v    Yes  No
OpenRouter |    |
           v    v
       App key  Limit error
```

## Current Implementation Status

-   [x] Create `user_api_credentials` table
-   [x] Enable RLS
-   [x] Add ownership policies
-   [ ] Add server-only encryption/decryption helpers
-   [ ] Add API key save Server Action
-   [ ] Connect configuration form
-   [ ] Show configured/not-configured state
-   [ ] Use user API key for optimization when configured
-   [ ] Fall back to ContextDrop free optimization quota

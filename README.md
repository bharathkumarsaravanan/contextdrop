```md
# ContextDrop

ContextDrop is an AI workspace memory tool that helps developers turn scattered project notes into structured, AI-ready context.

It provides a persistent memory layer for AI-assisted development, allowing users to organize project knowledge and access it directly through supported AI clients.

## Status

- Status: Production
- Version: `v2.2.0`
- Framework: Next.js
- Runtime: Cloudflare Workers
- Deployment: Cloudflare
- Database & Auth: Supabase
- Styling: Tailwind CSS
- UI: shadcn/ui
- Language: TypeScript

## Core Features

- User authentication with Supabase
- Workspace/project management
- Project memory blocks
- Generated project context
- AI context optimization
- API key / BYOK support
- Cursor integration through remote MCP
- OAuth 2.1 authentication for MCP
- Active MCP project selection
- Read-only project context and memory access from Cursor

## Architecture

```text
                         ContextDrop
                              |
                ┌─────────────┴─────────────┐
                |                           |
          Next.js Web App              MCP Server
                |                           |
                |                           |
          Cloudflare Workers          Cloudflare Workers
                |                           |
                └─────────────┬─────────────┘
                              |
                           Supabase
                              |
             ┌────────────────┼────────────────┐
             |                |                |
          Auth            Workspaces        Memory
                              |
                       User Preferences
                              |
                    Active MCP Project
```

The web application and MCP server are maintained as separate services and repositories.

## MCP Integration

ContextDrop supports remote MCP integration with AI clients such as Cursor.

Production MCP endpoint:

```text
https://mcp.usecontextdrop.com/mcp
```

The MCP integration is currently read-only.

Available MCP tools:

```text
get_project_context()
search_memory(query)
ping()
```

### Active Project

The user selects the active MCP project from:

```text
ContextDrop
→ Settings
→ MCP & Integrations
```

The selected project is stored in:

```text
user_preferences.active_mcp_workspace_id
```

Cursor does not provide or select the workspace ID.

Instead:

```text
ContextDrop UI
      ↓
Active MCP project
      ↓
Supabase
      ↓
ContextDrop MCP
      ↓
Cursor
```

Changing the active project does not require reconnecting OAuth.

## Tech Stack

### Frontend

- Next.js App Router
- TypeScript
- Tailwind CSS
- shadcn/ui
- React

### Backend / Data

- Supabase Auth
- Supabase Postgres
- Supabase Row Level Security (RLS)

### AI

- OpenRouter
- AI context optimization
- BYOK support

### MCP

- Model Context Protocol
- OAuth 2.1
- Streamable HTTP
- Cloudflare Workers

### Analytics

- PostHog

## Project Structure

```text
contextdrop/
├── app/
│   ├── dashboard/
│   ├── oauth/
│   └── ...
├── components/
├── docs/
├── lib/
├── public/
├── types/
├── middleware.ts
├── package.json
└── wrangler.jsonc
```

## Local Development

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

## Type Checking

```bash
npm run typecheck
```

## Production Build

ContextDrop is deployed to Cloudflare using OpenNext.

Build the Cloudflare deployment:

```bash
npm run cf:build
```

Deploy:

```bash
npx wrangler deploy
```

## Cloudflare Deployment

The application uses:

```text
Next.js
    ↓
OpenNext
    ↓
Cloudflare Workers
```

The production application is hosted on Cloudflare rather than Vercel.

Production:

```text
https://usecontextdrop.com
```

## Environment Variables

The application uses environment variables for Supabase and AI integrations.

Do not commit secrets to the repository.

Typical configuration includes:

```text
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
```

Additional environment variables may be required for AI providers, analytics, and BYOK functionality.

## Authentication

ContextDrop uses Supabase Auth.

The web application uses authenticated Supabase sessions for:

- Dashboard access
- Workspace access
- Memory management
- User preferences
- MCP project selection

Supabase Row Level Security remains the primary authorization boundary for user-owned data.

## MCP Security Model

The MCP integration follows these principles:

- OAuth authenticates the ContextDrop user
- The MCP server does not trust client-supplied user IDs
- MCP tools do not accept workspace IDs
- Active project selection happens inside ContextDrop
- Supabase RLS enforces data access
- MCP is read-only in `v2.2.0`
- No MCP-specific database is created
- No service-role Supabase client is exposed to MCP

## Current MCP Scope

Currently supported:

- Read active project context
- Search project memory
- Switch active MCP project from ContextDrop
- Cursor integration through remote MCP

Not currently implemented:

- Saving memories through MCP
- Updating memories through MCP
- Deleting memories through MCP
- Automatic memory extraction
- Embeddings/vector search
- Browser extension
- Automatic project selection

## Deployment Architecture

```text
User
 |
 v
https://usecontextdrop.com
 |
 v
Cloudflare Workers
 |
 v
Next.js / OpenNext
 |
 v
Supabase
```

MCP clients use a separate production service:

```text
Cursor
 |
 | OAuth 2.1
 | Streamable HTTP
 v
https://mcp.usecontextdrop.com/mcp
 |
 v
Cloudflare Worker
 |
 v
Supabase
```

## Version

Current release:

```text
v2.2.0
```

## Related Repository

ContextDrop MCP is maintained separately from the web application.

```text
contextdrop
    ↓
Web application

contextdrop-mcp
    ↓
Remote MCP server
```
```

### One thing I'd remove completely

The old sections:

```md
## Learn More
...
## Deploy on Vercel
...
```
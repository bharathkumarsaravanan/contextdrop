import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { ConsentActions } from "./consent-actions";

type ConsentPageProps = {
  searchParams: Promise<{
    authorization_id?: string;
  }>;
};

export default async function ConsentPage({
  searchParams,
}: ConsentPageProps) {
  const { authorization_id: authorizationId } = await searchParams;

  if (!authorizationId) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-background px-6">
        <div className="w-full max-w-md rounded-xl border bg-card p-8 shadow-sm">
          <h1 className="text-xl font-semibold">Invalid authorization request</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            This OAuth request is missing the required authorization ID.
          </p>
        </div>
      </main>
    );
  }

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect(
      `/login?redirect=/oauth/consent?authorization_id=${encodeURIComponent(
        authorizationId,
      )}`,
    );
  }

  const { data: authorizationDetails, error } =
    await supabase.auth.oauth.getAuthorizationDetails(authorizationId);

  if (error || !authorizationDetails) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-background px-6">
        <div className="w-full max-w-md rounded-xl border bg-card p-8 shadow-sm">
          <div className="mb-6 flex size-12 items-center justify-center rounded-xl border bg-muted">
            <span className="text-lg font-semibold">!</span>
          </div>

          <h1 className="text-xl font-semibold">Authorization Error</h1>

          <p className="mt-2 text-sm text-muted-foreground">
            {error?.message ?? "This authorization request is invalid or has expired."}
          </p>
        </div>
      </main>
    );
  }

  if (!("authorization_id" in authorizationDetails)) {
    redirect(authorizationDetails.redirect_url);
  }

  const scopes = authorizationDetails.scope
    ? authorizationDetails.scope.split(" ")
    : [];

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-6 py-12">
      <div className="w-full max-w-md">
        {/* Brand */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-3 flex size-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            C
          </div>

          <p className="text-sm font-medium text-muted-foreground">
            ContextDrop
          </p>
        </div>

        {/* Consent card */}
        <div className="rounded-2xl border bg-card p-8 shadow-sm">
          <div className="text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Authorize {authorizationDetails.client.name}
            </h1>

            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              This application wants to access your ContextDrop account.
            </p>
          </div>

          {/* User */}
          <div className="mt-8 rounded-lg border bg-muted/40 px-4 py-3">
            <p className="text-xs text-muted-foreground">Signed in as</p>
            <p className="mt-1 truncate text-sm font-medium">{user.email}</p>
          </div>

          {/* Permissions */}
          <div className="mt-6">
            <p className="text-sm font-medium">Requested permissions</p>

            <div className="mt-3 space-y-2">
              {scopes.length > 0 ? (
                scopes.map((scope) => (
                  <div
                    key={scope}
                    className="flex items-center gap-3 rounded-lg border px-3 py-2.5"
                  >
                    <div className="size-2 rounded-full bg-primary" />
                    <span className="text-sm">{scope}</span>
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">
                  No additional permissions requested.
                </p>
              )}
            </div>
          </div>

          <div className="mt-8 space-y-3">
            <ConsentActions authorizationId={authorizationId} />
          </div>
        </div>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          You can revoke access later from your account settings.
        </p>
      </div>
    </main>
  );
}
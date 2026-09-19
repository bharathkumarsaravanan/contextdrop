import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { ConsentActions } from "./consent-actions";
import { BookOpen, Search, ShieldCheck } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

type ConsentPageProps = {
  searchParams: Promise<{
    authorization_id?: string;
  }>;
};

export default async function ConsentPage({ searchParams }: ConsentPageProps) {
  const { authorization_id: authorizationId } = await searchParams;

  if (!authorizationId) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-background px-6">
        <div className="w-full max-w-md rounded-xl border bg-card p-8 shadow-sm">
          <h1 className="text-xl font-semibold">
            Invalid authorization request
          </h1>
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
            {error?.message ??
              "This authorization request is invalid or has expired."}
          </p>
        </div>
      </main>
    );
  }

  if (!("authorization_id" in authorizationDetails)) {
    redirect(authorizationDetails.redirect_url);
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-6 py-12">
      <div className="w-full max-w-md">
        {/* Brand */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-3 flex size-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <Image src="../../icon.svg" alt="ContextDrop" width={30} priority />
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
          <Card className="mt-6">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-2">
                <ShieldCheck className="size-4 text-primary" />
                <CardTitle className="text-sm font-medium">
                  ContextDrop access
                </CardTitle>
              </div>
            </CardHeader>

            <CardContent className="space-y-3">
              <div className="flex items-start gap-3 rounded-lg border bg-muted/30 p-3">
                <div className="flex size-8 shrink-0 items-center justify-center rounded-md bg-background">
                  <BookOpen className="size-4 text-muted-foreground" />
                </div>

                <div>
                  <p className="text-sm font-medium">Read project context</p>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    Access your selected ContextDrop project context.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 rounded-lg border bg-muted/30 p-3">
                <div className="flex size-8 shrink-0 items-center justify-center rounded-md bg-background">
                  <Search className="size-4 text-muted-foreground" />
                </div>

                <div>
                  <p className="text-sm font-medium">Search project memories</p>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    Search memories stored in your ContextDrop project.
                  </p>
                </div>
              </div>

              <p className="pt-1 text-xs leading-5 text-muted-foreground">
                This connection is read-only. It does not expose tools to
                create, edit, or delete your ContextDrop data.
              </p>
            </CardContent>
          </Card>

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

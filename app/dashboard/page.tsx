import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { LogoutButton } from "@/components/auth/logout-button";
import { DashboardShell } from "@/components/layouts/dashboard-shell";
import { EmptyState } from "@/components/workspace/empty-state";
import { getWorkspaces } from "@/lib/workspaces";
import { Workspace } from "@/types/workspace";
import { CreateWorkspaceDialog } from "@/components/workspace/create-workspace-dialog";
import { OnboardingDialog } from "@/components/workspace/onboarding-dialog";
import { WorkspaceSearch } from "@/components/workspace/workspace-search";

export const metadata = {
  title: "Dashboard",
};

export default async function DashboardPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const workspaces: Workspace[] = await getWorkspaces();

  return (
    <DashboardShell>
      <div className="space-y-8">
        <div className="flex items-start justify-between gap-6">
          <div>
            <p className="text-sm font-medium uppercase tracking-wider text-primary">
              Workspace
            </p>

            <h1 className="mt-2 text-3xl font-bold tracking-tight">
              Your Workspaces
            </h1>

            <p className="mt-1 max-w-xl text-sm leading-6 text-zinc-500">
              Organize your projects and the persistent memory your AI uses to
              understand them.
            </p>

            {workspaces.length !== 0 && (
              <div className="mt-5">
                <CreateWorkspaceDialog />
              </div>
            )}
          </div>

          <div className="flex items-center">
            <LogoutButton />
          </div>
        </div>
        {workspaces.length === 0 ? (
          <EmptyState />
        ) : (
            <WorkspaceSearch 
              workspaces={workspaces}
            />
        )}
      </div>
      <OnboardingDialog />
    </DashboardShell>
  );
}

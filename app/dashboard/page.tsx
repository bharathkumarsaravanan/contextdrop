import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { LogoutButton } from "@/components/auth/logout-button";
import { DashboardShell } from "@/components/layouts/dashboard-shell";
import { EmptyState } from "@/components/workspace/empty-state";
import { getWorkspaces } from "@/lib/workspaces";
import { Workspace } from "@/types/workspace";
import { CreateWorkspaceDialog } from "@/components/workspace/create-workspace-dialog";
import { WorkspaceCard } from "@/components/workspace/workspace-card";
import { OnboardingDialog } from "@/components/workspace/onboarding-dialog";

export default async function DashboardPage() {
    const supabase = await createClient();

    const {
        data: { user }
    } = await supabase.auth.getUser();

    if (!user) {
        redirect("/login")
    }

    const workspaces:Workspace[] = await getWorkspaces();

    return (
        <DashboardShell>
            <div className="space-y-8">
                <div className="flex justify-between items-start">
                    <div>
                        <h1 className="text-3xl font-bold">
                            Workspaces
                        </h1>
                        <p className="mt-1 text-zinc-500">
                            Organize reusable AI memory.
                        </p>
                        {workspaces.length !== 0 && <CreateWorkspaceDialog />}
                    </div>
                    <div className="flex items-center">
                        <LogoutButton />
                    </div>
                </div>
                {
                    workspaces.length === 0 ? (
                        <EmptyState />
                    ) : (
                        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                            {
                                workspaces.map(workspace => (
                                    <WorkspaceCard 
                                      key={workspace.id}
                                      workspace={workspace}
                                    />
                                ))
                            }
                        </div>
                    )
                }
            </div>
            <OnboardingDialog />
        </DashboardShell>
    )
}
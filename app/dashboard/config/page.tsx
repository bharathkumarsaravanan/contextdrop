import { DashboardShell } from "@/components/layouts/dashboard-shell";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ApiKeyForm } from "./api-key-form";
import { createClient } from "@/lib/supabase/server";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getWorkspaces } from "@/lib/workspaces";
import { getUserPreferences } from "@/lib/user-preferences";
import { McpSettings } from "./mcp-settings";
import { PlanSettings } from "./plan-settings";
import { PLAN_LIMITS, isProSubscription, type BillingSubscription } from "@/lib/billing/plans";
import { getMcpGrants } from "./actions";
import { getPaddleEnvironment } from "@/lib/billing/paddle-config";


export const metadata = {
  title: "AI Settings",
};

export default async function ConfigPage() {

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let hasApiKey = false;
  let remainingOptimizations = 10;
  let plan: "free" | "pro" = "free";
  let subscription: BillingSubscription | null = null;
  let workspaceCount = 0;
  let memoryBlockCount = 0;
  let aiClientCount = 0;
  let optimizationCount = 0;

  if (user) {
    const { data: subscriptionData } = await supabase
      .from("billing_subscriptions")
      .select("user_id, paddle_customer_id, paddle_subscription_id, status, price_id, current_period_end, scheduled_change_action")
      .eq("user_id", user.id)
      .maybeSingle();

    subscription = subscriptionData as BillingSubscription | null;
    plan = isProSubscription(subscription) ? "pro" : "free";
    const { data } = await supabase
      .from("user_api_credentials")
      .select("id")
      .eq("user_id", user.id)
      .maybeSingle();

    const { data: usage } = await supabase
      .from("ai_usage")
      .select("optimization_count")
      .eq("user_id", user.id)
      .maybeSingle();

    const now = new Date();
    const monthStart = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 1))
      .toISOString()
      .slice(0, 10);
    const { data: monthlyUsage } = await supabase
      .from("ai_monthly_usage")
      .select("optimization_count")
      .eq("user_id", user.id)
      .eq("month_start", monthStart)
      .maybeSingle();

    optimizationCount = plan === "pro"
      ? monthlyUsage?.optimization_count ?? 0
      : usage?.optimization_count ?? 0;
    remainingOptimizations = Math.max(
      PLAN_LIMITS[plan].optimizations - optimizationCount,
      0,
    );

    const { count: workspaces } = await supabase
      .from("workspaces")
      .select("id", { count: "exact", head: true });
    workspaceCount = workspaces ?? 0;

    const { count: memories } = await supabase
      .from("memory_blocks")
      .select("id", { count: "exact", head: true });
    memoryBlockCount = memories ?? 0;

    const grantsResult = await getMcpGrants();
    aiClientCount = "grants" in grantsResult ? grantsResult.grants?.length ?? 0 : 0;

    hasApiKey = !!data;
  }

  const workspaces = await getWorkspaces();
  const preferences = await getUserPreferences();

  return (
    <DashboardShell>
      <div className=" w-full max-w-3xl space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
          <p className="mt-1 text-muted-foreground">
            Manage your AI and MCP configuration.
          </p>
        </div>

        <Tabs defaultValue="ai" className="flex w-full flex-col gap-2">
          <TabsList className="h-10 w-fit bg-muted/50 p-1">
            <TabsTrigger value="ai" className="px-4">
              AI Configuration
            </TabsTrigger>

            <TabsTrigger value="mcp" className="px-4">
              MCP & Integrations
            </TabsTrigger>

            <TabsTrigger value="subscription" className="px-4">
              Pricing & Subscription
            </TabsTrigger>
          </TabsList>
          {/* AI  */}
          <TabsContent value="ai" className="mt-4 space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-1">
                    <CardTitle>AI Optimization</CardTitle>
                    <CardDescription>
                      Optimize generated context into a cleaner, structured
                      format for AI tools.
                    </CardDescription>
                  </div>
                  {/* <Badge variant='secondary'>Free plan</Badge> */}
                </div>
              </CardHeader>

              <CardContent>
                <div className="rounded-lg border bg-muted/30 p-4">
                  <div className="flex justify-between items-center gap-4">
                    <div>
                      <p className="text-sm font-medium">
                        ContextDrop optimizations
                      </p>

                      <p className="mt-1 text-sm text-muted-foreground">
                        Use included ContextDrop optimizations. Pro includes 100 each month.
                      </p>
                    </div>
                    <Badge variant="secondary">
                      {remainingOptimizations} remaining
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>OpenRouter API Key</CardTitle>

                <CardDescription>
                  Connect your own OpenRouter API key to continue AI
                  optimization after your included free usage ends.
                </CardDescription>
              </CardHeader>

              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Your key will only be used for AI optimization requests made
                  from your account.
                </p>
                <ApiKeyForm hasKey={hasApiKey} />
              </CardContent>
            </Card>
          </TabsContent>
          {/* MCP  */}
          <TabsContent value="mcp" className="mt-4">
            <McpSettings 
              workspaces={workspaces}
              activeWorkspaceId={preferences?.active_mcp_workspace_id ?? null}
              mcpEnabled={preferences?.mcp_enabled ?? true}
            />
          </TabsContent>

          <TabsContent value="subscription" className="mt-4">
            <PlanSettings
              plan={plan}
              subscriptionStatus={subscription?.status ?? null}
              scheduledChangeAction={subscription?.scheduled_change_action ?? null}
              currentPeriodEnd={subscription?.current_period_end ?? null}
              paddleEnvironment={getPaddleEnvironment()}
              usage={{
                workspaces: workspaceCount,
                aiClients: aiClientCount,
                memoryBlocks: memoryBlockCount,
                optimizations: optimizationCount,
              }}
            />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardShell>
  );
}

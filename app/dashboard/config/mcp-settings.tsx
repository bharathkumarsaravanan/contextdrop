import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { McpProjectSelector } from './mcp-project-selector';
import type { Workspace } from '@/types/workspace';
import { Input } from '@/components/ui/input';
import { CopyContextButton } from '@/components/shared/copy-button';
import { McpAccessButton } from './mcp-access-button';
import { Badge } from '@/components/ui/badge';
import { getMcpGrants } from './actions';
import { McpDisconnectButton } from './mcp-disconnect-button';

type Props = {
  workspaces: Workspace[];
  activeWorkspaceId: string | null;
  mcpEnabled: boolean;
};

export async function McpSettings({
  workspaces,
  activeWorkspaceId,
  mcpEnabled
}: Props) {
  const mcpGrantsResult = await getMcpGrants();
  const grants = mcpGrantsResult.success ? mcpGrantsResult.grants : [];

  return (
    <div className='space-y-6'>
      <Card>
        <CardHeader>
          <CardTitle>MCP & Integrations</CardTitle>

          <CardDescription>
            Choose which ContextDrop workspace your connected MCP clients should
            use.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className='space-y-2'>
            <p className='text-sm font-medium'>Active Workspace</p>

            <p className='text-sm text-muted-foreground'>
              Connected MCP clients will use this workspace when retrieving your
              ContextDrop context.
            </p>

            <div className='pt-2'>
              <McpProjectSelector
                workspaces={workspaces}
                activeWorkspaceId={activeWorkspaceId}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>MCP Connection</CardTitle>
          <CardDescription>
            Connect ContextDrop to AI clients such as Cursor and Claude.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className='flex items-center justify-between gap-4'>
            <div>
              <p className='text-sm font-medium'>Status</p>
              <p className='mt-1 text-sm text-muted-foreground'>
                {mcpEnabled
                  ? 'MCP access is currently enabled.'
                  : 'MCP access is currently disabled.'}
              </p>
            </div>

            <Badge variant='secondary'>
              {mcpEnabled ? 'Enabled' : 'Disabled'}
            </Badge>
          </div>
          <div className='mt-6 space-y-2'>
            <p className='text-sm font-medium'>MCP Server URL</p>

            <div className='flex gap-2'>
              <Input
                value='https://mcp.usecontextdrop.com/mcp'
                readOnly
              />

              <CopyContextButton
                title='URL'
                content='https://mcp.usecontextdrop.com/mcp'
              />
            </div>
          </div>
          <div className='flex flex-col gap-4 rounded-lg border p-4 sm:flex-row sm:items-center sm:justify-between mt-6 '>
            <div className='min-w-0'>
              <p className='text-sm font-medium'>MCP Access</p>

              <p className='mt-1 text-sm text-muted-foreground'>
                {mcpEnabled
                  ? 'Connected AI clients can access your ContextDrop memory through MCP.'
                  : 'MCP access is temporarily disabled. Your client configuration remains unchanged.'}
              </p>
            </div>

            <McpAccessButton enabled={mcpEnabled} />
          </div>

          <div className='mt-6 space-y-3'>
            <div>
              <p className='text-sm font-medium'>Authorized Clients</p>
              <p className='mt-1 text-sm text-muted-foreground'>
                AI clients that have authorized access to your ContextDrop
                account.
              </p>
            </div>

            <div className='divide-y rounded-lg border'>
              {grants.map((grant) => (
                <div
                  key={grant.client.id}
                  className='flex items-center justify-between gap-4 p-4'>
                  <div className='min-w-0'>
                    <p className='text-sm font-medium'>{grant.client.name}</p>
                    <p className='mt-1 text-xs text-muted-foreground'>
                      Authorized{' '}
                      {new Date(grant.granted_at).toLocaleDateString()}
                    </p>
                  </div>

                  <McpDisconnectButton
                    clientId={grant.client.id}
                    clientName={grant.client.name}
                  />
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

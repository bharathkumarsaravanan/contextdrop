import { DashboardShell } from '@/components/layouts/dashboard-shell';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ApiKeyForm } from './api-key-form';
import { createClient } from '@/lib/supabase/server';

export default async function ConfigPage() {
  const supabase = await createClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  let hasApiKey = false;

  if (user) {
    const { data } = await supabase
      .from('user_api_credentials')
      .select('id')
      .eq('user_id', user.id)
      .maybeSingle();

    hasApiKey = !!data;
  }

  return (
    <DashboardShell>
      <div className='max-w-3xl space-y-6'>
        <div>
          <h1 className='text-3xl font-bold tracking-tight'>
            AI Configuration
          </h1>
          <p className='mt-1 text-muted-foreground'>
            Manage your AI optimization settings.
          </p>
        </div>
        <Card>
          <CardHeader>
            <div className='flex items-start justify-between gap-4'>
              <div className='space-y-1'>
                <CardTitle>AI Optimization</CardTitle>
                <CardDescription>
                  Optimize generated context into a cleaner, structured format
                  for AI tools.
                </CardDescription>
              </div>
              <Badge variant='secondary'>Free plan</Badge>
            </div>
          </CardHeader>

          <CardContent>
            <div className='rounded-lg border bg-muted/30 p-4'>
              <div className='flex justify-between items-center gap-4'>
                <div>
                  <p className='text-sm font-medium'>
                    ContextDrop optimizations
                  </p>

                  <p className='mt-1 text-sm text-muted-foreground'>
                    Use ContextDrop API key for your included free
                    optimizations.
                  </p>
                </div>
                <Badge variant='outline'>10 included</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Use your own API key</CardTitle>

            <CardDescription>
              Connect your OpenRouter API key to continue using AI optimization
              after your free usage is exhausted.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <p className='text-sm text-muted-foreground'>
              Your key will only be used for AI optimization requests made from
              your account.
            </p>
            <ApiKeyForm hasKey={hasApiKey} />
          </CardContent>
        </Card>
      </div>
    </DashboardShell>
  );
}

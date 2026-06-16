import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export function DemoWorkspaceBanner() {
  return (
    <Card className="mb-6 border-dashed">
      <CardContent className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="space-y-2">
          <Badge variant="ghost">
            Demo Workspace
          </Badge>

          <div className='mt-3'>
            <h3 className="font-semibold text-sm text-zinc-500">
              Explore how ContextDrop works
            </h3>

            <p className="text-sm text-muted-foreground text-zinc-500">
              This workspace contains sample memories and generated
              context so you can understand the workflow in seconds.
            </p>
          </div>
        </div>

      </CardContent>
    </Card>
  );
}
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sparkles } from 'lucide-react';

export function DemoWorkspaceBanner() {
  return (
    <Card className="mb-6 border-dashed border-zinc-800 bg-zinc-950/40">
      <CardContent className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="space-y-2">
          <Badge variant="ghost" className="gap-1.5">
            <Sparkles className="h-3 w-3" />
            Demo Workspace
          </Badge>

          <div className="mt-3">
            <h3 className="text-sm font-medium">
              Explore a sample project
            </h3>

            <p className="mt-1 max-w-2xl text-sm leading-6 text-muted-foreground">
              This workspace contains example project memories so you can see
              how ContextDrop organizes persistent knowledge for your AI
              workflow.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
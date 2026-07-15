import Link from "next/link";
import { Rocket, Sparkles } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function DemoPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto max-w-6xl px-6 py-10 space-y-8">

        {/* Banner */}
        <Card className="border-primary/30 bg-primary/5">
          <CardContent className="flex flex-col gap-4 p-6 md:flex-row md:items-center md:justify-between">
            <div className="flex gap-4">
              <Rocket className="mt-1 h-6 w-6 text-primary shrink-0" />

              <div>
                <h2 className="font-semibold text-lg">
                  You're viewing the interactive demo
                </h2>

                <p className="mt-1 text-sm text-muted-foreground">
                  Explore ContextDrop without creating an account.
                  This workspace is read-only.
                </p>
              </div>
            </div>

            <Button asChild>
              <Link href="/login">
                Get Started
              </Link>
            </Button>
          </CardContent>
        </Card>

        {/* Demo Workspace */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl">
                  Launch SaaS MVP
                </CardTitle>

                <CardDescription className="mt-2">
                  Example workspace showing how reusable project knowledge
                  becomes AI-ready context.
                </CardDescription>
              </div>

              <Badge variant="secondary">
                Read Only
              </Badge>
            </div>
          </CardHeader>

          <CardContent className="h-[500px] flex items-center justify-center rounded-lg border border-dashed">
            <div className="text-center">
              <Sparkles className="mx-auto h-8 w-8 text-primary" />

              <p className="mt-4 text-muted-foreground">
                Demo memories will be added in the next chunk.
              </p>
            </div>
          </CardContent>
        </Card>

      </div>
    </main>
  );
}
import {
  Sparkles,
  CircleX,
  CircleCheck,
  Database,
  CheckSquare,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { LoginBtn } from "@/components/auth/login-btn";

export default function Home() {
  return (
    <main className="min-h-screen">
      <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur">
        <div className="container mx-auto max-w-6xl px-6">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              <span className="font-semibold">ContextDrop</span>
            </div>

            <div className="hidden md:flex items-center gap-6">
              <a
                href="#features"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Features
              </a>

              <a
                href="#how-it-works"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                How It Works
              </a>
            </div>

            <LoginBtn>
              <Button size="sm">Get Started</Button>
            </LoginBtn>
          </div>
        </div>
      </header>
      <section className="container mx-auto px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <Badge variant="secondary" className="mb-6">
            <Sparkles className="h-4 w-4 mr-2" />
            Built for ChatGPT, Claude, Gemini & Cursor
          </Badge>
          <h1 className="max-w-4xl text-5xl font-bold tracking-tight sm:text-7xl">
            Stop Rewriting Project Context
            <span className="block text-primary">For Every AI Chat.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
            Save project knowledge once. Generate AI-ready context from reusable
            memory blocks and paste it into ChatGPT, Claude, Gemini or Cursor in
            seconds.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <LoginBtn>
              <Button size="lg">Start Free</Button>
            </LoginBtn>
            <a href="#view-demo" className="p-2 text-sm border rounded">
              View Demo
            </a>
          </div>
          <p
            id="view-demo"
            className="mb-4 text-center text-sm font-medium uppercase tracking-wider text-muted-foreground mt-10"
          >
            See ContextDrop in Action
          </p>
          <Image
            src="/images/landing/hero-screenshot.png"
            alt="ContextDrop workspace showing memory selection and AI-ready context generation"
            width={1600}
            height={900}
            className="rounded-xl border mt-4"
          />
        </div>
      </section>

      <section id="features" className="container mx-auto px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <h2 className="max-w-4xl text-3xl font-bold tracking-tight sm:text-5xl">
            Why ContextDrop?
          </h2>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
            Project context gets scattered across notes, chats and documents.
            ContextDrop keeps everything in one place and turns it into AI-ready
            context whenever you need it.
          </p>
          <div className="grid md:grid-cols-2 gap-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Without ContextDrop</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 text-base items-center">
                  <div className="flex items-center gap-3 ">
                    <CircleX className="h-4 w-4 text-red-500" /> Rewriting the
                    same project context
                  </div>
                </div>
                <div className="space-y-4 text-base items-center">
                  <div className="flex items-center gap-3 ">
                    <CircleX className="h-4 w-4 text-red-500" /> Copy-pasting
                    notes between AI chats
                  </div>
                </div>
                <div className="space-y-4 text-base items-center">
                  <div className="flex items-center gap-3 ">
                    <CircleX className="h-4 w-4 text-red-500" /> Re-explaining
                    architecture decisions
                  </div>
                </div>
                <div className="space-y-4 text-base items-center">
                  <div className="flex items-center gap-3 ">
                    <CircleX className="h-4 w-4 text-red-500" /> Losing
                    important project knowledge
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>With ContextDrop</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 text-base items-center">
                  <div className="flex items-center gap-3 ">
                    <CircleCheck className="h-4 w-4 text-green-500" /> Save
                    project knowledge once
                  </div>
                </div>
                <div className="space-y-4 text-base items-center">
                  <div className="flex items-center gap-3 ">
                    <CircleCheck className="h-4 w-4 text-green-500" /> Generate
                    AI-ready context instantly
                  </div>
                </div>
                <div className="space-y-4 text-base items-center">
                  <div className="flex items-center gap-3 ">
                    <CircleCheck className="h-4 w-4 text-green-500" /> Reuse
                    context across ChatGPT, Claude and Cursor
                  </div>
                </div>
                <div className="space-y-4 text-base items-center">
                  <div className="flex items-center gap-3 ">
                    <CircleCheck className="h-4 w-4 text-green-500" /> Keep
                    everything organized in one workspace
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      <section id="how-it-works" className="container mx-auto px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <h2 className="max-w-4xl text-3xl font-bold tracking-tight sm:text-5xl">
            Three Steps to AI-Ready Context
          </h2>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
            Create memories, select what you need and generate context ready for
            ChatGPT, Claude and Cursor.
          </p>
          <div className="grid md:grid-cols-3 gap-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex gap-2 items-center">
                  <Database className="h-4 w-4 mr-2" /> Create Memories
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mt-2 max-w-sm text-sm text-muted-foreground text-zinc-500">
                  Save requirements, notes and decisions as reusable memories.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex gap-2 items-center">
                  <CheckSquare className="h-4 w-4 mr-2" /> Select Memories
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mt-2 max-w-sm text-sm text-muted-foreground text-zinc-500">
                  Select only the memories relevant to your current task.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex gap-2 items-center">
                  <Sparkles className="h-4 w-4 mr-2" /> Generate Context
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mt-2 max-w-sm text-sm text-muted-foreground text-zinc-500">
                  Generate a structured context block ready for AI tools.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      <section className="container mx-auto max-w-4xl px-6 py-24 text-center">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-5xl font-bold">
            Ready to Stop Rewriting Context?
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-muted-foreground">
            Save project knowledge once and generate AI-ready context whenever
            you need it.
          </p>
          <div className="mt-8">
            <LoginBtn>
              <Button size="lg" variant="outline">
                Start Free
              </Button>
            </LoginBtn>
          </div>
        </div>
      </section>
      <footer className="border-t">
        <div className="container mx-auto max-w-6xl px-6 py-8">
          <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
            <div>
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5" />

                <span className="font-semibold">ContextDrop</span>
              </div>

              <p className="mt-3 max-w-sm text-sm text-muted-foreground">
                Save project knowledge once. Generate AI-ready context
                instantly.
              </p>
            </div>
            <div className="flex gap-6">
              <a
                href="#features"
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                Features
              </a>

              <a
                href="#how-it-works"
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                How It Works
              </a>
            </div>
          </div>
        </div>
        <div className=" bg-border" />
        <div className="flex mx-auto max-w-6xl px-6 py-4 flex-col gap-2 text-sm text-muted-foreground md:flex-row md:justify-between">
          <p>© 2026 ContextDrop</p>

          <p>Built for ChatGPT, Claude, Gemini & Cursor</p>
        </div>
      </footer>
    </main>
  );
}

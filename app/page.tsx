import { Sparkles, Database, CheckSquare, FileText, Link2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { LoginBtn } from "@/components/auth/login-btn";
import Link from "next/link";
import { Header } from "@/components/marketing/header";
import { Footer } from "@/components/marketing/footer";

export const metadata = {
  title: "ContextDrop",
};

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <section className="container mx-auto px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <Badge variant="secondary" className="mb-6">
            <Sparkles className="h-4 w-4 mr-2" />
            Persistent AI Memory for Cursor & Claude
          </Badge>
          <h1 className="max-w-4xl text-5xl font-bold tracking-tight sm:text-7xl">
            Give Your AI a Persistent
            <span className="block text-primary">Memory of Your Projects.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
            Save your project knowledge once and let AI access it whenever you
            need it. Connect Cursor or Claude through MCP and keep your
            architecture, decisions, requirements, and conventions available
            across your AI workflow.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <LoginBtn>
              <Button size="lg">Start Free</Button>
            </LoginBtn>
            <Button variant="outline" asChild>
              <Link href="/demo">View Demo</Link>
            </Button>
          </div>
          <p className="mb-4 text-center text-sm font-medium uppercase tracking-wider text-muted-foreground mt-10">
            See ContextDrop in Action
          </p>
          <Image
            src="/images/landing/hero-memory-mcp.webp"
            alt="ContextDrop workspace showing memory selection and AI-ready context generation"
            width={1600}
            height={900}
            className="rounded-xl border mt-4"
            priority
          />
        </div>
      </section>

      <section id="features" className="container mx-auto px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-3xl">
            <p className="mb-4 text-sm font-medium uppercase tracking-wider text-primary">
              Why ContextDrop
            </p>

            <h2 className="text-4xl font-bold tracking-tight sm:text-6xl">
              Your AI shouldn&apos;t need to relearn your project.
            </h2>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
              ContextDrop gives your AI a persistent memory layer for the
              knowledge that matters — architecture, requirements, decisions,
              conventions, and project-specific context.
            </p>
          </div>

          <div className="mt-14 grid gap-5 md:grid-cols-3">
            <Card className="group relative overflow-hidden border-zinc-800 bg-zinc-950/50 transition-colors hover:border-zinc-700">
              <CardHeader>
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-900">
                  <Database className="h-5 w-5 text-primary" />
                </div>

                <CardTitle className="text-xl">Remember</CardTitle>
              </CardHeader>

              <CardContent>
                <p className="leading-7 text-muted-foreground">
                  Store the knowledge your AI needs to understand your project —
                  architecture, requirements, decisions, and conventions.
                </p>
              </CardContent>
            </Card>

            <Card className="group relative overflow-hidden border-zinc-800 bg-zinc-950/50 transition-colors hover:border-zinc-700">
              <CardHeader>
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-900">
                  <Sparkles className="h-5 w-5 text-primary" />
                </div>

                <CardTitle className="text-xl">Connect</CardTitle>
              </CardHeader>

              <CardContent>
                <p className="leading-7 text-muted-foreground">
                  Connect Cursor or Claude through MCP and give your AI direct
                  access to your project memory.
                </p>
              </CardContent>
            </Card>

            <Card className="group relative overflow-hidden border-zinc-800 bg-zinc-950/50 transition-colors hover:border-zinc-700">
              <CardHeader>
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-900">
                  <CheckSquare className="h-5 w-5 text-primary" />
                </div>

                <CardTitle className="text-xl">Reuse</CardTitle>
              </CardHeader>

              <CardContent>
                <p className="leading-7 text-muted-foreground">
                  Keep your project knowledge available across AI sessions
                  instead of repeatedly explaining the same context.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="mt-6 rounded-xl border border-zinc-800 bg-zinc-950/40 p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="font-medium">
                  One project. One persistent memory.
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Your workspace becomes the source of truth for your AI
                  workflow.
                </p>
              </div>

              <div className="text-sm font-medium text-muted-foreground">
                Workspace <span className="mx-2">→</span> Memories{" "}
                <span className="mx-2">→</span> MCP{" "}
                <span className="mx-2">→</span> AI
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="container mx-auto px-6 py-32">
        <div className="mx-auto max-w-6xl">
          {/* Header */}
          <div className="max-w-3xl">
            <p className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-primary">
              How It Works
            </p>

            <h2 className="text-4xl font-bold tracking-tight sm:text-6xl">
              Build once.
              <span className="block text-muted-foreground">
                Let your AI remember.
              </span>
            </h2>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
              ContextDrop turns your project knowledge into a persistent memory
              layer that your AI can access whenever you need it.
            </p>
          </div>

          {/* Workflow */}
          <div className="relative mt-20">
            {/* Connecting line */}
            <div className="absolute left-[27px] top-8 hidden h-[calc(100%-64px)] w-px bg-gradient-to-b from-primary/60 via-primary/20 to-transparent md:block" />

            {/* Step 01 */}
            <div className="relative grid gap-8 md:grid-cols-[56px_1fr] md:gap-10">
              <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full border border-primary/30 bg-zinc-950 text-sm font-semibold text-primary shadow-[0_0_30px_rgba(34,197,94,0.12)]">
                01
              </div>

              <div className="grid gap-8 lg:grid-cols-[1fr_420px] lg:items-center">
                <div>
                  <p className="text-sm font-medium uppercase tracking-widest text-muted-foreground">
                    Create
                  </p>

                  <h3 className="mt-2 text-3xl font-semibold tracking-tight">
                    Give your project a home.
                  </h3>

                  <p className="mt-4 max-w-xl text-base leading-7 text-muted-foreground">
                    Create a workspace for your project and keep everything
                    related to it in one place.
                  </p>
                </div>

                {/* Mini UI */}
                <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-4 shadow-2xl">
                  <div className="mb-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Database className="h-4 w-4 text-primary" />
                      <span className="text-sm font-medium">Workspaces</span>
                    </div>

                    <span className="rounded-md bg-primary/10 px-2 py-1 text-xs text-primary">
                      + New
                    </span>
                  </div>

                  <div className="space-y-2">
                    {["ContextDrop", "Job Tracker", "Personal Projects"].map(
                      (project, index) => (
                        <div
                          key={project}
                          className={`rounded-lg border px-3 py-2 text-sm ${
                            index === 0
                              ? "border-primary/20 bg-primary/5 text-white"
                              : "border-zinc-800 text-muted-foreground"
                          }`}
                        >
                          {project}
                        </div>
                      ),
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Step 02 */}
            <div className="relative mt-24 grid gap-8 md:grid-cols-[56px_1fr] md:gap-10">
              <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full border border-primary/30 bg-zinc-950 text-sm font-semibold text-primary shadow-[0_0_30px_rgba(34,197,94,0.12)]">
                02
              </div>

              <div className="grid gap-8 lg:grid-cols-[420px_1fr] lg:items-center">
                {/* Mini UI */}
                <div className="order-2 rounded-2xl border border-zinc-800 bg-zinc-950 p-4 shadow-2xl lg:order-1">
                  <div className="mb-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Sparkles className="h-4 w-4 text-primary" />
                      <span className="text-sm font-medium">
                        Project Memory
                      </span>
                    </div>

                    <span className="text-xs text-muted-foreground">
                      12 memories
                    </span>
                  </div>

                  <div className="space-y-2">
                    {[
                      ["Architecture", "Next.js + Supabase"],
                      ["Conventions", "TypeScript + Tailwind"],
                      ["Requirements", "MCP integration"],
                    ].map(([title, value]) => (
                      <div
                        key={title}
                        className="rounded-lg border border-zinc-800 p-3"
                      >
                        <p className="text-xs text-muted-foreground">{title}</p>
                        <p className="mt-1 text-sm">{value}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="order-1 lg:order-2">
                  <p className="text-sm font-medium uppercase tracking-widest text-muted-foreground">
                    Remember
                  </p>

                  <h3 className="mt-2 text-3xl font-semibold tracking-tight">
                    Store what your AI needs to know.
                  </h3>

                  <p className="mt-4 max-w-xl text-base leading-7 text-muted-foreground">
                    Save architecture, requirements, decisions, conventions, and
                    other project knowledge as reusable memories.
                  </p>
                </div>
              </div>
            </div>

            {/* Step 03 */}
            <div className="relative mt-24 grid gap-8 md:grid-cols-[56px_1fr] md:gap-10">
              <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full border border-primary/30 bg-zinc-950 text-sm font-semibold text-primary shadow-[0_0_30px_rgba(34,197,94,0.12)]">
                03
              </div>

              <div className="grid gap-8 lg:grid-cols-[1fr_420px] lg:items-center">
                <div>
                  <p className="text-sm font-medium uppercase tracking-widest text-muted-foreground">
                    Connect
                  </p>

                  <h3 className="mt-2 text-3xl font-semibold tracking-tight">
                    Put your AI in the loop.
                  </h3>

                  <p className="mt-4 max-w-xl text-base leading-7 text-muted-foreground">
                    Connect Cursor or Claude through MCP. Your AI can then
                    access the project memory you have already built.
                  </p>
                </div>

                {/* MCP flow */}
                <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-5 shadow-2xl">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between rounded-lg border border-zinc-800 p-3">
                      <span className="text-sm">Cursor</span>
                      <span className="text-xs text-primary">Connected</span>
                    </div>

                    <div className="flex justify-center">
                      <span className="text-xs text-primary">↓ MCP</span>
                    </div>

                    <div className="rounded-lg border border-primary/20 bg-primary/5 p-4 text-center">
                      <Sparkles className="mx-auto h-5 w-5 text-primary" />

                      <p className="mt-2 text-sm font-medium">ContextDrop</p>

                      <p className="mt-1 text-xs text-muted-foreground">
                        Project Memory
                      </p>
                    </div>

                    <div className="flex justify-center">
                      <span className="text-xs text-primary">↓</span>
                    </div>

                    <div className="rounded-lg border border-zinc-800 p-3 text-center text-sm">
                      Your project knowledge
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Closing statement */}
          <div className="mt-24 border-t border-zinc-800 pt-8">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-lg font-medium">
                Workspace → Memory → MCP → AI
              </p>

              <p className="text-sm text-muted-foreground">
                Set it up once. Keep your AI in context.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden px-6 py-32">
        {/* Ambient glow */}
        <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[500px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-3xl" />

        <div className="relative mx-auto max-w-5xl overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-950 px-6 py-20 text-center sm:px-12">
          {/* Decorative grid */}
          <div className="pointer-events-none absolute inset-0 -z-0 opacity-20">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  "linear-gradient(to right, rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.06) 1px, transparent 1px)",
                backgroundSize: "48px 48px",
                maskImage:
                  "linear-gradient(to bottom, transparent, black 30%, black 70%, transparent)",
              }}
            />
          </div>

          {/* Content */}
          <div className="relative z-10 mx-auto max-w-3xl">
            <div className="mx-auto mb-6 flex h-12 w-12 items-center justify-center rounded-xl border border-primary/20 bg-primary/10">
              <Sparkles className="h-6 w-6 text-primary" />
            </div>

            <p className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-primary">
              Get Started
            </p>

            <h2 className="text-4xl font-bold tracking-tight sm:text-6xl">
              Give Your AI
              <span className="block text-primary">the context it needs.</span>
            </h2>

            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
              Set up your project memory once, connect your AI through MCP, and
              keep your project knowledge available across your workflow.
            </p>

            <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
              <LoginBtn>
                <Button size="lg" className="min-w-32">
                  Start Free
                </Button>
              </LoginBtn>

              <Button size="lg" variant="outline" asChild className="min-w-32">
                <Link href="/demo">View Demo</Link>
              </Button>
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
              <span className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                Persistent project memory
              </span>

              <span className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                Cursor & Claude
              </span>

              <span className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                MCP powered
              </span>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

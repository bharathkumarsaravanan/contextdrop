import {
  Sparkles,
  Database,
  CheckSquare,
  FileText,
  Link2,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { LoginBtn } from "@/components/auth/login-btn";
import Link from "next/link";
import { Header } from "@/components/marketing/header";
import { Footer } from "@/components/marketing/footer";

// NOTE: if your root layout.tsx also defines a description / OG tags that
// mention ChatGPT or Gemini, update those too so everything says Cursor & Claude.
export const metadata = {
  title: "ContextDrop — Persistent AI memory for Cursor & Claude",
  description:
    "Stop re-explaining your project to your AI. Save your architecture, decisions, and conventions once, and let Cursor and Claude remember them through MCP.",
  openGraph: {
    title: "ContextDrop — Persistent AI memory for Cursor & Claude",
    description:
      "Stop re-explaining your project to your AI. Save it once, and Cursor and Claude remember it in every session.",
  },
};

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />

      {/* ───────────── HERO ───────────── */}
      <section className="container mx-auto px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <Badge variant="secondary" className="mb-6">
            <Sparkles className="h-4 w-4 mr-2" />
            Persistent AI Memory for Cursor & Claude
          </Badge>
          <h1 className="max-w-4xl text-5xl font-bold tracking-tight sm:text-7xl">
            Stop re-explaining your 
            <span className="block text-primary">project to your AI.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
            Save your architecture, decisions, and conventions once. Cursor and
            Claude remember them in every session — and your assistant can save
            new decisions for you as you work.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <LoginBtn>
              <Button size="lg">Start Free</Button>
            </LoginBtn>
            <Button size="lg" variant="outline" asChild>
              <Link href="/demo">View Demo</Link>
            </Button>
          </div>
          <p className="mt-4 text-sm text-muted-foreground">
            Free plan available · Works with Cursor & Claude through MCP
          </p>

          <p className="mb-4 text-center text-sm font-medium uppercase tracking-wider text-muted-foreground mt-16">
            See ContextDrop in Action
          </p>

          {/*
            TODO: replace this image with a 20–30 second demo video showing the
            same task in two assistants (one forgets, one remembers). Example:

            <video
              src="/videos/demo.mp4"
              poster="/images/landing/hero-memory-mcp.webp"
              autoPlay
              muted
              loop
              playsInline
              className="mt-4 w-full rounded-xl border"
            />
          */}
          <Image
            src="/images/landing/hero-memory-mcp.webp"
            alt="ContextDrop workspace showing memory selection and AI-ready context generation"
            width={1600}
            height={900}
            className="rounded-xl border mt-4"
            priority
          />

          {/*
            TODO (social proof): once you have real material, add a small strip
            here — a screenshot of an assistant recalling a saved decision, or
            an honest counter like "X memories saved". Only add real things.
          */}
        </div>
      </section>

      {/* ───────────── FEATURES ───────────── */}
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
                  architecture, requirements, decisions, and conventions. Add it
                  yourself, or let your AI save it as you work.
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

      {/* ───────────── NEW: YOUR AI SAVES AS YOU WORK ───────────── */}
      <section id="auto-save" className="container mx-auto px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="mb-4 text-sm font-medium uppercase tracking-wider text-primary">
                Hands-free memory
              </p>

              <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
                No copy-pasting.
                <span className="block text-muted-foreground">
                  Your AI writes its own memory.
                </span>
              </h2>

              <p className="mt-6 max-w-xl text-lg leading-8 text-muted-foreground">
                When you settle on a decision, your assistant can save it to
                ContextDrop. When something changes, it updates the memory
                instead of piling up duplicates. Next session, it already knows.
              </p>
            </div>

            {/* Example conversation (illustrative) */}
            <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-5 shadow-2xl">
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium">Example</span>
                </div>
                <span className="text-xs text-muted-foreground">
                  Cursor + ContextDrop
                </span>
              </div>

              <div className="space-y-3 text-sm">
                <div className="rounded-lg border border-zinc-800 p-3">
                  <p className="text-xs text-muted-foreground">You</p>
                  <p className="mt-1">
                    Let&apos;s use Supabase RLS for tenant isolation.
                  </p>
                </div>

                <div className="rounded-lg border border-primary/20 bg-primary/5 p-3">
                  <p className="text-xs text-primary">Assistant</p>
                  <p className="mt-1">
                    Done. Saved to your project memory as a Decision.
                  </p>
                </div>

                <div className="flex items-center gap-3 py-1">
                  <div className="h-px flex-1 bg-zinc-800" />
                  <span className="text-xs text-muted-foreground">
                    Next day, new session
                  </span>
                  <div className="h-px flex-1 bg-zinc-800" />
                </div>

                <div className="rounded-lg border border-zinc-800 p-3">
                  <p className="text-xs text-muted-foreground">You</p>
                  <p className="mt-1">Add the invoices table.</p>
                </div>

                <div className="rounded-lg border border-primary/20 bg-primary/5 p-3">
                  <p className="text-xs text-primary">Assistant</p>
                  <p className="mt-1">
                    Adding it with RLS policies, following your tenant isolation
                    decision.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ───────────── NEW: WHY NOT CLAUDE.md / .cursorrules ───────────── */}
      <section id="compare" className="container mx-auto px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-3xl">
            <p className="mb-4 text-sm font-medium uppercase tracking-wider text-primary">
              Compared to files
            </p>

            <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Why not just use CLAUDE.md or .cursorrules?
            </h2>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
              Files are great for one repo and one tool. ContextDrop is for when
              your project knowledge needs to follow you across assistants.
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2">
            <Card className="border-zinc-800 bg-zinc-950/50">
              <CardHeader>
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-900">
                  <FileText className="h-5 w-5 text-muted-foreground" />
                </div>
                <CardTitle className="text-xl">Rules files</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  <li>Live inside one repo</li>
                  <li>Each tool wants its own file and format</li>
                  <li>You edit and sync them by hand</li>
                  <li>Drift out of date as the project changes</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-primary/50 bg-zinc-950/70">
              <CardHeader>
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-900">
                  <Link2 className="h-5 w-5 text-primary" />
                </div>
                <CardTitle className="text-xl">ContextDrop</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  {[
                    "One memory shared by Cursor and Claude",
                    "Lives in your account, so it follows you across machines",
                    "Your AI reads and updates it directly through MCP",
                    "Stays current as decisions change",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          <p className="mt-6 text-sm text-muted-foreground">
            Already have a CLAUDE.md? Keep it. ContextDrop works alongside it.
          </p>
        </div>
      </section>

      {/* ───────────── HOW IT WORKS ───────────── */}
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
                    other project knowledge as reusable memories — yourself, or
                    let your AI save decisions as you make them.
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
                    <div className="grid grid-cols-2 gap-3">
                      <div className="flex items-center justify-between rounded-lg border border-zinc-800 p-3">
                        <span className="text-sm">Cursor</span>
                        <span className="text-xs text-primary">Connected</span>
                      </div>
                      <div className="flex items-center justify-between rounded-lg border border-zinc-800 p-3">
                        <span className="text-sm">Claude</span>
                        <span className="text-xs text-primary">Connected</span>
                      </div>
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

      {/* ───────────── PRICING ───────────── */}
      <section id="pricing" className="container mx-auto px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-4 text-sm font-medium uppercase tracking-wider text-primary">
              Plans
            </p>
            <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Start free. Upgrade when you need more.
            </h2>
            <p className="mt-5 text-lg text-muted-foreground">
              Core features and supported AI clients are available on both plans.
              Pro subscriptions renew monthly and can be canceled through Paddle.
            </p>
          </div>

          <div className="mx-auto mt-12 grid max-w-4xl gap-6 md:grid-cols-2">
            <Card className="border-zinc-800 bg-zinc-950/50">
              <CardHeader>
                <CardTitle className="text-2xl">Free</CardTitle>
                <p className="text-3xl font-bold">$0</p>
                <p className="text-sm text-muted-foreground">No subscription</p>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  <li>1 workspace</li>
                  <li>Up to 2 connected AI clients</li>
                  <li>Up to 50 memory blocks</li>
                  <li>10 included AI optimizations</li>
                </ul>
                <div className="mt-6">
                  <LoginBtn>
                    <Button variant="outline">Start Free</Button>
                  </LoginBtn>
                </div>
              </CardContent>
            </Card>

            <Card className="border-primary/50 bg-zinc-950/70">
              <CardHeader>
                <CardTitle className="text-2xl">ContextDrop Pro</CardTitle>
                <p className="text-3xl font-bold">
                  $9<span className="text-base font-normal text-muted-foreground">/month</span>
                </p>
                <p className="text-sm text-muted-foreground">
                  Billed monthly. Applicable taxes are shown at checkout.
                </p>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  <li>Up to 5 workspaces</li>
                  <li>Up to 5 connected AI clients</li>
                  <li>Up to 500 memory blocks</li>
                  <li>100 AI optimizations per month</li>
                </ul>
                {/* TODO: point this at your upgrade/checkout flow if you have a direct link */}
                <div className="mt-6">
                  <LoginBtn>
                    <Button>Get Started</Button>
                  </LoginBtn>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* TODO: confirm this wording matches what an "AI optimization" actually does */}
          <p className="mx-auto mt-8 max-w-2xl text-center text-sm text-muted-foreground">
            AI optimizations: when ContextDrop uses AI to clean up and structure
            your memories into AI-ready context.
          </p>
        </div>
      </section>

      {/* ───────────── FINAL CTA ───────────── */}
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
              Set up your project memory once, connect Cursor or Claude through
              MCP, and stop re-explaining your project every session.
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
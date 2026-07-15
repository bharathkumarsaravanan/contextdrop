import { MemoryBlock } from "@/types/memory-block";

export const demoWorkspace = {
  id: "demo-workspace",
  name: "Launch SaaS MVP",
  description:
    "Example workspace showing how reusable project knowledge becomes AI-ready context.",
};

export const demoMemoryBlocks: MemoryBlock[] = [
  {
    id: "1",
    workspace_id: "demo-workspace",
    title: "Product Vision",
    content:
      "ContextDrop helps developers save reusable project knowledge and generate AI-ready context.",
    category: "Product",
    created_at: "",
  },
  {
    id: "2",
    workspace_id: "demo-workspace",
    title: "Target Users",
    content:
      "Developers, founders and product managers building AI-assisted workflows.",
    category: "Business",
    created_at: "",
  },
  {
    id: "3",
    workspace_id: "demo-workspace",
    title: "Tech Stack",
    content:
      "Next.js, TypeScript, Tailwind CSS, shadcn/ui, Supabase and OpenRouter.",
    category: "Development",
    created_at: "",
  },
  {
    id: "4",
    workspace_id: "demo-workspace",
    title: "Roadmap",
    content:
      "Authentication, Workspaces, Context Generation, Sharing and AI Optimization.",
    category: "Planning",
    created_at: "",
  },
];
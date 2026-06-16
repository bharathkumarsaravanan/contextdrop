import { createWorkspace } from "@/app/dashboard/actions";
import { createMemoryBlock } from "@/app/dashboard/workspaces/[workspaceId]/actions";
import { error } from "console";

export async function createDemoWorkspace() {
    const workspaceData = new FormData();
    workspaceData.set("name", "My SaaS Startup");
    workspaceData.set("description", "Demo workspace.")
    try {
        const {error, data} = await createWorkspace(workspaceData);
        if (error) {
            throw new Error(error)
        }

        const memoryDatas = [
            {
                title: "Product Vision",
                content: `ContextDrop helps developers
turn scattered notes into
AI-ready context instantly.`,
                category: "Development"
            },
            {
                title: "Target Users",
                content: `Developers
Founders
Product Managers`,
                category: "Development"
            },
            {
                title: "Tech Stack",
                content: `Next.js
TypeScript
Supabase
Tailwind`,
                category: "Development"
            },
            {
                title: "Roadmap",
                content: `Authentication
Workspaces
Context Generation
Sharing`,
                category: "Development"
            },

        ]
        const {id} = data;
        memoryDatas.forEach(async (memoryData) => {
            const memory = new FormData();
            memory.set("title", memoryData.title);
            memory.set("content", memoryData.content);
            memory.set("category", memoryData.category);
            const { error:memoryEr } = await createMemoryBlock(id, memory);
            
            if (memoryEr) {
                throw new Error(memoryEr);
            }
        })

    } catch (err) {
        return {
            error: err
        }
    }

}
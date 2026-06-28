import { createWorkspace } from "@/app/dashboard/actions";
import { createMemoryBlock } from "@/app/dashboard/workspaces/[workspaceId]/actions";
import { Workspace } from "@/types/workspace";

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

        ];

export async function createDemoWorkspace() {
    const workspaceData = new FormData();
    workspaceData.set("name", "My SaaS Startup");
    workspaceData.set("description", "Demo workspace.");
    try {
        const { error, data } = await createWorkspace(workspaceData, true);
        if (error) {
            throw new Error(error)
        }

        return {
            success: true,
            data
        }
    } catch (err) {
        return {
            success: false,
            error: "Unable to create a demo workspace."
        }
    }   
}

export async function createDemoMemories(workspaceData: Workspace) {
    const { id } = workspaceData;
    try {
        memoryDatas.forEach(async (memoryData) => {
            const memory = new FormData();
            memory.set("title", memoryData.title);
            memory.set("content", memoryData.content);
            memory.set("category", memoryData.category);
            const { error } = await createMemoryBlock(id, memory);
            
            if (error) {
                throw new Error(error);
            }
        })
        return {
            success: true
        }
    } catch (err) {
        return {
            success: false,
            error: "Unable to create a demo memories, open the demo workspace and follow the instructions to create memories"
        }
    }
}
"use server";   
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { error } from "console";
import { success } from "zod";
import { title } from "process";

export async function createMemoryBlock(
    workspaceId: string,
    formData: FormData
) {
    const supabase = await createClient();

    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    const category = formData.get("category") as string;

    if (!title.trim()) {
        return {
            error: "Title is required"
        };
    };

    if (!content.trim()) {
        return {
            error: "Content is required"
        };
    };

    const { error } = await supabase
      .from("memory_blocks")
      .insert({
        workspace_id: workspaceId,
        title,
        content,
        category, 
      });

    if (error) {
        return {
            error: error.message,
        };
    };

    revalidatePath(`/dashboard/workspaces/${workspaceId}`);

    return {
        success: true,
    };

}

export async function deleteMemory(workspaceId:string, memoryId:string) {
    const supabase = await createClient();
    const {
        data: {user}
    } = await supabase.auth.getUser();

    if (!user) {
        return {
            error: "Unauthorized"
        }
    }

    const { error } = await supabase
      .from("memory_blocks")
      .delete()
      .eq("id", memoryId)
      .eq("workspace_id", workspaceId)

    if (error) {
        return {
            error: error.message
        };
    };

    revalidatePath(`/dashboard/workspaces/${workspaceId}`);

    return {
        success: true,
    };
};

export async function updateMemory(workspaceId:string, memoryId: string, formData: FormData) {
    
    const supabase = await createClient();
    const {
        data: { user } 
    } = await supabase.auth.getUser();

    if (!user) {
        return {
            error: "Unauthorized"
        }
    }

    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    const category = formData.get("category") as string;

    if (!title.trim()) {
        return {
            error: "Title is required"
        };
    };

    if (!content.trim()) {
        return {
            error: "Content is required"
        };
    };

    const { error } = await supabase
      .from("memory_blocks")
      .update({
        title: title,
        category: category,
        content: content
      })
      .eq("id", memoryId)
      .eq("workspace_id", workspaceId);

    if (error) {
        return {
            error: error.message,
        };
    }

    revalidatePath(
        `/dashboard/workspaces/${workspaceId}`
    );

    return {
        success: true,
    };
}
"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function deleteGeneratedContext(workspaceId:string, contextId:string) {
    const supabase = await createClient();

    const { error } = await supabase 
      .from("generated_contexts")
      .delete()
      .eq("id", contextId)

    if (error) {
        return {
            success: false,
            error: error.message
        };
    };

    revalidatePath(`/dashboard/workspaces/${workspaceId}`)
    return {
        success: true
    }
}
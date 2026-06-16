"use server";
import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function createWorkspace(formData:FormData, isDemo:boolean=false) {
    const supabase = await createClient();

    const {
        data: { user }
    } = await supabase.auth.getUser();

    if (!user) {
        return {
            error: "Unauthorized",
        };
    };

    const name = formData.get("name") as string;
    const description = formData.get("description") as string;

    if (!name.trim()) {
        return {
            error: "Workspace name is required!",
        };
    };

    const { error, data } = await supabase
      .from("workspaces")
      .insert({
        user_id: user.id,
        name,
        description,
        is_demo: isDemo
      })
      .select()
      .single();

        
    if (error) {
        return {
            error: error.message,
        };
    };

    revalidatePath("/dashboard");

    return {
        success: true,
        data
    };
};

export async function deleteWorkspace(workspaceId:string) { 
    const supabase = await createClient();
    const {
        data: { user }
    } = await supabase.auth.getUser();

    if (!user) {
        return {
            error: "Unauthorized"
        }
    }

    const { error } = await supabase
      .from("workspaces")
      .delete()
      .eq("id", workspaceId)
      .eq("user_id", user.id);

    if (error) {
        return {
            error: error.message
        };
    };

    revalidatePath("/dashboard");

    return {
        success: true,
    };
};
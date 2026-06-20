"use server";
import { createClient } from "@/lib/supabase/server";

export async function handleShareContext(contextId: string, workspaceId: string) {
    const supabase = await createClient();

    // Fetch the context data
    const { data: contextData, error: fetchError } = await supabase
        .from("generated_contexts")
        .select("*")
        .eq("id", contextId)
        .single();

    console.log(contextData, "contest");

    if (fetchError) {
        console.error("Error fetching context:", fetchError);
        return {
            success: false,
            error: fetchError.message,
        }
    }


    if (contextData.share_id) {
        return {
            success: true,
            url: `${process.env.NEXT_PUBLIC_BASE_URL}/shared/${contextData.share_id}`,
        }
    }

    const shareId = crypto.randomUUID() 
    const { error: shareError } = await supabase
        .from("generated_contexts")
        .update({"share_id": shareId})
        .eq("id", contextId)

    if (shareError) {
        console.error("Error generating share ID:", shareError);
        return {
            success: false,
            error: shareError.message,
        }
    }

    return {
        success: true,
        url: `${process.env.NEXT_PUBLIC_BASE_URL}shared/${shareId}`,
    }
    
}
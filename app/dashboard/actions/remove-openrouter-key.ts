"use server";
import { createClient } from "@/lib/supabase/server";
import { error } from "console";
import { success } from "zod";

export async function removeOpenRouterKey() {
    const supabase = await createClient();
    
    const {
        data: {user} 
    } = await supabase.auth.getUser();

    if(!user) {
        return {
            success: false,
            error: "Unauthorized"
        }
    };

    const { error } = await supabase
    .from("user_api_credentials")
    .delete()
    .eq("user_id", user.id)

    if (error) {
        return {
            success: false,
            error: error.message
        }
    };

    return {
        success: true
    }

}
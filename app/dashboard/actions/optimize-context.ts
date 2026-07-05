"use server";
import { optimizeContext } from "@/lib/openrouter";
import { createClient } from "@/lib/supabase/server";
import { error } from "console";
import { success } from "zod";

export async function optimizeContextAction(context:string) {
    try {
        const supabase = await createClient();
        const {
            data: { user }
        } = await supabase.auth.getUser();

        if (!user) {
            return {
                error: "Unauthorized"
            }
        }

        const { data: usageData, error: usageError } = await supabase.rpc("consume_free_optimization");

        if (usageError) {
            console.error("Usage error:", usageError);

            return {
                success: false,
                error: "Failed to check AI usage"
            }
        }

        const usage = usageData?.[0];

        if(!usage?.allowed) {
            return {
                success: false,
                error: "FREE LIMIT REACHED",
                remaining: 0
            }
        }

        const optimized = await optimizeContext(context);
        return {
            success: true,
            data: optimized ?? "",
            remaining: usage.remaining
        }
    } catch (error) {
        console.error(error);

        return {
            success: false,
            error: "Failed to optimize context"
        }
    }
} 
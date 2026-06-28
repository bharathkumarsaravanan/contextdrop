"use server";
import { optimizeContext } from "@/lib/openrouter";

export async function optimizeContextAction(context:string) {
    try {
        const optimized = await optimizeContext(context);
        return {
            success: true,
            data: optimized ?? "",
        }
    } catch (error) {
        console.error(error);

        return {
            success: false,
            error: "Failed to optimize context"
        }
    }
} 
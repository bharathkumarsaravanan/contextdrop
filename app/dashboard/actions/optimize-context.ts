"use server";
import { optimizeContext } from "@/lib/openrouter";
import { createClient } from "@/lib/supabase/server";
import { decryptValue } from "@/lib/encryption";

export async function optimizeContextAction(context:string) {
    try {
        const supabase = await createClient();
        const {
            data: { user }
        } = await supabase.auth.getUser();

        if (!user) {
            return {
                success: false,
                error: "Unauthorized"
            }
        }

        let openRouterKey:string;

        const { data: credential, error } = await supabase
          .from("user_api_credentials")
          .select("encrypted_api_key, iv, auth_tag")
          .eq("user_id", user.id)
          .maybeSingle();
        
        if (error) {
            return {
                success:false,
                error:"Failed to load API credentials"
            }
        }

        let remainingOptimizations: number | undefined;

        if (credential) {
            try  {
                openRouterKey = decryptValue({encryptedValue: credential.encrypted_api_key, iv: credential.iv, authTag:credential.auth_tag})
                console.log("openrouterkey", openRouterKey);
            } catch {
                return {
                    success: false,
                    error: "Stored OpenRouter key is invalid. Please reconnect it."
                }
            }
        } else {
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
                    error: "You've used all included AI optimizations. Connect your OpenRouter API key to continue.",
                    remaining: 0
                }
            }  
            
            remainingOptimizations = usage.remaining;
            if (!process.env.OPENROUTER_API_KEY) {
                throw new Error("OPENROUTER_API_KEY is not configured");
            }
            openRouterKey = process.env.OPENROUTER_API_KEY!;
        }

        try {
            const optimized = await optimizeContext({rawContent: context, apiKey: openRouterKey});
            
            return {
                success: true,
                data: optimized ?? "",
                remaining: remainingOptimizations,
                usingOwnKey: !!credential,
            }
        } catch (error) {
            const message = error instanceof Error
                ? error.message
                : "Unknown error";
            if (   
                credential &&
                (
                    message.includes("auth") ||
                    message.includes("API key") ||
                    message.includes("Unauthorized") ||
                    message.includes("Authentication header")
                )
            ) {
                return {
                    success: false,
                    error: "Your OpenRouter API key is invalid. Please reconnect it from AI Settings."
                }
            }
        } 
    } catch (error) {
        console.error(error);
        return {
            success: false,
            error: "Failed to optimize context"
        }
    }
} 
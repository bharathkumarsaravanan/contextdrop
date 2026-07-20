"use server";

import { createClient } from "@/lib/supabase/server";
import { encryptValue } from "@/lib/ai/encryption";


export async function saveOpenRouterKey(
  apiKey: string
) {
    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        return {
            success: false,
            error: "Unauthorized",
        };
    }

    if (!apiKey.trim()) {
        return {
            success: false,
            error: "API key is required",
        };
    }
    const encrypted = encryptValue(apiKey);
    const { error } = await supabase
      .from("user_api_credentials")
      .upsert({
            user_id: user.id,

            provider: "openrouter",

            encrypted_api_key:
            encrypted.encryptedValue,

            iv: encrypted.iv,

            auth_tag:
            encrypted.authTag,
        },
        {
            onConflict: "user_id",
        });
    if (error) {
        return {
            success: false,
            error: error.message,
        };
    }

    return {
        success: true,
    };
}

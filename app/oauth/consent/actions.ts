"use server";

import { createClient } from "@/lib/supabase/server";

export async function approveAuth(authorizationId: string) {
    const supabase = await createClient();

    const { data, error } = await supabase.auth.oauth.approveAuthorization(authorizationId);

    if (error) {
        throw new Error("Unable to approve authorization request.");
    }

    return data;
}

export async function denyAuth(authorizationId: string) {
    const supabase = await createClient();

    const { data, error } =  await supabase.auth.oauth.denyAuthorization(authorizationId);

    if (error) {
        throw new Error("Unable to deny authorizarion request.");
    }

    return data;
}
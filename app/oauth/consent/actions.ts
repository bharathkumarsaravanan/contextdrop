"use server";

import { createClient } from "@/lib/supabase/server";
import { isProSubscription } from "@/lib/billing/plans";

export async function approveAuth(authorizationId: string) {
    const supabase = await createClient();
    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        throw new Error("Sign in to connect an AI client.");
    }

    const { data: authorization, error: authorizationError } =
        await supabase.auth.oauth.getAuthorizationDetails(authorizationId);

    if (authorizationError || !authorization || !("authorization_id" in authorization)) {
        throw new Error("This authorization request is invalid or has expired.");
    }

    const { data: grants, error: grantsError } = await supabase.auth.oauth.listGrants();

    if (grantsError) {
        throw new Error("Unable to check connected AI clients.");
    }

    const { data: subscription, error: subscriptionError } = await supabase
        .from("billing_subscriptions")
        .select("status, current_period_end")
        .eq("user_id", user.id)
        .maybeSingle();

    if (subscriptionError) {
        throw new Error("Unable to check your plan.");
    }

    const limit = isProSubscription(subscription) ? 10 : 3;
    const alreadyConnected = grants.some(
        (grant) => grant.client.id === authorization.client.id,
    );

    if (!alreadyConnected && grants.length >= limit) {
        throw new Error(
            `Your plan allows up to ${limit} connected AI clients. Disconnect one or upgrade to ContextDrop Pro.`,
        );
    }

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
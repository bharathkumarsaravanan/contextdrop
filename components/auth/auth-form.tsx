"use client";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "../ui/button";

export function AuthForm() {
    const supabase = createClient();
    const [loading, setLoading] = useState(false);

    async function signInWithGoogle() {
        setLoading(true);

        await supabase.auth.signInWithOAuth({
            provider: "google",
            options: {
                redirectTo: `${location.origin}/auth/callback`
            },
        });

        setLoading(false);
    }

    return (
        <div className="w-full max-w-sm space-y-4 rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
            <div className="space-y-2 text-center">
                <h1 className="text-2xl font-bold">
                    Welcome to ContextDrop
                </h1>
                <p className="text-sm text-zinc-400">
                    Persistent memory for AI workflows.
                </p>
            </div>

            <Button
                className="h-11 rounded-xl bg-white px-5 text-black hover:bg-zinc-200 w-full"
                variant="secondary"
                onClick={signInWithGoogle}
                disabled={loading}
            >
                {loading ? "Loading..." : "Continue with Google"}
            </Button>
        </div>
    )
}
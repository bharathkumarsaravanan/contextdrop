"use client";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

export function AuthForm() {
    const supabase = createClient();

    const [email, setEmail] = useState("");
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

    async function signInWithEmail() {
        setLoading(true);

        await supabase.auth.signInWithOtp({
            email,
            options: {
                emailRedirectTo: `${location.origin}/auth/callback`
            }
        });

        setLoading(false);
        alert("Check your email.");
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

            <Input 
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-12 border-zinc-800 bg-zinc-900 focus-visible:ring-1 focus-visible:ring-white"
            />

            <Button
                className="h-11 rounded-xl bg-white px-5 text-black hover:bg-zinc-200 w-full"
                onClick={signInWithEmail}
                disabled={loading}
            >
                {loading ? "Loading..." : "Continue with Email"}
            </Button>

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
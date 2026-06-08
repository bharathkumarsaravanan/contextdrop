"use client";
import { createClient } from "@/lib/supabase/client";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

export function LogoutButton() {
    const supabase = createClient();
    const router = useRouter();

    async function handleLogout() {
        await supabase.auth.signOut();
        router.push("/login");
        router.refresh();
    }

    return(
        <Button
            variant="destructive"
            onClick={handleLogout}
            className="h-11 rounded-xl bg-white px-5 text-black hover:bg-zinc-200"
        >
            Logout
        </Button>
    )
}
import { ReactNode } from "react";

type Props = {
    children: ReactNode;
};

export function DashboardShell({
    children
}: Props) {
    return (
        <main className="min-h-screen bg-zinc-950 text-white">
            <div className="mx-auto max-w-6xl px-6 py-10">
                {children}
            </div>
        </main>
    )
}


export default function Loading() {
    return (
            <div className="space-y-4 animate-pulse max-w-md">
                <div className="h-10 w-64 rounded bg-zinc-800" />
                <div className="h-5 w-96 rounded bg-zinc-900"/>
                <div className="mt-10 grid gap-4">
                    <div className="h-32 rounded-2xl bg-zinc-900"/>
                    <div className="h-32 rounded-2xl bg-zinc-900"/>
                </div>
            </div>
    )
}
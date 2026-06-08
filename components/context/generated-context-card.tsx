import { GeneratedContext } from "@/types/generated-context";

type Props = {
    context: GeneratedContext;
    onClick: (context: GeneratedContext) => void;
};

export function GeneratedContextCard({
    context,
    onClick
}: Props) {

    return (
        <div onClick={() => onClick(context)} className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-4 cursor-pointer transition-colors hover:bg-zinc-900">
            <h3 className="font-medium">
                {context.name}
            </h3>
            <p className="mt-2 text-xs text-zinc-500">
                {new Date(context.created_at ).toLocaleString()}
            </p>
        </div>
    )
}

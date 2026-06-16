import { GeneratedContext } from "@/types/generated-context";
import { ContextActions } from "./context-actions";

type Props = {
    context: GeneratedContext;
    onClick: (context: GeneratedContext) => void;
};

export function GeneratedContextCard({
    context,
    onClick
}: Props) {

    return (
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-4 cursor-pointer transition-colors hover:bg-zinc-900 flex justify-between">
            <div>
                <h3 className="font-medium">
                    {context.name}
                </h3>
                <p className="mt-2 text-xs text-zinc-500">
                    {new Date(context.created_at ).toLocaleString()}
                </p>
            </div>
            <ContextActions context={context} />
        </div>
    ) 
}

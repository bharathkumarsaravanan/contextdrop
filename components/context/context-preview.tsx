import { Button } from "../ui/button";

type Props = {
    content: string;
    onCopy: () => void;
    copied: boolean;
    isLoading: boolean;
    onSave?: () => Promise<void>;
    saving?: boolean;
};

export function ContextPreview({
    content,
    onCopy,
    copied,
    onSave,
    saving
}: Props) {
    return (
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50">
            <div className="border-b border-zinc-800 p-4 flex justify-between items-center">
                <h2 className="font-semibold">
                    Context Preview
                </h2>
                <div>
                    <Button
                    size="sm"
                    variant="secondary"
                    onClick={onCopy}
                    >
                        {copied ? "Copied!" : "Copy"}
                    </Button>
                    {onSave && <Button disabled={saving} size="sm" variant="secondary" onClick={onSave} >{saving ? "Saving..." : "Save"}</Button>}
                </div>
            </div>
            <pre className="overflow-x-auto whitespace-pre-wrap p-4 text-sm text-zinc-300">
                {content}
            </pre>
        </div>
    )
}
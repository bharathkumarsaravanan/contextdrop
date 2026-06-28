import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { CopyContextButton } from "@/components/shared/copy-button";

type Props = {
  params: Promise<{ shareId: string }>;
};

export default async function SharedContextPage({ params }: Props) {
  const { shareId } = await params;
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("generated_contexts")
    .select("*")
    .eq("share_id", shareId)
    .single();

  if (!data || error) {
    notFound();
  }


  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-4xl px-6 py-12">
        <div className="mb-8">
          <p className="text-sm text-muted-foreground text-zinc-400">
            Shared with ContextDrop
          </p>
          <h1 className="mt-2 text-3xl font-bold">{data.name}</h1>
        </div>
        <div className="mb-6 flex justify-end">
          <CopyContextButton content={data?.content} />
        </div>
        <Card>
          <CardContent className="p-6">
            <pre className="whitespace-pre-wrap break-words text-sm">
              {data.content}
            </pre>
          </CardContent>
        </Card>
        <div className="mt-8 border-t pt-6">
          <p className="text-sm text-muted-foreground">
            Created with ContextDrop
          </p>
        </div>
      </div>
    </div>
  );
}

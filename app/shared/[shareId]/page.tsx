import { createClient } from "@/lib/supabase/server";
import { notFound } from 'next/navigation';

type Props = {
  params: Promise<{ shareId: string }>;
};

export default async function SharedContextPage({ params }: Props) {
  const { shareId } = await params;
  const supabase = await createClient();
    console.log( "error");


  const { data, error } = await supabase
    .from("generated_contexts")
    .select("*")
    .eq("share_id", shareId)
    .single();

    console.log( error, " supabase error");

    if (!data) {
        notFound();
    }

  return (
    <div>
      <h1>Shared Context</h1>
      <div>
        <h1 className="font-bold">{data?.name}</h1>
        <pre className="max-h-[80vh] overflow-y-auto whitespace-pre-wrap text-sm">
          {data?.content}
        </pre>
      </div>
    </div>
  );
}

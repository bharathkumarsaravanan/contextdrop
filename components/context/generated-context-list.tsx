"use client";
import { useState } from "react";
import { GeneratedContext } from "@/types/generated-context";
import { GeneratedContextCard } from "./generated-context-card";
import { ViewContextDialog } from "./view-context-dialog";

type Props = {
    contexts: GeneratedContext[];
}

export function GeneratedContextList({
    contexts
}: Props) {
    const [selectedContext, setSelectedContext] = useState<GeneratedContext | null>(null);

    return (
        <>
            <div className="grid gap-4">
                {contexts.map(context => (
                    <GeneratedContextCard 
                      key={context.id}
                      context={context}
                      onClick={setSelectedContext}
                    />
                ))}
            </div>
            <ViewContextDialog 
              context={selectedContext}
              open={!!selectedContext}
              onOpenChange={(open) => {
                if (!open) {
                    setSelectedContext(null);
                }
              }}
            />
        </>
    )
}
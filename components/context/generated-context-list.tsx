"use client";
import { GeneratedContext } from "@/types/generated-context";
import { GeneratedContextCard } from "./generated-context-card";

type Props = {
    contexts: GeneratedContext[];
}

export function GeneratedContextList({
    contexts
}: Props) {

    return (
        <>
            <div className="grid gap-4">
                {contexts.map(context => (
                    <GeneratedContextCard 
                      key={context.id}
                      context={context}
                    />
                ))}
            </div>
        </>
    )
}
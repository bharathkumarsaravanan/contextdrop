"use client";
import { Button } from "@/components/ui/button";

type Props = {
    error: Error & { digest?: string };
    reset: () => void;
}
export default function Error({ error, reset }: Props) {
    console.error(error);

    return (
            <div className="flex min-h-[70vh] items-center justify-center">
                <div className="max-w-md text-center space-y-4">
                    <h1 className="text-3xl font-bold">
                        Something went wrong
                    </h1>
                    <p className="text-muted-foreground">
                        An unexpected error occurred. Please try again.
                    </p>
                    <Button onClick={reset}>
                        Try Again
                    </Button>
                </div>
            </div>
    )
}
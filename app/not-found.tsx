import Link from "next/link";
import { SearchX } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
    return (
        <div className="flex min-h-screen items-center justify-center px-6">
            <div className="max-w-md text-center flex flex-col justify-center items-center">
                <SearchX className="max-auto h-12 w-12 text-muted-foreground" />

                <h1 className="mt-6 text-4xl font-bold">
                    Page not found
                </h1>

                <p className="mt-3 text-muted-foreground">
                    Sorry, we could not find the page you are looking for.
                </p>

                <Button asChild className="mt-8">
                    <Link href="/">
                        Back to home
                    </Link>
                </Button>
            </div>
        </div>
    )
}
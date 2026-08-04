import type { ReactNode } from "react";
import { Header } from "../marketing/header";
import { Footer } from "../marketing/footer";

interface LegalLayoutProps {
    children: ReactNode;
}

export function LegalLayout({ children }: LegalLayoutProps) {
    return (
        <main className="min-h-screen bg-background">
            <Header />
            <div className="mx-auto w-full max-w-4xl px-6 py-18 lg:py-18">
                {children}
            </div>
            <Footer />
        </main>
    )
}
interface LegalSectionProps {
    title: string;
    children: React.ReactNode;
}

export function LegalSection ({ title, children }: LegalSectionProps) {
    return (
        <section className="space-y-4 scroll-mt-24 py-6">
            <h2 className="text-3xl font-semibold tracking-tight">
                {title}
            </h2>
            <div className="space-y-4 text-base text-muted-foreground leading-7">
                {children}
            </div>
        </section>
    )
}
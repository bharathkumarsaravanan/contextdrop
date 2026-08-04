interface LegalHeaderProps {
    title: string;
    description: string;
    lastUpdated: string;
};

export function LegalHeader({
    title,
    description,
    lastUpdated
}: LegalHeaderProps) {
    return (
        <header className="mt-16">
            <h1 className="text-4xl font-bold tracking-tight">
                {title}
            </h1>

            <p className="mt-4 text-sm text-muted-foreground">
                Last updated: {lastUpdated}
            </p>

            <p className="mt-6 max-w-2xl text-base leading-7 text-muted-foreground">
                {description}
            </p>
            
        </header>
    )
}
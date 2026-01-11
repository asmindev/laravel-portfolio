interface FooterProps {
    fullName?: string | null;
}

export function Footer({ fullName }: FooterProps) {
    return (
        <footer className="border-t border-border py-8">
            <div className="container mx-auto max-w-5xl px-4">
                <p className="text-center text-sm text-muted-foreground">
                    © {new Date().getFullYear()} {fullName || 'Portfolio'}. All rights reserved.
                </p>
            </div>
        </footer>
    );
}

import { ModeToggle } from '@/components/mode-toggle';
import { Link } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

const links = [
    { label: 'Karya', href: '#projects' },
    { label: 'Tentang', href: '#about' },
    { label: 'Kontak', href: '#contact' },
];

export function Header() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <header
            className={cn(
                'fixed top-0 left-0 right-0 z-50 transition-all duration-200',
                scrolled ? 'bg-background/80 backdrop-blur-sm py-4' : 'py-6',
            )}
        >
            <div className="max-w-5xl mx-auto px-5 flex items-center justify-between">
                <Link href="/" className="font-serif text-xl text-foreground">
                    Asmin
                </Link>

                <div className="flex items-center gap-6">
                    {links.map((l) => (
                        <a
                            key={l.href}
                            href={l.href}
                            className="hidden sm:block text-[13px] text-muted-foreground hover:text-foreground transition-colors"
                        >
                            {l.label}
                        </a>
                    ))}
                    <ModeToggle />
                </div>
            </div>
        </header>
    );
}

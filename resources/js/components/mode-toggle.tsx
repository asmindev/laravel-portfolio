import { Button } from '@/components/ui/button';
import { useTheme } from '@/hooks/use-theme';
import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useState } from 'react';

export function ModeToggle() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return <div className="h-10 w-10" />; // Placeholder to prevent layout shift
    }

    const isDark = theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);

    const toggleTheme = () => {
        setTheme(isDark ? 'light' : 'dark');
    };

    return (
        <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="group relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border border-border bg-background/50 hover:bg-accent"
            aria-label="Toggle theme"
        >
            <AnimatePresence mode="wait" initial={false}>
                <motion.div
                    key={isDark ? 'dark' : 'light'}
                    initial={{ y: -20, opacity: 0, rotate: -90 }}
                    animate={{ y: 0, opacity: 1, rotate: 0 }}
                    exit={{ y: 20, opacity: 0, rotate: 90 }}
                    transition={{ duration: 0.2, ease: 'easeInOut' }}
                    className="absolute inset-0 flex items-center justify-center text-foreground group-hover:text-primary"
                >
                    {isDark ? <MoonIcon className="h-5 w-5" /> : <SunIcon className="h-5 w-5" />}
                </motion.div>
            </AnimatePresence>
            <span className="sr-only">Toggle theme</span>
        </Button>
    );
}

// Simple Icon Components (to avoid extra dependencies if lucide isn't installed, or use lucide if available)
// Assuming standard svg structure for consistency with shared.tsx
function MoonIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
        </svg>
    );
}

function SunIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2" />
            <path d="M12 20v2" />
            <path d="m4.93 4.93 1.41 1.41" />
            <path d="m17.66 17.66 1.41 1.41" />
            <path d="M2 12h2" />
            <path d="M20 12h2" />
            <path d="m6.34 17.66-1.41 1.41" />
            <path d="m19.07 4.93-1.41 1.41" />
        </svg>
    );
}

import { useEffect, useState } from 'react';

type Theme = 'dark' | 'light' | 'system';

export function useTheme() {
    const [theme, setTheme] = useState<Theme>(() => {
        if (typeof window !== 'undefined') {
            return (localStorage.getItem('appearance') as Theme) || 'system';
        }
        return 'system';
    });

    useEffect(() => {
        const root = window.document.documentElement;
        const targetTheme = theme === 'system'
            ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
            : theme;

        if (!root.classList.contains(targetTheme)) {
            root.classList.remove('light', 'dark');
            root.classList.add(targetTheme);
        }

        localStorage.setItem('appearance', theme);
    }, [theme]);

    return { theme, setTheme };
}

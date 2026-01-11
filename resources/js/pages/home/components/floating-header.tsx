import { ModeToggle } from '@/components/mode-toggle';
import { cn } from '@/lib/utils';
import { Menu, X } from 'lucide-react';
import { animate, AnimatePresence, motion } from 'motion/react';
import { useEffect, useRef, useState } from 'react';

const navItems = [
    { name: 'Beranda', id: 'home' },
    { name: 'Tentang', id: 'about' },
    { name: 'Keahlian', id: 'skills' },
    { name: 'Proyek', id: 'projects' },
    { name: 'Pengalaman', id: 'experience' },
    { name: 'Pendidikan', id: 'education' },
];

export function FloatingHeader() {
    const [activeTab, setActiveTab] = useState('home');
    const isManualScroll = useRef(false);

    useEffect(() => {
        const handleScroll = () => {
            if (isManualScroll.current) return;

            const sections = navItems.map((item) => document.getElementById(item.id));
            const scrollPosition = window.scrollY + window.innerHeight / 3;

            for (const section of sections) {
                if (section) {
                    const sectionTop = section.offsetTop;
                    const sectionHeight = section.offsetHeight;

                    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                        setActiveTab(section.id);
                        break;
                    }
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            isManualScroll.current = true;
            setActiveTab(id);

            const targetY = element.offsetTop - 100;
            const startY = window.scrollY;

            animate(startY, targetY, {
                type: 'spring',
                stiffness: 100,
                damping: 20,
                onUpdate: (latest) => window.scrollTo(0, latest),
                onComplete: () => {
                    isManualScroll.current = false;
                },
            });
        }
    };

    return (
        <>
            <DesktopNav activeTab={activeTab} scrollToSection={scrollToSection} />
            <MobileNav activeTab={activeTab} scrollToSection={scrollToSection} />
        </>
    );
}

function DesktopNav({ activeTab, scrollToSection }: { activeTab: string; scrollToSection: (id: string) => void }) {
    return (
        <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed top-8 right-0 left-0 z-50 mx-auto hidden w-fit max-w-[90vw] items-center gap-1 rounded-full border border-foreground/10 bg-black/60 px-2 py-1 shadow-xl backdrop-blur-xl supports-backdrop-filter:bg-black/30 md:flex"
        >
            {navItems.map((item) => (
                <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={cn(
                        'relative px-4 py-2 text-sm font-medium transition-colors duration-300',
                        activeTab === item.id ? 'text-black' : 'text-foreground/70 hover:text-foreground',
                    )}
                >
                    {activeTab === item.id && (
                        <motion.div
                            layoutId="active-pill-desktop"
                            className="absolute inset-0 rounded-full bg-white shadow-[0_0_20px_rgba(255,255,255,0.3)] backdrop-blur-sm"
                            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        />
                    )}
                    <motion.span
                        className="relative z-10 block"
                        animate={{
                            filter: activeTab === item.id ? 'blur(0px)' : 'blur(0px)',
                            opacity: activeTab === item.id ? 1 : 0.7,
                            scale: activeTab === item.id ? 1.05 : 1,
                        }}
                        initial={{ filter: 'blur(0px)' }}
                        transition={{
                            type: 'spring',
                            stiffness: 500,
                            damping: 30,
                        }}
                    >
                        {activeTab === item.id ? (
                            <motion.span
                                initial={{ filter: 'blur(10px)', opacity: 0 }}
                                animate={{ filter: 'blur(0px)', opacity: 1 }}
                                transition={{ duration: 0.3 }}
                            >
                                {item.name}
                            </motion.span>
                        ) : (
                            item.name
                        )}
                    </motion.span>
                </button>
            ))}

            <div className="mx-2 h-4 w-px bg-white/20" />

            <div className="pr-2 pl-1">
                <ModeToggle />
            </div>
        </motion.div>
    );
}

function MobileNav({ activeTab, scrollToSection }: { activeTab: string; scrollToSection: (id: string) => void }) {
    const [isOpen, setIsOpen] = useState(false);
    const activeItem = navItems.find((item) => item.id === activeTab) || navItems[0];

    return (
        <div className="fixed right-0 bottom-6 left-0 z-50 flex justify-center md:hidden">
            <AnimatePresence mode="wait">
                {isOpen ? (
                    <motion.div
                        key="expanded"
                        layoutId="mobile-nav"
                        className="flex w-[90vw] flex-col gap-4 rounded-3xl border border-white/10 bg-black/80 p-6 shadow-2xl backdrop-blur-xl supports-backdrop-filter:bg-black/40"
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                    >
                        <div className="flex items-center justify-between">
                            <span className="pl-2 text-sm font-medium tracking-widest text-white/50 uppercase">Menu</span>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
                            >
                                <X size={20} />
                            </button>
                        </div>
                        <div className="flex flex-col gap-2">
                            {navItems.map((item) => (
                                <button
                                    key={item.id}
                                    onClick={() => {
                                        scrollToSection(item.id);
                                        setIsOpen(false);
                                    }}
                                    className={cn(
                                        'rounded-xl px-4 py-3 text-left text-lg font-medium transition-all',
                                        activeTab === item.id ? 'bg-white text-black shadow-lg' : 'text-white/70 hover:bg-white/10 hover:text-white',
                                    )}
                                >
                                    {item.name}
                                </button>
                            ))}
                        </div>
                        <div className="mt-2 flex items-center justify-between border-t border-white/10 pt-4">
                            <span className="pl-2 text-sm text-white/50">Tema</span>
                            <ModeToggle />
                        </div>
                    </motion.div>
                ) : (
                    <motion.button
                        key="collapsed"
                        layoutId="mobile-nav"
                        onClick={() => setIsOpen(true)}
                        className="flex items-center gap-3 rounded-full border border-white/10 bg-black/60 px-6 py-3 shadow-xl backdrop-blur-xl supports-backdrop-filter:bg-black/30"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                    >
                        <motion.span
                            key={activeItem.id}
                            initial={{ filter: 'blur(10px)', opacity: 0, y: 5 }}
                            animate={{ filter: 'blur(0px)', opacity: 1, y: 0 }}
                            exit={{ filter: 'blur(10px)', opacity: 0, y: -5 }}
                            transition={{ duration: 0.3 }}
                            className="text-sm font-medium text-white"
                        >
                            {activeItem.name}
                        </motion.span>
                        <div className="h-4 w-px bg-white/20" />
                        <Menu size={20} className="text-white" />
                    </motion.button>
                )}
            </AnimatePresence>
        </div>
    );
}

import { Profile, SocialLink } from '../types';
import { ArrowUp, ArrowUpRight, Check, Copy, Mail, MessageCircle, Phone } from 'lucide-react';
import { useEffect, useState } from 'react';

interface ContactProps {
    profile?: Profile | null;
    socialLinks?: SocialLink[];
}

export function Contact({ profile, socialLinks = [] }: ContactProps) {
    const [copied, setCopied] = useState(false);
    const [currentTime, setCurrentTime] = useState('');

    const email = profile?.email || 'asminmin477@gmail.com';
    const rawPhone = profile?.phone || '+62 812-4287-3775';
    const waNumber = rawPhone.replace(/[^0-9]/g, '');

    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            // Kendari local time in WITA (Asia/Makassar, UTC+8)
            const timeStr = new Intl.DateTimeFormat('id-ID', {
                timeZone: 'Asia/Makassar',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: false,
            }).format(now);
            setCurrentTime(`${timeStr} WITA (UTC+8)`);
        };

        updateTime();
        const timer = setInterval(updateTime, 1000);
        return () => clearInterval(timer);
    }, []);

    const copyEmail = () => {
        navigator.clipboard.writeText(email);
        setCopied(true);
        setTimeout(() => setCopied(false), 2200);
    };

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <footer id="contact" className="relative pt-28 sm:pt-36 md:pt-44 pb-12 sm:pb-16 border-t border-border overflow-hidden bg-background">
            {/* Subtle luxury background radial gradient */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-olive/5 dark:bg-olive/10 blur-[140px] pointer-events-none rounded-full" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gold/5 dark:bg-gold/10 blur-[140px] pointer-events-none rounded-full" />

            <div className="max-w-6xl mx-auto px-5 sm:px-8 relative z-10">
                {/* Section Eyebrow & Availability */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-8 border-b border-border/40">
                    <span className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
                        Kontak
                    </span>

                    <div className="flex items-center gap-2.5 text-xs font-mono text-muted-foreground">
                        <span className="h-2 w-2 rounded-full bg-olive dark:bg-olive-light" />
                        <span className="text-foreground font-medium">Open buat proyek</span>
                    </div>
                </div>

                {/* Monumental Headline */}
                <div className="mt-12 sm:mt-16 max-w-4xl">
                    <h2 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-[5rem] font-normal text-foreground leading-[1.02] tracking-tight">
                        Ada proyek? Ngobrol dulu.
                    </h2>
                    <p className="mt-6 font-sans text-base sm:text-lg text-muted-foreground font-light max-w-xl leading-relaxed">
                        Bisa bantu soal Odoo ERP, database, atau bikin web &amp; mobile.
                        Kirim email aja, saya bales secepatnya.
                    </p>
                </div>

                {/* Immersive Interactive Email Block */}
                <div className="mt-12 sm:mt-16 p-8 sm:p-12 rounded-sm border border-border/70 bg-secondary/15 hover:border-olive/40 transition-colors">
                    <span className="text-xs font-mono uppercase tracking-widest text-muted-foreground block mb-3">
                        Email saya
                    </span>

                    <div className="flex flex-col lg:flex-row lg:items-baseline justify-between gap-6">
                        <a
                            href={`mailto:${email}`}
                            className="font-serif text-3xl sm:text-5xl md:text-6xl text-foreground hover:text-olive dark:hover:text-olive-light transition-colors break-all leading-tight"
                        >
                            {email}
                        </a>

                        <div className="flex flex-wrap items-center gap-3 sm:gap-4 shrink-0 font-mono text-xs uppercase tracking-wider">
                            <button
                                onClick={copyEmail}
                                className="group inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-border/80 hover:border-foreground bg-background text-foreground transition-all"
                            >
                                {copied ? (
                                    <>
                                        <Check className="w-3.5 h-3.5 text-olive dark:text-olive-light" />
                                        <span>Tersalin</span>
                                    </>
                                ) : (
                                    <>
                                        <Copy className="w-3.5 h-3.5 text-muted-foreground group-hover:text-foreground" />
                                        <span>Salin</span>
                                    </>
                                )}
                            </button>

                            <a
                                href={`mailto:${email}`}
                                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-foreground text-background hover:bg-olive hover:text-white dark:hover:bg-olive-light dark:hover:text-black transition-all font-medium"
                            >
                                <Mail className="w-3.5 h-3.5" />
                                <span>Kirim email</span>
                            </a>
                        </div>
                    </div>
                </div>

                {/* Direct Channel Rows */}
                {(() => {
                    const githubUrl = socialLinks.find(s => s.platform.toLowerCase().includes('github'))?.url || 'https://github.com/asmindev';
                    const linkedinUrl = socialLinks.find(s => s.platform.toLowerCase().includes('linkedin'))?.url || 'https://linkedin.com/in/asmindev';
                    const instagramUrl = socialLinks.find(s => s.platform.toLowerCase().includes('instagram'))?.url || 'https://instagram.com/iniasmin_';

                    const channels = [
                        {
                            label: 'WhatsApp & Telepon',
                            handle: rawPhone,
                            url: `https://wa.me/${waNumber}`,
                            external: true,
                        },
                        {
                            label: 'LinkedIn',
                            handle: 'in/asmindev',
                            url: linkedinUrl,
                            external: true,
                        },
                        {
                            label: 'GitHub',
                            handle: '@asmindev',
                            url: githubUrl,
                            external: true,
                        },
                        {
                            label: 'Instagram',
                            handle: '@iniasmin_',
                            url: instagramUrl,
                            external: true,
                        },
                    ];

                    return (
                        <div className="mt-12 sm:mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 font-sans">
                            {channels.map((ch, idx) => (
                                <a
                                    key={idx}
                                    href={ch.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group p-6 rounded-sm border border-border/50 hover:border-olive/50 bg-secondary/10 hover:bg-secondary/25 transition-all flex flex-col justify-between"
                                >
                                    <div className="flex items-center justify-between text-muted-foreground group-hover:text-foreground mb-4">
                                        <span className="text-xs font-mono uppercase tracking-wider">{ch.label}</span>
                                        <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform text-olive dark:text-olive-light" />
                                    </div>
                                    <span className="font-serif text-xl sm:text-2xl text-foreground group-hover:text-olive dark:group-hover:text-olive-light transition-colors truncate">
                                        {ch.handle}
                                    </span>
                                </a>
                            ))}
                        </div>
                    );
                })()}

                {/* Coordinates & World Clock Bar */}
                <div className="mt-16 sm:mt-20 pt-8 border-t border-border/50 flex flex-col sm:flex-row sm:items-center justify-between gap-6 text-xs font-mono text-muted-foreground">
                    <div className="flex flex-wrap items-center gap-6">
                        <span>{profile?.location || 'Kendari, Sulawesi Tenggara, Indonesia'}</span>
                        <span className="hidden sm:inline">·</span>
                        <span className="text-foreground font-medium">{currentTime || 'WITA (UTC+8)'}</span>
                    </div>

                    <button
                        onClick={scrollToTop}
                        className="group inline-flex items-center gap-1.5 text-foreground hover:text-olive dark:hover:text-olive-light transition-colors self-start sm:self-auto uppercase tracking-wider"
                    >
                        <span>Ke atas</span>
                        <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-1 transition-transform" />
                    </button>
                </div>

                {/* Colophon & Tech Specs */}
                <div className="mt-8 pt-6 border-t border-border/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs font-mono text-muted-foreground/70">
                    <span>&copy; {new Date().getFullYear()} Asmin. Hak cipta dilindungi.</span>
                    <span>Laravel 12 · React 19 · Inertia.js 2.0</span>
                </div>
            </div>

            {/* Oversized Architectural Watermark (Iconic Awwwards Luxury Finishing Touch) */}
            <div className="w-full mt-12 sm:mt-16 overflow-hidden pointer-events-none select-none">
                <p className="font-serif text-[clamp(4.5rem,19vw,15rem)] leading-[0.8] tracking-tighter text-center text-foreground/[0.04] dark:text-foreground/[0.05] whitespace-nowrap">
                    ASMIN
                </p>
            </div>
        </footer>
    );
}

export const Footer = Contact;

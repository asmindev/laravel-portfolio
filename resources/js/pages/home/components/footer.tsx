import { useEffect, useState } from 'react';
import { Profile, SocialLink } from '../types';
import { ExternalLinkIcon } from './shared';

interface FooterProps {
    fullName?: string | null;
    profile?: Profile | null;
    socialLinks?: SocialLink[];
}

export function Footer({ fullName, profile, socialLinks = [] }: FooterProps) {
    const [time, setTime] = useState<string>('');
    const [timeZone, setTimeZone] = useState<string>('');

    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            setTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }));

            // otherwise fallback to the system's short name which might be specific
            const tzShort = now.toLocaleTimeString('en-US', { timeZoneName: 'short' }).split(' ').pop();
            setTimeZone(tzShort || '');
        };
        updateTime();
        const interval = setInterval(updateTime, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <footer className="relative overflow-hidden border-t border-white/10 bg-black py-20 lg:py-32">
            <div className="container mx-auto max-w-7xl px-4">
                <div className="mb-24 flex flex-col items-start justify-between gap-12 md:flex-row md:items-end">
                    <div className="max-w-3xl">
                        <span className="mb-8 block font-mono text-sm tracking-widest text-primary uppercase">What's Next?</span>
                        <h2 className="font-heading text-6xl leading-[0.8] font-black tracking-tighter text-white md:text-[10vw]">
                            LET'S WORK
                            <br />
                            <span className="text-white/20 transition-colors duration-500 hover:text-white">TOGETHER.</span>
                        </h2>
                    </div>

                    {/* Magnetic Button Effect */}
                    <div className="group relative flex h-40 w-40 cursor-pointer items-center justify-center rounded-full border border-white/20 bg-neutral-900 transition-all duration-500 hover:border-primary hover:bg-primary sm:h-56 sm:w-56">
                        <a href={`mailto:${profile?.email || 'hello@example.com'}`} className="absolute inset-0 z-20" />
                        <div className="relative z-10 flex flex-col items-center gap-2 text-white transition-colors group-hover:text-black">
                            <span className="text-lg font-medium">Get in touch</span>
                            <ExternalLinkIcon className="h-6 w-6" />
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-8 border-t border-white/10 pt-12 md:flex-row md:justify-between">
                    <div className="flex flex-col gap-4">
                        <span className="font-mono text-xs text-muted-foreground uppercase">Socials</span>
                        <div className="flex gap-6">
                            {socialLinks.map((link) => (
                                <a
                                    key={link.id}
                                    href={link.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-sm font-medium text-white transition-colors hover:text-primary"
                                >
                                    {link.platform}
                                </a>
                            ))}
                        </div>
                    </div>

                    <div className="flex flex-col gap-4 md:items-end">
                        <span className="font-mono text-xs text-muted-foreground uppercase">Local Time</span>
                        <span className="font-mono text-xl text-white">
                            {time} {timeZone}
                        </span>
                    </div>
                </div>

                <div className="mt-20 flex flex-col items-center justify-between gap-4 text-xs text-white/20 md:flex-row">
                    <p>
                        © {new Date().getFullYear()} {fullName || 'Portfolio'}. All rights reserved.
                    </p>
                    <p>Designed & Developed with Passion.</p>
                </div>
            </div>

            {/* Background Gradient */}
            <div className="pointer-events-none absolute right-0 -bottom-1/2 left-0 h-full bg-linear-to-t from-primary/10 to-transparent blur-3xl" />
        </footer>
    );
}

// Add types for props in existing types file if needed, specifically profile email might optionally be gathered from user prop if not in profile,
// using profile?.email as placeholder. Assuming User or Profile has email.
// If profile doesn't have email, we might need to rely on static or user prop.
// For now, implementing as safe navigation.

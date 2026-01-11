import { motion } from 'motion/react';
import { Certificate } from '../types';
import { ExternalLinkIcon, fadeInUp, formatDate, staggerContainer } from './shared';

interface CertificatesSectionProps {
    certificates: Certificate[];
}

export function CertificatesSection({ certificates }: CertificatesSectionProps) {
    if (certificates.length === 0) return null;

    return (
        <section className="py-24 lg:py-32">
            <div className="container mx-auto max-w-5xl px-4">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-100px' }}
                    variants={staggerContainer}
                    className="flex flex-col gap-12"
                >
                    <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
                        <div>
                            <span className="mb-2 block font-mono text-sm tracking-widest text-primary uppercase">Qualifications</span>
                            <h2 className="font-heading text-4xl font-bold text-foreground md:text-5xl lg:text-6xl">
                                Certificates<span className="text-primary">.</span>
                            </h2>
                        </div>
                    </div>

                    <div className="flex flex-col border-t border-white/5">
                        {certificates.map((cert) => (
                            <motion.div
                                key={cert.id}
                                variants={fadeInUp}
                                className="group relative border-b border-white/5 transition-colors hover:bg-white/5"
                            >
                                <a
                                    href={cert.credential_url ? cert.credential_url : undefined}
                                    target={cert.credential_url ? '_blank' : undefined}
                                    rel="noopener noreferrer"
                                    className={`flex flex-col gap-4 px-4 py-8 md:flex-row md:items-center md:px-8 ${!cert.credential_url && 'cursor-default'}`}
                                >
                                    {/* Title & Issuer */}
                                    <div className="flex-1">
                                        <h3 className="mb-1 font-heading text-xl font-bold text-foreground transition-colors group-hover:text-primary">
                                            {cert.title}
                                        </h3>
                                        <p className="text-sm font-medium text-muted-foreground">{cert.issuer}</p>
                                    </div>

                                    {/* Dates */}
                                    <div className="flex flex-col items-start gap-1 md:items-end">
                                        <span className="font-mono text-sm font-medium text-foreground">{formatDate(cert.issue_date)}</span>
                                        {cert.expiry_date && (
                                            <span className="text-xs text-muted-foreground">Expires: {formatDate(cert.expiry_date)}</span>
                                        )}
                                    </div>

                                    {/* Hover Arrow (Desktop) */}
                                    {cert.credential_url && (
                                        <div className="hidden pl-8 md:block">
                                            <div className="flex h-10 w-10 -translate-x-4 items-center justify-center rounded-full border border-white/10 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
                                                <ExternalLinkIcon />
                                            </div>
                                        </div>
                                    )}
                                </a>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

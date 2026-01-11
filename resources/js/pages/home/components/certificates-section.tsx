import { Card, CardContent } from '@/components/ui/card';
import { Certificate } from '../types';
import { ExternalLinkIcon, formatDate } from './shared';

interface CertificatesSectionProps {
    certificates: Certificate[];
}

export function CertificatesSection({ certificates }: CertificatesSectionProps) {
    if (certificates.length === 0) return null;

    return (
        <section className="py-16 lg:py-24">
            <div className="container mx-auto max-w-5xl px-4">
                <h2 className="mb-8 text-2xl font-semibold text-foreground">Certificates</h2>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    {certificates.map((cert) => (
                        <Card
                            key={cert.id}
                            className="border-border/40 bg-background/70 shadow-[0_2px_8px_rgba(0,0,0,0.04)] backdrop-blur-sm transition-shadow hover:shadow-[0_4px_12px_rgba(0,0,0,0.06)]"
                        >
                            <CardContent className="p-5">
                                <h3 className="mb-1 font-semibold text-foreground">{cert.title}</h3>
                                <p className="mb-2 text-sm text-muted-foreground">{cert.issuer}</p>
                                <p className="text-xs text-muted-foreground">
                                    Issued: {formatDate(cert.issue_date)}
                                    {cert.expiry_date && ` · Expires: ${formatDate(cert.expiry_date)}`}
                                </p>
                                {cert.credential_url && (
                                    <a
                                        href={cert.credential_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="mt-2 inline-flex items-center gap-1 text-xs text-primary hover:underline"
                                    >
                                        View Credential <ExternalLinkIcon />
                                    </a>
                                )}
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}

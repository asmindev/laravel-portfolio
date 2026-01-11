import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { Experience } from '../types';
import { formatDate, MapPinIcon } from './shared';

interface ExperienceSectionProps {
    experiences: Experience[];
}

export function ExperienceSection({ experiences }: ExperienceSectionProps) {
    if (experiences.length === 0) return null;

    return (
        <section className="py-16 lg:py-24">
            <div className="container mx-auto max-w-5xl px-4">
                <h2 className="mb-8 text-2xl font-semibold text-foreground">Experience</h2>
                <div className="space-y-6">
                    {experiences.map((exp) => (
                        <Card
                            key={exp.id}
                            className="border-border/40 bg-background/70 shadow-[0_2px_8px_rgba(0,0,0,0.04)] backdrop-blur-sm transition-shadow hover:shadow-[0_4px_12px_rgba(0,0,0,0.06)]"
                        >
                            <CardContent className="p-6">
                                <div className="flex flex-col gap-4 md:flex-row md:items-start">
                                    {exp.company_logo && (
                                        <Avatar className="h-12 w-12 rounded-lg border">
                                            <AvatarImage src={exp.company_logo} alt={exp.company_name} />
                                            <AvatarFallback className="rounded-lg bg-secondary text-secondary-foreground">
                                                {exp.company_name.charAt(0)}
                                            </AvatarFallback>
                                        </Avatar>
                                    )}
                                    <div className="flex-1">
                                        <div className="mb-2 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                                            <div>
                                                <h3 className="font-semibold text-foreground">{exp.position}</h3>
                                                <p className="text-muted-foreground">
                                                    {exp.company_url ? (
                                                        <a
                                                            href={exp.company_url}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="transition-colors hover:text-primary"
                                                        >
                                                            {exp.company_name}
                                                        </a>
                                                    ) : (
                                                        exp.company_name
                                                    )}
                                                </p>
                                            </div>
                                            <div className="text-sm text-muted-foreground">
                                                {formatDate(exp.start_date)} -{' '}
                                                {exp.is_current ? 'Present' : exp.end_date ? formatDate(exp.end_date) : 'N/A'}
                                            </div>
                                        </div>
                                        {exp.location && (
                                            <p className="mb-3 flex items-center gap-1 text-sm text-muted-foreground">
                                                <MapPinIcon />
                                                {exp.location}
                                                {exp.employment_type && ` · ${exp.employment_type}`}
                                            </p>
                                        )}
                                        {exp.description && <p className="text-sm leading-relaxed text-muted-foreground">{exp.description}</p>}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}

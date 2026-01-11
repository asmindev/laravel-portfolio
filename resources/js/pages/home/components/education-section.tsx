import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { Education } from '../types';
import { formatDate } from './shared';

interface EducationSectionProps {
    educations: Education[];
}

export function EducationSection({ educations }: EducationSectionProps) {
    if (educations.length === 0) return null;

    return (
        <section className="py-16 lg:py-24">
            <div className="container mx-auto max-w-5xl px-4">
                <h2 className="mb-8 text-2xl font-semibold text-foreground">Education</h2>
                <div className="space-y-6">
                    {educations.map((edu) => (
                        <Card
                            key={edu.id}
                            className="border-border/40 bg-background/70 shadow-[0_2px_8px_rgba(0,0,0,0.04)] backdrop-blur-sm transition-shadow hover:shadow-[0_4px_12px_rgba(0,0,0,0.06)]"
                        >
                            <CardContent className="p-6">
                                <div className="flex flex-col gap-4 md:flex-row md:items-start">
                                    {edu.logo && (
                                        <Avatar className="h-12 w-12 rounded-lg border">
                                            <AvatarImage src={edu.logo} alt={edu.institution} />
                                            <AvatarFallback className="rounded-lg bg-secondary text-secondary-foreground">
                                                {edu.institution.charAt(0)}
                                            </AvatarFallback>
                                        </Avatar>
                                    )}
                                    <div className="flex-1">
                                        <div className="mb-2 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                                            <div>
                                                <h3 className="font-semibold text-foreground">{edu.institution}</h3>
                                                <p className="text-muted-foreground">
                                                    {edu.degree}
                                                    {edu.field_of_study && ` in ${edu.field_of_study}`}
                                                </p>
                                            </div>
                                            <div className="text-sm text-muted-foreground">
                                                {formatDate(edu.start_date)} - {edu.end_date ? formatDate(edu.end_date) : 'Present'}
                                            </div>
                                        </div>
                                        {edu.gpa && <p className="mb-2 text-sm text-muted-foreground">GPA: {edu.gpa.toFixed(2)}</p>}
                                        {edu.description && <p className="text-sm leading-relaxed text-muted-foreground">{edu.description}</p>}
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

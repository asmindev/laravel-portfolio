import { Experience as ExperienceType } from '../types';

interface ExperienceProps {
    experiences: ExperienceType[];
}

function parseExperienceDescription(description: string | null) {
    if (!description) return { intro: '', points: [] };

    // Split by newlines, trim, and filter out empty lines
    const lines = description
        .split('\n')
        .map((l) => l.trim())
        .filter(Boolean);

    const intro: string[] = [];
    const points: string[] = [];

    for (const line of lines) {
        if (line.startsWith('•') || line.startsWith('-') || line.startsWith('*')) {
            const cleaned = line.replace(/^[•\-\*]\s*/u, '').trim();
            if (cleaned) points.push(cleaned);
        } else {
            intro.push(line);
        }
    }

    return {
        intro: intro.join(' '),
        points,
    };
}

export function Experience({ experiences = [] }: ExperienceProps) {
    if (!experiences || experiences.length === 0) return null;

    const fmt = (d: string | null) => {
        if (!d) return 'Sekarang';
        return new Date(d).toLocaleDateString('id-ID', { month: 'short', year: 'numeric' });
    };

    return (
        <section id="experience" className="py-20 sm:py-28 md:py-36 border-t border-border">
            <div className="max-w-5xl mx-auto px-5 sm:px-8">
                {/* Section Header */}
                <div className="pb-10 sm:pb-14 border-b border-border">
                    <span className="text-xs font-mono text-muted-foreground uppercase tracking-widest block mb-2">
                        Kerja
                    </span>
                    <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-foreground">
                        Pengalaman
                    </h2>
                </div>

                {/* Experience List */}
                <div className="divide-y divide-border/40">
                    {experiences.map((exp, i) => {
                        const start = fmt(exp.start_date);
                        const end = exp.is_current ? 'Sekarang' : fmt(exp.end_date);
                        const parsed = parseExperienceDescription(exp.description);

                        return (
                            <div
                                key={exp.id || i}
                                className="py-10 sm:py-14 first:pt-8 last:pb-0 flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-12"
                            >
                                {/* Left Column: Date & Organization (Responsive) */}
                                <div className="sm:w-56 shrink-0">
                                    <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground">
                                        <span>
                                            {start} &mdash; {end}
                                        </span>
                                        {exp.is_current && (
                                            <span className="text-olive dark:text-olive-light font-medium">
                                                [Aktif]
                                            </span>
                                        )}
                                    </div>
                                    <span className="text-sm font-medium text-foreground block mt-1.5">
                                        {exp.company_name}
                                    </span>
                                    {exp.location && (
                                        <span className="text-xs text-muted-foreground block mt-0.5">
                                            {exp.location}
                                        </span>
                                    )}
                                </div>

                                {/* Right Column: Position & Clean Hanging Points */}
                                <div className="flex-1 min-w-0">
                                    <h3 className="font-serif text-2xl sm:text-3xl text-foreground font-normal leading-snug">
                                        {exp.position}
                                    </h3>

                                    {parsed.intro && (
                                        <p className="mt-3 text-sm text-foreground/80 font-light leading-relaxed">
                                            {parsed.intro}
                                        </p>
                                    )}

                                    {parsed.points.length > 0 && (
                                        <ul className="mt-4 space-y-3 text-[13.5px] sm:text-sm text-muted-foreground font-light leading-relaxed">
                                            {parsed.points.map((point, idx) => (
                                                <li key={idx} className="flex items-start gap-3">
                                                    <span
                                                        className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-olive dark:bg-olive-light"
                                                        aria-hidden="true"
                                                    />
                                                    <span className="flex-1 leading-relaxed">
                                                        {point}
                                                    </span>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

export const ExperienceSection = Experience;

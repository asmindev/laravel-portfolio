import { Badge } from '@/components/ui/badge';
import { Skill } from '../types';

interface SkillsSectionProps {
    skills: Skill[];
}

export function SkillsSection({ skills }: SkillsSectionProps) {
    if (skills.length === 0) return null;

    const groupedSkills = skills.reduce(
        (acc, skill) => {
            const category = skill.category || 'Other';
            if (!acc[category]) {
                acc[category] = [];
            }
            acc[category].push(skill);
            return acc;
        },
        {} as Record<string, Skill[]>,
    );

    return (
        <section className="py-16 lg:py-24">
            <div className="container mx-auto max-w-5xl px-4">
                <h2 className="mb-8 text-2xl font-semibold text-foreground">Skills</h2>
                <div className="space-y-8">
                    {Object.entries(groupedSkills).map(([category, categorySkills]) => (
                        <div key={category}>
                            <h3 className="mb-4 text-sm font-medium tracking-wider text-muted-foreground uppercase">{category}</h3>
                            <div className="flex flex-wrap gap-2">
                                {categorySkills.map((skill) => (
                                    <Badge key={skill.id} variant="secondary" className="px-3 py-1.5 text-sm font-normal">
                                        {skill.name}
                                        {skill.proficiency_level && (
                                            <span className="ml-2 text-xs text-muted-foreground">{skill.proficiency_level}%</span>
                                        )}
                                    </Badge>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

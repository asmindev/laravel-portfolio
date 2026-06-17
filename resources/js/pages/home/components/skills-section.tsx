import { motion } from 'motion/react';
import { Skill } from '../types';
import { fadeInUp, staggerContainer } from './shared';

interface SkillsSectionProps {
    skills: Skill[];
}

export function SkillsSection({ skills }: SkillsSectionProps) {
    if (skills.length === 0) return null;

    // Group skills by category
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

    // Sort categories (optional: prioritized order if needed, otherwise default)
    const categories = Object.keys(groupedSkills);

    return (
        <section className="relative py-24 lg:py-32">
            <div className="container mx-auto px-4">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-100px' }}
                    variants={staggerContainer}
                    className="flex flex-col gap-16"
                >
                    {/* Visual Section Header */}
                    <motion.div variants={fadeInUp} className="flex flex-col items-start gap-4 md:flex-row md:items-end md:justify-between">
                        <div>
                            <span className="mb-2 block font-mono text-sm tracking-widest text-primary uppercase">My Stack</span>
                            <h2 className="font-heading text-4xl font-bold text-foreground md:text-5xl lg:text-6xl">
                                Technologies<span className="text-primary">.</span>
                            </h2>
                        </div>
                        <p className="max-w-md text-muted-foreground">
                            I specialize in building robust solutions using these modern technologies and tools.
                        </p>
                    </motion.div>

                    {/* Bento Grid Layout */}
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {categories.map((category, index) => (
                            <motion.div
                                key={category}
                                variants={fadeInUp}
                                className={`group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-border bg-card p-8 shadow-sm transition-all duration-500 hover:border-primary/30 hover:shadow-md ${
                                    index === 0 ? 'lg:col-span-2' : ''
                                }`}
                            >
                                {/* Subtle Gradient Mesh Background - Adaptive opacity */}
                                <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-primary/10 blur-[80px] transition-all duration-500 group-hover:bg-primary/20 dark:bg-primary/20 dark:group-hover:bg-primary/30" />

                                <div className="relative z-10 w-full">
                                    <h3 className="mb-6 font-heading text-2xl font-bold tracking-tight text-card-foreground flex items-center justify-between">
                                        <span>{category}</span>
                                        <span className="text-xs font-mono font-normal text-muted-foreground opacity-60">
                                            {groupedSkills[category].length} item{groupedSkills[category].length > 1 ? 's' : ''}
                                        </span>
                                    </h3>
                                    <div className={`grid gap-x-8 gap-y-4 ${
                                        index === 0 ? 'sm:grid-cols-2' : 'grid-cols-1'
                                    }`}>
                                        {groupedSkills[category].map((skill) => (
                                            <div key={skill.id} className="space-y-1.5 group/skill">
                                                <div className="flex items-center justify-between text-sm">
                                                    <span className="font-medium text-foreground/80 group-hover/skill:text-primary transition-colors duration-300">
                                                        {skill.name}
                                                    </span>
                                                    {skill.proficiency_level && (
                                                        <span className="font-mono text-xs text-muted-foreground group-hover/skill:text-primary transition-colors duration-300">
                                                            {skill.proficiency_level}%
                                                        </span>
                                                    )}
                                                </div>
                                                {skill.proficiency_level && (
                                                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-secondary">
                                                        <motion.div
                                                            initial={{ width: 0 }}
                                                            whileInView={{ width: `${skill.proficiency_level}%` }}
                                                            viewport={{ once: true }}
                                                            transition={{ duration: 1, ease: 'easeOut' }}
                                                            className="h-full rounded-full bg-linear-to-r from-primary/80 to-primary transition-all duration-300"
                                                        />
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

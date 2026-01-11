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
                                className={`group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-border bg-card p-8 shadow-sm transition-all duration-500 hover:border-primary/50 hover:shadow-md ${
                                    index === 0 ? 'lg:col-span-2' : ''
                                }`}
                            >
                                {/* Subtle Gradient Mesh Background - Adaptive opacity */}
                                <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-primary/10 blur-[80px] transition-all duration-500 group-hover:bg-primary/20 dark:bg-primary/20 dark:group-hover:bg-primary/30" />

                                <div className="relative z-10">
                                    <h3 className="mb-6 font-heading text-2xl font-bold tracking-tight text-card-foreground">{category}</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {groupedSkills[category].map((skill) => (
                                            <span
                                                key={skill.id}
                                                className="inline-flex items-center rounded-lg border border-border bg-secondary/50 px-3 py-1.5 text-sm font-medium text-secondary-foreground transition-all duration-300 hover:border-primary/50 hover:bg-primary/10 hover:text-primary"
                                            >
                                                {skill.name}
                                            </span>
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

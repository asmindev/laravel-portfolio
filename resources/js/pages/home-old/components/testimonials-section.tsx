import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { motion } from 'motion/react';
import { Testimonial } from '../types';
import { StarIcon, fadeInUp, staggerContainer } from './shared';

interface TestimonialsSectionProps {
    testimonials: Testimonial[];
}

export function TestimonialsSection({ testimonials }: TestimonialsSectionProps) {
    if (testimonials.length === 0) return null;

    return (
        <section className="relative overflow-hidden py-24 lg:py-32">
            {/* Subtle Grid Background */}
            <div
                className="pointer-events-none absolute inset-0 opacity-[0.03]"
                style={{
                    backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px),
                                      linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
                    backgroundSize: '32px 32px',
                }}
            />

            <div className="relative z-10 container mx-auto max-w-6xl px-4">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-100px' }}
                    variants={staggerContainer}
                    className="flex flex-col gap-16"
                >
                    <div className="flex flex-col items-center justify-center text-center">
                        <span className="mb-2 block font-mono text-sm tracking-widest text-primary uppercase">Testimonials</span>
                        <h2 className="font-heading text-4xl font-bold text-foreground md:text-5xl lg:text-6xl">
                            Kind Words<span className="text-primary">.</span>
                        </h2>
                    </div>

                    <div className="columns-1 gap-6 md:columns-2 lg:columns-3">
                        {testimonials.map((testimonial) => (
                            <motion.div key={testimonial.id} variants={fadeInUp} className="mb-6 break-inside-avoid">
                                <div className="group relative overflow-hidden rounded-2xl border border-border bg-card p-8 shadow-sm transition-all duration-300 hover:border-primary/50 hover:shadow-md">
                                    {/* Quote Icon Background */}
                                    <div className="absolute top-6 right-6 -z-10 font-heading text-8xl leading-none font-black text-primary/10 opacity-50 transition-opacity group-hover:opacity-100">
                                        ”
                                    </div>

                                    <div className="mb-6 flex items-center gap-1">
                                        {[...Array(5)].map((_, i) => (
                                            <StarIcon key={i} filled={i < testimonial.rating} />
                                        ))}
                                    </div>

                                    <p className="mb-8 text-lg leading-relaxed text-muted-foreground">"{testimonial.content}"</p>

                                    <div className="flex items-center gap-4 border-t border-border pt-6">
                                        <Avatar className="h-10 w-10 rounded-full border border-border">
                                            <AvatarImage src={testimonial.client_image || ''} alt={testimonial.client_name} />
                                            <AvatarFallback className="bg-primary/10 text-primary">
                                                {testimonial.client_name.charAt(0)}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <p className="font-heading font-bold text-card-foreground">{testimonial.client_name}</p>
                                            <p className="text-xs font-medium text-muted-foreground">
                                                {testimonial.client_position}
                                                {testimonial.client_company && <span className="text-primary"> @ {testimonial.client_company}</span>}
                                            </p>
                                        </div>
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

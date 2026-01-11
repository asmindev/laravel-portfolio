import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { Testimonial } from '../types';
import { StarIcon } from './shared';

interface TestimonialsSectionProps {
    testimonials: Testimonial[];
}

export function TestimonialsSection({ testimonials }: TestimonialsSectionProps) {
    if (testimonials.length === 0) return null;

    return (
        <section className="relative bg-secondary/30 py-16 lg:py-24">
            {/* Grid Pattern for Testimonials */}
            <div
                className="pointer-events-none absolute inset-0"
                style={{
                    backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.015) 1px, transparent 1px),
                                      linear-gradient(to bottom, rgba(0,0,0,0.015) 1px, transparent 1px)`,
                    backgroundSize: '48px 48px',
                }}
            />
            <div className="container mx-auto max-w-5xl px-4">
                <h2 className="mb-8 text-2xl font-semibold text-foreground">Testimonials</h2>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    {testimonials.map((testimonial) => (
                        <Card key={testimonial.id} className="border-border/40 bg-background/80 shadow-[0_2px_8px_rgba(0,0,0,0.04)] backdrop-blur-sm">
                            <CardContent className="p-6">
                                <div className="mb-4 flex items-center gap-1">
                                    {[...Array(5)].map((_, i) => (
                                        <StarIcon key={i} filled={i < testimonial.rating} />
                                    ))}
                                </div>
                                <p className="mb-4 leading-relaxed text-muted-foreground italic">"{testimonial.content}"</p>
                                <div className="flex items-center gap-3">
                                    <Avatar className="h-10 w-10">
                                        <AvatarImage src={testimonial.client_image || ''} />
                                        <AvatarFallback className="bg-primary/10 text-primary">{testimonial.client_name.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <p className="text-sm font-medium text-foreground">{testimonial.client_name}</p>
                                        <p className="text-xs text-muted-foreground">
                                            {testimonial.client_position}
                                            {testimonial.client_company && ` at ${testimonial.client_company}`}
                                        </p>
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

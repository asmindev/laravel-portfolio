import { Profile, Skill } from '../types';

interface AboutProps {
    profile: Profile | null;
    skills?: Skill[];
}

export function About({ profile, skills = [] }: AboutProps) {
    return (
        <section id="about" className="py-20 sm:py-28 border-t border-border">
            <div className="max-w-5xl mx-auto px-5">
                <h2 className="font-serif text-3xl sm:text-4xl text-foreground mb-10">
                    Tentang saya
                </h2>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
                    <div className="space-y-5 text-muted-foreground text-[15px] leading-relaxed">
                        <p>
                            Saya kerja di Technoindo sebagai developer Odoo. Sehari-hari
                            custom modul — POS, Sales, Inventory, Accounting — buat klien
                            ritel, maritim, dan distribusi. Biasanya pegang 4–6 klien jalan bareng.
                        </p>
                        <p>
                            Di luar Odoo, saya bikin web dan mobile sendiri dari nol.
                            Laravel + React buat web, Flutter buat mobile, Python kalau
                            butuh backend yang enteng. Satu proyek saya pegang sendiri,
                            dari database sampai jadi.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-sm text-foreground font-medium mb-4">
                            Tools &amp; teknologi
                        </h3>
                        <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-muted-foreground">
                            {(skills.length > 0
                                ? skills.map((s) => s.name)
                                : [
                                      'Odoo 16/17',
                                      'Python',
                                      'PostgreSQL',
                                      'Laravel',
                                      'React',
                                      'Inertia.js',
                                      'TypeScript',
                                      'Tailwind CSS',
                                      'Flutter',
                                      'Flask',
                                      'FastAPI',
                                      'Docker',
                                      'Linux',
                                      'Nginx',
                                      'Git',
                                  ]
                            ).map((name, i) => (
                                <span key={i} className="py-1">
                                    {name}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

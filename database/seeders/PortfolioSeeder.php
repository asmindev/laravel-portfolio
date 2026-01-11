<?php

namespace Database\Seeders;

use App\Models\BlogPost;
use App\Models\Category;
use App\Models\Certificate;
use App\Models\Comment;
use App\Models\Education;
use App\Models\Experience;
use App\Models\Profile;
use App\Models\Project;
use App\Models\ProjectImage;
use App\Models\Skill;
use App\Models\SocialLink;
use App\Models\Tag;
use App\Models\Technology;
use App\Models\Testimonial;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Database\Seeder;

class PortfolioSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // 1. Create Tags and Technologies
        $techNames = [
            'Laravel', 'React', 'Inertia.js', 'Typescript', 'Tailwind CSS',
            'PHP', 'Python', 'Odoo', 'Flask', 'Express', 'PostgreSQL', 'MySQL',
            'Web Scraping', 'Baileys', 'Shadcn UI'
        ];

        $technologies = collect($techNames)->map(function ($name) {
            return Technology::firstOrCreate(['name' => $name, 'slug' => str()->slug($name)]);
        });

        $tagNames = ['Fullstack', 'Backend', 'Frontend', 'ERP', 'Mobile', 'Skripsi', ' Freelance'];
        $tags = collect($tagNames)->map(function ($name) {
            return Tag::firstOrCreate(['name' => $name, 'slug' => str()->slug($name)]);
        });

        $categories = Category::factory()->count(5)->create();

        // 2. Create Main User (Asmin)
        $user = User::firstOrCreate(
            ['email' => 'asmin@technoindo.com'],
            [
                'name' => 'Asmin',
                'password' => bcrypt('password'), // Always change in production
                'role' => 'admin',
            ]
        );

        // 3. Create Profile
        Profile::updateOrCreate(
            ['user_id' => $user->id],
            [
                'full_name' => 'Asmin',
                'title' => 'Odoo Developer & Fullstack Engineer',
                'tagline' => 'Membangun solusi ERP yang efisien dan aplikasi web modern.',
                'bio' => 'Saya adalah pengembang perangkat lunak yang bersemangat berbasis di Kendari, saat ini bekerja sebagai Pengembang Odoo di Technoindo. Saya berspesialisasi dalam membangun modul Odoo kustom (Invoice, Accounting, HR, dll.) dan aplikasi web full-stack menggunakan Laravel, React, dan Python. Saya memiliki latar belakang yang kuat di bidang elektronika dari studi kejuruan saya dan saat ini sedang menempuh gelar di bidang Informatika di Universitas Halu Oleo.',
                'location' => 'Kendari, Indonesia',
                'phone' => '+62 812-3456-7890', // Placeholder
                'email' => 'asminmin477@gmail.com',
                'profile_image' => 'https://ui-avatars.com/api/?name=Asmin&background=random',
                'resume_url' => '#',
            ]
        );

        // 4. Education
        Education::create([
            'user_id' => $user->id,
            'institution' => 'Universitas Halu Oleo',
            'degree' => 'Sarjana Informatika',
            'field_of_study' => 'Teknik Informatika',
            'start_date' => '2021-09-01',
            'end_date' => null, // Present
            'description' => 'Saat ini sedang aktif kuliah. Sedang mengerjakan proyek skripsi "Sikedar" menggunakan metode KNN.',
            'gpa' => 3.85,
            'logo' => null,
        ]);

        Education::create([
            'user_id' => $user->id,
            'institution' => 'SMK 2 Baubau',
            'degree' => 'Sekolah Menengah Kejuruan',
            'field_of_study' => 'Teknik Audio Video',
            'start_date' => '2016-06-01',
            'end_date' => '2019-05-01',
            'description' => 'Fokus pada elektronika, rangkaian, dan sistem audio-video.',
            'logo' => null,
        ]);

        // 5. Experience
        Experience::create([
            'user_id' => $user->id,
            'company_name' => 'Technoindo',
            'position' => 'Odoo Developer',
            'location' => 'Kendari, Indonesia',
            'employment_type' => 'Purna Waktu',
            'start_date' => '2024-10-01',
            'end_date' => null, // Present
            'is_current' => true,
            'description' => 'Mengembangkan dan memelihara sistem ERP untuk klien ritel dan pelayaran. Pengembangan modul kustom meliputi Invoice, Accounting, HR, Fleet, POS, Promo, Expense, Opname, dan Penyesuaian Inventaris.',
            'company_url' => 'https://technoindo.com',
            'company_logo' => null,
        ]);

        // 6. Skills
        $skillSets = [
            ['name' => 'Odoo Development', 'category' => 'Backend', 'proficiency' => 90],
            ['name' => 'Laravel', 'category' => 'Backend', 'proficiency' => 85],
            ['name' => 'React & Inertia', 'category' => 'Frontend', 'proficiency' => 85],
            ['name' => 'Python', 'category' => 'Languages', 'proficiency' => 80],
            ['name' => 'Web Scraping', 'category' => 'Automation', 'proficiency' => 75],
            ['name' => 'Flask', 'category' => 'Backend', 'proficiency' => 70],
            ['name' => 'Express', 'category' => 'Backend', 'proficiency' => 70],
            ['name' => 'Node.js', 'category' => 'Backend', 'proficiency' => 70],
            ['name' => 'Tailwind CSS', 'category' => 'Frontend', 'proficiency' => 70],
            ['name' => 'PostgreSQL', 'category' => 'Database', 'proficiency' => 80],
            ['name' => 'MySQL', 'category' => 'Database', 'proficiency' => 80],
            ['name' => 'Baileys (WA Gateway)', 'category' => 'Tools', 'proficiency' => 85],
        ];

        foreach ($skillSets as $skill) {
            Skill::create([
                'user_id' => $user->id,
                'name' => $skill['name'],
                'category' => $skill['category'],
                'proficiency_level' => $skill['proficiency'],
                'icon' => null,
            ]);
        }

        // 7. Projects
        $projects = [
            [
                'title' => 'Phinisi Ticket Booking',
                'slug' => 'phinisi-ticket-booking',
                'description' => 'Sistem pemesanan tiket komprehensif untuk kapal Phinisi. Fitur alur pemesanan terstruktur, penggunaan Shadcn UI yang ekstensif untuk nuansa premium, dan integrasi gateway pembayaran Xendit.',
                'content' => 'Dibangun dengan Laravel, React, TypeScript, dan Inertia.js.',
                'technologies' => ['Laravel', 'React', 'Typescript', 'Shadcn UI', 'Inertia.js'],
                'image' => 'https://placehold.co/600x400/png?text=Phinisi+Booking',
            ],
            [
                'title' => 'Technoindo Retail ERP',
                'slug' => 'technoindo-retail-erp',
                'description' => 'Sistem ERP berbasis Odoo yang disesuaikan untuk toko bahan bangunan. Berfokus pada Point of Sale, Inventaris, dan Akuntansi.',
                'content' => 'Modul Odoo kustom untuk alur kerja ritel spesifik.',
                'technologies' => ['Odoo', 'Python', 'PostgreSQL'],
                'image' => 'https://placehold.co/600x400/png?text=Retail+ERP',
            ],
            [
                'title' => 'Technoindo Shipping ERP',
                'slug' => 'technoindo-shipping-erp',
                'description' => 'ERP khusus untuk layanan pelayaran, menangani manajemen CI/CO, perlengkapan kapal, dan pembaruan buku pelaut.',
                'content' => 'Kustomisasi Odoo yang kompleks untuk logistik maritim.',
                'technologies' => ['Odoo', 'Python', 'PostgreSQL'],
                'image' => 'https://placehold.co/600x400/png?text=Shipping+ERP',
            ],
            [
                'title' => 'Notary Management App',
                'slug' => 'notary-management-app',
                'description' => 'Sistem manajemen untuk kantor Notaris untuk melacak akta, klien, dan jadwal.',
                'content' => 'Aplikasi Fullstack Laravel + Inertia React.',
                'technologies' => ['Laravel', 'React', 'Inertia.js', 'Typescript'],
                'image' => 'https://placehold.co/600x400/png?text=Notary+App',
            ],
            [
                'title' => 'Sikedar (Skripsi)',
                'slug' => 'sikedar-thesis',
                'description' => 'Proyek skripsi untuk mengukur kesadaran karyawan terhadap kebocoran data menggunakan metode KNN (K-Nearest Neighbors).',
                'content' => 'Implementasi penelitian akademik menggunakan Laravel (Backend) dan React Inertia (Frontend).',
                'technologies' => ['Laravel', 'React', 'Python', 'Inertia.js'],
                'image' => 'https://placehold.co/600x400/png?text=Sikedar',
            ],
        ];

        foreach ($projects as $projData) {
            $project = Project::create([
                'user_id' => $user->id,
                'title' => $projData['title'],
                'slug' => $projData['slug'],
                'description' => $projData['description'],
                'content' => $projData['content'],
                'thumbnail' => $projData['image'],
                'project_url' => '#',
                'github_url' => '#',
                'is_featured' => true,
                'published_at' => Carbon::now(),
            ]);

            // Attach technologies
            $techIds = Technology::whereIn('name', $projData['technologies'])->pluck('id');
            $project->technologies()->attach($techIds);

             // Create dummy images
            ProjectImage::factory()->count(2)->create(['project_id' => $project->id]);
        }

        // 8. Social Links
        $links = [
            ['platform' => 'GitHub', 'url' => 'https://github.com/asmindev', 'icon' => 'github'],
            ['platform' => 'LinkedIn', 'url' => 'https://linkedin.com/in/asmindev', 'icon' => 'linkedin'],
            ['platform' => 'Instagram', 'url' => 'https://instagram.com/iniasmin_', 'icon' => 'instagram'],
        ];

        foreach ($links as $link) {
            SocialLink::create([
                'user_id' => $user->id,
                'platform' => $link['platform'],
                'url' => $link['url'],
                'icon' => $link['icon'],
            ]);
        }

        // 9. Blog Posts (Generic for now to fill space)
        BlogPost::factory()
            ->count(3)
            ->for($user)
            ->create()
            ->each(function ($post) use ($categories) {
                $post->categories()->attach($categories->random(1));
            });

        // 10. Testimonials (Generic)
        Testimonial::factory()->count(3)->create(['user_id' => $user->id]);
    }
}

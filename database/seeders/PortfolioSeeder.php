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
            'Web Scraping', 'Baileys', 'Shadcn UI', 'FastAPI', 'Next.js', 
            'HTML5', 'CSS3', 'Flutter', 'Dart', 'MongoDB', 'Docker', 'Linux', 
            'Nginx', 'Phusion Passenger'
        ];

        $technologies = collect($techNames)->map(function ($name) {
            return Technology::firstOrCreate(['name' => $name, 'slug' => str()->slug($name)]);
        });

        $tagNames = ['Fullstack', 'Backend', 'Frontend', 'ERP', 'Mobile', 'Skripsi', 'Freelance'];
        $tags = collect($tagNames)->map(function ($name) {
            return Tag::firstOrCreate(['name' => $name, 'slug' => str()->slug($name)]);
        });

        $categories = Category::factory()->count(5)->create();

        // 2. Define main user account
        $user = User::firstOrCreate(
            ['email' => 'asminmin477@gmail.com'],
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
                    'full_name' => 'ASMIN',
                    'title' => 'Developer Odoo · Konsultan Teknis ERP · Developer Web Fullstack',
                    'tagline' => 'Developer Odoo dan Fullstack Engineer dengan hampir 2 tahun pengalaman ERP dan 3+ tahun pengembangan web.',
                    'bio' => 'Developer Odoo dan Fullstack Engineer dengan pengalaman langsung selama hampir 2 tahun dalam implementasi ERP serta lebih dari 3 tahun dalam pengembangan web fullstack. Spesialisasi dalam pengembangan modul Odoo end-to-end untuk alur kerja POS, Penjualan (Sales), Akuntansi (Accounting), Inventaris (Inventory), dan Biaya (Expense) — sekaligus mengelola 4 hingga 6 implementasi klien aktif di industri ritel, maritim, dan distribusi. Terbukti mampu mengintegrasikan Odoo dengan sistem eksternal melalui REST API, menggantikan proses operasional manual dengan alur kerja digital yang dapat diaudit. Mampu secara mandiri menghasilkan solusi web dan mobile yang lengkap menggunakan Laravel, React, Flutter, dan Python, sehingga mengeliminasi ketergantungan pada sumber daya pengembangan tambahan.',
                    'location' => 'Kendari, Sulawesi Tenggara, Indonesia',
                    'phone' => '+62 812-4287-3775',
                    'email' => $user->email,
                    'profile_image' => 'https://ui-avatars.com/api/?name=Asmin&background=random',
                    'resume_url' => '/resume/preview',
                ]
            );

            // 4. Education
            Education::where('user_id', $user->id)->delete();
            Education::create([
                'user_id' => $user->id,
                'institution' => 'Universitas Halu Oleo',
                'degree' => 'Sarjana Teknik Informatika (S.Kom)',
                'field_of_study' => 'Teknik Informatika',
                'start_date' => '2021-09-01',
                'end_date' => '2026-01-31',
                'gpa' => 3.67,
                'description' => 'Konsentrasi: Rekayasa Perangkat Lunak · Skripsi: Sistem Distribusi Raja Ikan (Algoritma Genetika + Flutter + Flask + Laravel)',
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
            Experience::where('user_id', $user->id)->delete();
            Experience::create([
                'user_id' => $user->id,
                'company_name' => 'Technoindo',
                'position' => 'Developer Odoo',
                'location' => 'Kendari, Sulawesi Tenggara',
                'employment_type' => 'Purna Waktu',
                'start_date' => '2024-09-01',
                'end_date' => null,
                'is_current' => true,
                'company_url' => 'https://technoindo.com',
                'description' => "Kustomisasi ERP Odoo siklus penuh dan implementasi klien di berbagai industri, berperan sebagai developer tunggal dan kontak teknis utama untuk setiap akun klien.\n\n" .
                    "• Mengelola implementasi ERP secara simultan untuk 4 hingga 6 klien aktif di sektor ritel, maritim, dan distribusi — menangani pengumpulan kebutuhan, kustomisasi modul, deployment, dan dukungan pasca-rilis secara mandiri tanpa eskalasi.\n" .
                    "• Melakukan kustomisasi modul Odoo 17 termasuk POS, Penjualan, Pembelian, Manufaktur, Akuntansi, Pengeluaran, dan Faktur untuk 3 klien ritel, mendukung volume transaksi POS harian sebesar Rp 10–20 juta per perusahaan.\n" .
                    "• Mengembangkan 15+ Laporan operasional kustom (ringkasan penjualan, pelacakan konsinyasi, umur piutang) menggunakan mesin pelaporan QWeb, disesuaikan dengan kebutuhan bisnis masing-masing klien.\n" .
                    "• Menyesuaikan alur kerja modul Faktur dan Pengeluaran untuk klien sektor maritim Safinah, termasuk perutean persetujuan kustom dan format laporan keuangan yang selaras dengan standar operasional industri pelayaran.\n" .
                    "• Membangun integrasi REST API antara Odoo dan sistem stock opname berbasis Laravel — menggantikan ekspor database manual dan proses rekonsiliasi Excel dengan rekam jejak audit digital yang dilengkapi riwayat verifikasi per pengguna.",
                'order' => 1,
            ]);

            Experience::create([
                'user_id' => $user->id,
                'company_name' => 'Technoindo',
                'position' => 'Developer Web Fullstack',
                'location' => 'Kendari, Sulawesi Tenggara (Berbasis Proyek)',
                'employment_type' => 'Kontrak',
                'start_date' => '2025-12-01',
                'end_date' => '2026-01-31',
                'is_current' => false,
                'company_url' => 'https://technoindo.com',
                'description' => "Dikontrak untuk proyek terfokus guna menghasilkan sistem manajemen operasional lengkap untuk bisnis kapal maritim.\n\n" .
                    "• Menyelesaikan Sistem Manajemen Kapap Phinisi full-stack (Laravel 12, React, Inertia.js) mulai dari desain database hingga deployment produksi dalam siklus pengembangan mandiri selama 30 hari.\n" .
                    "• Mendesain skema database relasional dan lapisan REST API yang mendukung alur kerja operasional kapal, dengan UI responsif yang dibuat untuk digunakan secara langsung oleh staf operasional non-teknis.",
                'order' => 2,
            ]);

            Experience::create([
                'user_id' => $user->id,
                'company_name' => 'Proyek Independen',
                'position' => 'Developer Web Lepas (Freelance)',
                'location' => 'Kendari, Sulawesi Tenggara',
                'employment_type' => 'Freelance',
                'start_date' => '2026-01-01',
                'end_date' => '2026-02-28',
                'is_current' => false,
                'description' => "Mendesain dan mengembangkan sistem POS dan inventaris berbasis web kustom untuk klien ritel bahan bangunan.\n\n" .
                    "• Membangun sistem manajemen POS dan inventaris Laravel 12 yang mendukung ratusan SKU aktif, transaksi penjualan harian, dan pelacakan stok real-time untuk peritel bahan bangunan.",
                'order' => 3,
            ]);

            // 6. Skills
            Skill::where('user_id', $user->id)->delete();
            $skillSets = [
                ['name' => 'Odoo 17 & 10', 'category' => 'ERP & Odoo', 'proficiency' => 90],
                ['name' => 'Kustomisasi Modul Odoo', 'category' => 'ERP & Odoo', 'proficiency' => 90],
                ['name' => 'QWeb Reports & XML Views', 'category' => 'ERP & Odoo', 'proficiency' => 85],
                ['name' => 'Python ORM & XML-RPC', 'category' => 'ERP & Odoo', 'proficiency' => 85],
                ['name' => 'Implementasi ERP', 'category' => 'ERP & Odoo', 'proficiency' => 85],
                ['name' => 'Python (Flask / FastAPI)', 'category' => 'Backend Development', 'proficiency' => 80],
                ['name' => 'PHP (Laravel 12)', 'category' => 'Backend Development', 'proficiency' => 85],
                ['name' => 'Node.js & Express', 'category' => 'Backend Development', 'proficiency' => 75],
                ['name' => 'REST API Design', 'category' => 'Backend Development', 'proficiency' => 85],
                ['name' => 'React & Next.js', 'category' => 'Frontend & Mobile', 'proficiency' => 85],
                ['name' => 'Inertia.js & Tailwind CSS', 'category' => 'Frontend & Mobile', 'proficiency' => 85],
                ['name' => 'Flutter & Dart', 'category' => 'Frontend & Mobile', 'proficiency' => 80],
                ['name' => 'JavaScript (ES6+)', 'category' => 'Frontend & Mobile', 'proficiency' => 80],
                ['name' => 'PostgreSQL & MySQL', 'category' => 'Database & Infra', 'proficiency' => 80],
                ['name' => 'MongoDB', 'category' => 'Database & Infra', 'proficiency' => 70],
                ['name' => 'Docker & Linux/Nginx', 'category' => 'Database & Infra', 'proficiency' => 75],
                ['name' => 'Git / GitHub', 'category' => 'Tools & Methods', 'proficiency' => 85],
            ];

            foreach ($skillSets as $skill) {
                Skill::create([
                    'user_id' => $user->id,
                    'name' => $skill['name'],
                    'category' => $skill['category'],
                    'proficiency_level' => $skill['proficiency'],
                ]);
            }

            // 7. Projects
            Project::where('user_id', $user->id)->delete();
            $projects = [
                [
                    'title' => 'Raja Ikan — Sistem Manajemen Distribusi Ikan',
                    'slug' => 'raja-ikan-sistem-manajemen-distribusi-ikan-' . $user->id,
                    'description' => 'Platform distribusi ikan end-to-end yang mengintegrasikan aplikasi driver mobile Flutter dengan rute genetika, backend REST API Flask, dan dashboard admin Laravel React.',
                    'content' => "### Masalah Bisnis\n\nPerencanaan rute pengiriman manual menyebabkan jarak tempuh tidak efisien dan keterlambatan pengiriman ikan di berbagai rute distribusi.\n\n### Solusi\n\nMembangun platform distribusi end-to-end — aplikasi mobile Flutter untuk pengemudi dengan optimasi rute berbasis Algoritma Genetika (backend Flask), serta dashboard admin (Laravel + React) untuk manajemen pesanan, pelacakan armada, dan pelaporan operasional.\n\n### Hasil\n\nSelesai lebih cepat dari tenggat waktu awal; semua komponen diintegrasikan melalui REST API tanpa ketergantungan pada layanan pihak ketiga.",
                    'technologies' => ['Laravel', 'React', 'Flask', 'Python', 'PostgreSQL', 'Flutter'],
                    'image' => 'https://placehold.co/600x400/png?text=Raja+Ikan+Distribusi',
                    'project_url' => 'https://zettdev.my.id',
                    'github_url' => 'https://github.com/asmindev/raja-ikan',
                ],
                [
                    'title' => 'Sistem Pelacakan Kontainer Pelabuhan',
                    'slug' => 'sistem-pelacakan-kontainer-pelabuhan-' . $user->id,
                    'description' => 'Sistem pelacakan kontainer pelabuhan real-time menggunakan algoritma manajemen antrean FIFO dan dashboard interaktif React.',
                    'content' => "### Masalah Bisnis\n\nOperator pelabuhan mengandalkan pelacakan manual tanpa visibilitas ke dalam status antrean kontainer real-time di seluruh operasi bongkar muat.\n\n### Solusi\n\nMengembangkan sistem pelacakan kontainer real-time menggunakan algoritma manajemen antrean FIFO, dengan dashboard pemantauan React yang merefleksikan perubahan status kontainer secara langsung tanpa muat ulang halaman.\n\n### Hasil\n\nSelesai lebih cepat dari tenggat waktu; memungkinkan operator memantau semua kontainer aktif secara real-time tanpa rekonsiliasi manual.",
                    'technologies' => ['Laravel', 'React', 'Inertia.js', 'PostgreSQL'],
                    'image' => 'https://placehold.co/600x400/png?text=Pelacakan+Kontainer',
                    'project_url' => 'https://zettdev.my.id',
                    'github_url' => 'https://github.com/asmindev/port-container-tracker',
                ],
                [
                    'title' => 'Sistem Rekomendasi Kuliner',
                    'slug' => 'sistem-rekomendasi-kuliner-' . $user->id,
                    'description' => 'Aplikasi rekomendasi makanan berbasis machine learning dengan algoritma Singular Value Decomposition (SVD), Flask REST API, dan antarmuka React.',
                    'content' => "Membangun mesin rekomendasi berbasis machine learning menggunakan Singular Value Decomposition (SVD) untuk personalisasi preferensi makanan pengguna, dengan backend REST API Flask and frontend React.\n\nSelesai lebih cepat dari tenggat waktu akademis, mendemonstrasikan integrasi model ML terapan dalam arsitektur aplikasi web bergaya produksi.",
                    'technologies' => ['Python', 'Flask', 'React'],
                    'image' => 'https://placehold.co/600x400/png?text=Rekomendasi+Kuliner',
                    'project_url' => 'https://zettdev.my.id',
                    'github_url' => 'https://github.com/asmindev/culinary-recommender',
                ],
                [
                    'title' => 'Sistem Manajemen Kapal Phinisi',
                    'slug' => 'sistem-manajemen-kapal-phinisi-' . $user->id,
                    'description' => 'Sistem manajemen operasional lengkap untuk kapal Phinisi komersial dengan arsitektur Laravel 12, Inertia React, dan REST API internal.',
                    'content' => "Menyelesaikan Sistem Manajemen Kapal Phinisi full-stack (Laravel 12, React, Inertia.js) mulai dari desain database hingga deployment produksi dalam siklus pengembangan mandiri selama 30 hari.\n\nMendesain skema database relasional dan lapisan REST API yang mendukung alur kerja operasional kapal, dengan UI responsif yang dibuat untuk digunakan secara langsung oleh staf operasional non-teknis.",
                    'technologies' => ['Laravel', 'React', 'Inertia.js'],
                    'image' => 'https://placehold.co/600x400/png?text=Manajemen+Kapal+Phinisi',
                    'project_url' => 'https://zettdev.my.id',
                    'github_url' => 'https://github.com/asmindev/phinisi-management',
                ],
                [
                    'title' => 'Sistem Manajemen POS Bahan Bangunan',
                    'slug' => 'sistem-manajemen-pos-bahan-bangunan-' . $user->id,
                    'description' => 'Sistem Point of Sales (POS) dan manajemen inventaris stok real-time kustom yang dikembangkan menggunakan Laravel 12.',
                    'content' => "Membangun sistem manajemen POS dan inventaris Laravel 12 yang mendukung ratusan SKU aktif, transaksi penjualan harian, dan pelacakan stok real-time untuk peritel bahan bangunan.",
                    'technologies' => ['Laravel', 'MySQL'],
                    'image' => 'https://placehold.co/600x400/png?text=POS+Bahan+Bangunan',
                    'project_url' => 'https://zettdev.my.id',
                    'github_url' => 'https://github.com/asmindev/pos-tb',
                ],
                [
                    'title' => 'Phinisi Ticket Booking',
                    'slug' => 'phinisi-ticket-booking-' . $user->id,
                    'description' => 'Sistem pemesanan tiket komprehensif untuk kapal Phinisi. Fitur alur pemesanan terstruktur, penggunaan Shadcn UI yang ekstensif untuk nuansa premium, dan integrasi gateway pembayaran Xendit.',
                    'content' => 'Dibangun dengan Laravel, React, TypeScript, dan Inertia.js.',
                    'technologies' => ['Laravel', 'React', 'Typescript', 'Shadcn UI', 'Inertia.js'],
                    'image' => 'https://placehold.co/600x400/png?text=Phinisi+Booking',
                    'project_url' => 'https://zettdev.my.id',
                    'github_url' => 'https://github.com/asmindev/phinisi-ticket-booking',
                ],
                [
                    'title' => 'Technoindo Retail ERP',
                    'slug' => 'technoindo-retail-erp-' . $user->id,
                    'description' => 'Sistem ERP berbasis Odoo yang disesuaikan untuk toko bahan bangunan. Berfokus pada Point of Sale, Inventaris, dan Akuntansi.',
                    'content' => 'Modul Odoo kustom untuk alur kerja ritel spesifik.',
                    'technologies' => ['Odoo', 'Python', 'PostgreSQL'],
                    'image' => 'https://placehold.co/600x400/png?text=Retail+ERP',
                    'project_url' => 'https://zettdev.my.id',
                    'github_url' => 'https://github.com/asmindev/retail-erp',
                ],
                [
                    'title' => 'Technoindo Shipping ERP',
                    'slug' => 'technoindo-shipping-erp-' . $user->id,
                    'description' => 'ERP khusus untuk layanan pelayaran, menangani manajemen CI/CO, perlengkapan kapal, dan pembaruan buku pelaut.',
                    'content' => 'Kustomisasi Odoo yang kompleks untuk logistik maritim.',
                    'technologies' => ['Odoo', 'Python', 'PostgreSQL'],
                    'image' => 'https://placehold.co/600x400/png?text=Shipping+ERP',
                    'project_url' => 'https://zettdev.my.id',
                    'github_url' => 'https://github.com/asmindev/shipping-erp',
                ],
                [
                    'title' => 'Notary Management App',
                    'slug' => 'notary-management-app-' . $user->id,
                    'description' => 'Sistem manajemen untuk kantor Notaris untuk melacak akta, klien, dan jadwal.',
                    'content' => 'Aplikasi Fullstack Laravel + Inertia React.',
                    'technologies' => ['Laravel', 'React', 'Inertia.js', 'Typescript'],
                    'image' => 'https://placehold.co/600x400/png?text=Notary+App',
                    'project_url' => 'https://zettdev.my.id',
                    'github_url' => 'https://github.com/asmindev/notary-management-app',
                ],
                [
                    'title' => 'Sikedar (Skripsi)',
                    'slug' => 'sikedar-thesis-' . $user->id,
                    'description' => 'Proyek skripsi untuk mengukur kesadaran karyawan terhadap kebocoran data menggunakan metode KNN (K-Nearest Neighbors).',
                    'content' => 'Implementasi penelitian akademik menggunakan Laravel (Backend) dan React Inertia (Frontend).',
                    'technologies' => ['Laravel', 'React', 'Python', 'Inertia.js'],
                    'image' => 'https://placehold.co/600x400/png?text=Sikedar',
                    'project_url' => 'https://zettdev.my.id',
                    'github_url' => 'https://github.com/asmindev/sikedar-thesis',
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
                    'project_url' => $projData['project_url'],
                    'github_url' => $projData['github_url'],
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
            SocialLink::where('user_id', $user->id)->delete();
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

            // 11. Certificates
            Certificate::where('user_id', $user->id)->delete();
            Certificate::create([
                'user_id' => $user->id,
                'title' => 'Sertifikasi Fungsional Odoo 17 (Target)',
                'issuer' => 'Odoo S.A.',
                'issue_date' => '2026-01-01',
                'credential_url' => 'https://odoo.com',
            ]);
            Certificate::create([
                'user_id' => $user->id,
                'title' => 'Sertifikasi Teknis Odoo 17 (Target)',
                'issuer' => 'Odoo S.A.',
                'issue_date' => '2026-01-01',
                'credential_url' => 'https://odoo.com',
            ]);
            Certificate::create([
                'user_id' => $user->id,
                'title' => 'AWS Certified Cloud Practitioner (Target)',
                'issuer' => 'Amazon Web Services',
                'issue_date' => '2026-01-01',
                'credential_url' => 'https://aws.amazon.com',
        ]);
    }
}

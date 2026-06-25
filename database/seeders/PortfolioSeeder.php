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
use Illuminate\Support\Facades\Schema;

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

        $tagNames = ['Fullstack', 'Backend', 'Frontend', 'ERP', 'Mobile', 'Skripsi', 'Freelance', 'Maritim', 'Ritel', 'Manufaktur', 'POS', 'Inventory', 'Accounting'];
        $tags = collect($tagNames)->map(function ($name) {
            return Tag::firstOrCreate(['name' => $name, 'slug' => str()->slug($name)]);
        });

        Schema::disableForeignKeyConstraints();
        Category::truncate();
        $categories = Category::factory()->count(5)->create();
        Schema::enableForeignKeyConstraints();

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
                    'title' => 'Enterprise ERP & Shipping (Safinah)',
                    'slug' => 'safinah-enterprise-erp-' . $user->id,
                    'description' => 'Arsitektur ERP maritim Odoo. Optimalisasi performa laporan menggunakan Raw SQL dan keamanan data multi-cabang.',
                    'detailed_description' => 'Mengarsiteki sistem Odoo untuk manajemen pelayaran (Ship & Cargo). Membangun puluhan custom module operasional dan mengoptimalkan komputasi laporan mutasi kapal.',
                    'content' => "### Architectural Case Study: Safinah Maritime ERP\n\n#### Modul Accounting\n- **Kustomisasi (Inheritance):** Meng-override logika dari `account` bawaan. Modifikasi meliputi fungsionalitas di: `custom_expense`, `custom_invoice`.\n- **Support Module Baru:** Dibangun (standalone) untuk menyokong alur operasional: `vendor_bill_access`, `partner_signature_field`, `branch_data_access`, `om_account_budget`, `mass_payment_expense`, `om_account_accountant`, `om_account_asset`.\n- **Custom Reports:** Mendesain format pelaporan spesifik: `report_reimbursment`, `account_financial_report`, `report_vendor_payment`, `report_expense_summary`, `report_piutang_customer`, `accounting_pdf_reports`.\n- **Problem Solved & Result:** Mengeliminasi pembukuan manual dan kompleksitas cashflow multi-company/cabang. Menghasilkan rekonsiliasi pembayaran otomatis dan pelacakan arus kas (Cashbook) yang presisi.\n\n#### Modul Sales\n- **Support Module Baru:** Dibangun (standalone) untuk menyokong alur operasional: `ks_dn_advance`, `ks_dashboard_ninja`, `ks_website_dashboard_ninja`.\n- **Problem Solved & Result:** Mengotomatisasi sistem kontrak dan penagihan B2B yang rumit. Proses billing menjadi terarah dan terhindar dari human-error.\n\n#### Modul Inventory\n- **Kustomisasi (Inheritance):** Meng-override logika dari `purchase`, `account` bawaan. Modifikasi meliputi fungsionalitas di: berbagai sub-modul pendukung.\n- **Support Module Baru:** Dibangun (standalone) untuk menyokong alur operasional: `purchase_ship`, `ship`.\n- **Custom Reports:** Mendesain format pelaporan spesifik: `report_ship_purchase_order`.\n- **Problem Solved & Result:** Mengatasi ketidakcocokan data operasional lapangan/armada dengan sistem pusat. Akurasi pergerakan barang (mutasi logistik/kapal) kini terpantau real-time.\n\n#### Modul HR\n- **Support Module Baru:** Dibangun (standalone) untuk menyokong alur operasional: `employee_reimburse`, `expense_access_groups`, `cancel_expense_adm`.\n- **Problem Solved & Result:** Menyatukan data komisi lapangan/armada dengan struktur HR. Hasilnya adalah perhitungan upah dan tunjangan (ESR/Loan) yang masuk tanpa gesekan ke payroll.\n\n#### Modul System\n- **Support Module Baru:** Dibangun (standalone) untuk menyokong alur operasional: `muk_autovacuum`, `muk_web_utils`, `date_range`, `web_debranding`, `administrator_authorization`, `muk_web_theme`, `muk_utils`.\n- **Custom Reports:** Mendesain format pelaporan spesifik: `report_xlsx`.\n- **Problem Solved & Result:** Mengatur skala infrastruktur database dan otorisasi menu untuk menjamin kestabilan instance ERP secara keseluruhan.\n\n",
                    'tags' => ['ERP', 'Maritim', 'Backend', 'Database', 'Python'],
                    'technologies' => ['Odoo', 'Python', 'PostgreSQL', 'QWeb', 'SQL'],
                    'image' => 'https://placehold.co/600x400/png?text=Safinah+Maritime+ERP',
                    'project_url' => '',
                    'github_url' => '',
                ],
                [
                    'title' => 'Multi-Company ERP (Fadhil Indokreatif)',
                    'slug' => 'fadhil-indokreatif-erp-' . $user->id,
                    'description' => 'Ekosistem Odoo multi-company untuk Manufaktur Percetakan & Konstruksi. Otomatisasi BoM dan laporan akuntansi eksekusi SQL.',
                    'detailed_description' => 'Menyatukan unit bisnis percetakan dan konstruksi dalam satu instance Odoo. Membuat kalkulasi BoM dimensi area dinamis dan optimasi reporting keuangan skala besar.',
                    'content' => "### Architectural Case Study: Fadhil Corporate ERP\n\n#### Modul Accounting\n- **Kustomisasi (Inheritance):** Meng-override logika dari `hr`, `sale`, `mrp`, `account` bawaan. Modifikasi meliputi fungsionalitas di: `custom_inventory_loss`, `app_odoo_customize`.\n- **Support Module Baru:** Dibangun (standalone) untuk menyokong alur operasional: `hr_cash_advance`, `om_fiscal_year`, `om_account_followup`, `om_account_budget`, `om_recurring_payments`, `om_account_accountant`, `om_account_asset`.\n- **Custom Reports:** Mendesain format pelaporan spesifik: `om_account_daily_reports`, `accounting_pdf_reports`.\n- **Problem Solved & Result:** Mengeliminasi pembukuan manual dan kompleksitas cashflow multi-company/cabang. Menghasilkan rekonsiliasi pembayaran otomatis dan pelacakan arus kas (Cashbook) yang presisi.\n\n#### Modul HR\n- **Kustomisasi (Inheritance):** Meng-override logika dari `hr` bawaan. Modifikasi meliputi fungsionalitas di: `custom_attendance`, `custom_create_user_from_employee`.\n- **Support Module Baru:** Dibangun (standalone) untuk menyokong alur operasional: `attendance_dbinfo`, `hr_overtime`.\n- **Custom Reports:** Mendesain format pelaporan spesifik: `report_attendance`.\n- **Problem Solved & Result:** Menyatukan data komisi lapangan/armada dengan struktur HR. Hasilnya adalah perhitungan upah dan tunjangan (ESR/Loan) yang masuk tanpa gesekan ke payroll.\n\n#### Modul System\n- **Support Module Baru:** Dibangun (standalone) untuk menyokong alur operasional: `sh_backmate_theme_adv`, `app_common`, `show_db_name_debug`.\n- **Problem Solved & Result:** Mengatur skala infrastruktur database dan otorisasi menu untuk menjamin kestabilan instance ERP secara keseluruhan.\n\n",
                    'tags' => ['ERP', 'Backend', 'Manufacturing', 'Accounting'],
                    'technologies' => ['Odoo', 'Python', 'PostgreSQL', 'QWeb'],
                    'image' => 'https://placehold.co/600x400/png?text=Fadhil+Corporate+ERP',
                    'project_url' => '',
                    'github_url' => '',
                ],
                [
                    'title' => 'Giant Distribution & Retail ERP (Karya Jaya)',
                    'slug' => 'karya-jaya-retail-pos-' . $user->id,
                    'description' => 'Transformasi Odoo mencakup 2.500+ file custom. Mengotomatisasi ekosistem Finance, Logistik armada, Engine Komisi, dan Redis POS.',
                    'detailed_description' => 'Mendesain ulang behavior bawaan Odoo di seluruh departemen krusial. Sistem kasir tidak lagi crash berkat arsitektur Redis, logistik terpetakan secara otomatis, dan pelaporan E-Faktur berjalan tanpa campur tangan manual.',
                    'content' => "### Architectural Case Study: Karya Jaya ERP\n\n#### Modul Accounting\n- **Kustomisasi (Inheritance):** Meng-override logika dari `hr`, `sale`, `account`, `point_of_sale`, `purchase`, `stock`, `mrp` bawaan. Modifikasi meliputi fungsionalitas di: `custom_age_invoice`, `deposit_customer`, `customer_activity_statement`, `mcl`, `custom_inventory_rollback`.\n- **Support Module Baru:** Dibangun (standalone) untuk menyokong alur operasional: `purchase_landed_cost`, `purchase_global_discount`, `dc_dashboard`, `loyalty_point`, `configuration_profit_konsinyasi`, `confirmation_date_invoice`, `account_invoice_view_payment`.\n- **Custom Reports:** Mendesain format pelaporan spesifik: `report_sale_location`, `product_category_report`, `report_inventory_date`, `top_pos_report`, `account_financial_report_date_range`, `report_overdue_invoice`, `report_turnover_by_city`.\n- **Problem Solved & Result:** Mengeliminasi pembukuan manual dan kompleksitas cashflow multi-company/cabang. Menghasilkan rekonsiliasi pembayaran otomatis dan pelacakan arus kas (Cashbook) yang presisi.\n\n#### Modul POS\n- **Kustomisasi (Inheritance):** Meng-override logika dari `sale`, `point_of_sale`, `stock` bawaan. Modifikasi meliputi fungsionalitas di: `pos_receipt_custom_template`, `pos_promotion`.\n- **Support Module Baru:** Dibangun (standalone) untuk menyokong alur operasional: `pos_hs_code`, `odoo_pos_keyboard`, `config_cashback_loyalty`, `pos_discount_template`, `authorization_history`, `pos_pricelist`, `stock_delivery_note`.\n- **Custom Reports:** Mendesain format pelaporan spesifik: `report_sale_details_xlsx`, `report_surat_jalan`, `report_pos_sale`, `pos_z_report`, `profit_pos_report`, `report_deposit_transaction`, `report_hourly_cashier_sales`.\n- **Problem Solved & Result:** Memecahkan batasan fungsional POS native yang kaku. Hasilnya sinkronisasi transaksi sangat cepat dan terintegrasi ekosistem hardware/promo lokal klien.\n\n#### Modul Sales\n- **Kustomisasi (Inheritance):** Meng-override logika dari `sale`, `purchase`, `mrp`, `stock` bawaan. Modifikasi meliputi fungsionalitas di: `commission_config_due_date_customer`.\n- **Support Module Baru:** Dibangun (standalone) untuk menyokong alur operasional: `ks_dashboard_ninja`, `sale_order_warn`, `delivery_dashboard`, `stock_picking_return_approval`, `sale_order_revision`, `sale_approval`, `user_approval`.\n- **Custom Reports:** Mendesain format pelaporan spesifik: `report_forecast`, `profit_sale_report`, `report_by_brand`, `report_loyalti_point`, `so_report_groupby_customer`, `sr_sales_report_saleperson_groupby`, `report_product_price_history`.\n- **Problem Solved & Result:** Mengotomatisasi sistem kontrak dan penagihan B2B yang rumit. Proses billing menjadi terarah dan terhindar dari human-error.\n\n#### Modul Purchase\n- **Kustomisasi (Inheritance):** Meng-override logika dari `hr`, `purchase`, `stock` bawaan. Modifikasi meliputi fungsionalitas di: berbagai sub-modul pendukung.\n- **Support Module Baru:** Dibangun (standalone) untuk menyokong alur operasional: `purchase_order_approved`, `purchase_request_to_rfq`, `purchase_cancel_qty`, `purchase_request`, `purchase_request_to_rfq_order_approved`, `purchase_discount`, `purchase_order_approval_block`.\n- **Custom Reports:** Mendesain format pelaporan spesifik: `po_report`.\n- **Problem Solved & Result:** Mencegah pengadaan di luar batas wajar (rogue purchasing). Sistem berhasil menahan pemborosan via Tiered Validation.\n\n#### Modul Inventory\n- **Kustomisasi (Inheritance):** Meng-override logika dari `stock` bawaan. Modifikasi meliputi fungsionalitas di: `custom_stock_opname`, `custom_reordering_rules`, `custom_stock_no_create`, `custom_stock`.\n- **Support Module Baru:** Dibangun (standalone) untuk menyokong alur operasional: `product_export_update`, `product_history_tracking`, `product_inventory_location`, `stock_move_optimation`, `dashboard_fsd`, `update_fsd_wizard`, `mcl_product_import`.\n- **Custom Reports:** Mendesain format pelaporan spesifik: `report_inventory_movement`, `report_transfer_product`, `internal_transfer_report`, `report_inventory_csi`, `report_product_mutation`.\n- **Problem Solved & Result:** Mengatasi ketidakcocokan data operasional lapangan/armada dengan sistem pusat. Akurasi pergerakan barang (mutasi logistik/kapal) kini terpantau real-time.\n\n#### Modul HR\n- **Kustomisasi (Inheritance):** Meng-override logika dari `hr` bawaan. Modifikasi meliputi fungsionalitas di: `hr_employee_customization`.\n- **Support Module Baru:** Dibangun (standalone) untuk menyokong alur operasional: `hr_contract_allowances`, `manager_employee_access`.\n- **Problem Solved & Result:** Menyatukan data komisi lapangan/armada dengan struktur HR. Hasilnya adalah perhitungan upah dan tunjangan (ESR/Loan) yang masuk tanpa gesekan ke payroll.\n\n#### Modul System\n- **Kustomisasi (Inheritance):** Meng-override logika dari `core_modules` bawaan. Modifikasi meliputi fungsionalitas di: `custom_label_product`, `mail_base`.\n- **Support Module Baru:** Dibangun (standalone) untuk menyokong alur operasional: `redis_session_module`, `web_widget_many2many_tags_multi_selection`, `smile_redis_session_store`, `vit_kelurahan`, `access_restricted`, `theme_kit`, `query_deluxe`.\n- **Custom Reports:** Mendesain format pelaporan spesifik: `report_xlsx`, `report_history_opname`.\n- **Problem Solved & Result:** Mengatur skala infrastruktur database dan otorisasi menu untuk menjamin kestabilan instance ERP secara keseluruhan.\n\n",
                    'tags' => ['ERP', 'Distribution', 'Accounting', 'HRIS', 'Redis', 'Tax'],
                    'technologies' => ['Odoo', 'Python', 'PostgreSQL', 'Redis', 'REST API', 'JavaScript'],
                    'image' => 'https://placehold.co/600x400/png?text=Karya+Jaya+Distribution+ERP',
                    'project_url' => '',
                    'github_url' => '',
                ],
                [
                    'title' => 'Logistics ERP (Nawacena Primaraya)',
                    'slug' => 'nawacena-primaraya-erp-logistik-' . $user->id,
                    'description' => 'Sistem Odoo kustom untuk logistik bahan bakar. Manajemen utilitas armada, upah otomatis supir, dan tracking rute pengiriman.',
                    'detailed_description' => 'Sistem spesialis logistik kargo cair. Manajemen kapasitas armada tanker, hitung upah jalan berdasar rute, dan komputasi komisi logistik.',
                    'content' => "### Architectural Case Study: Nawacena Logistics\n\n#### Modul Accounting\n- **Kustomisasi (Inheritance):** Meng-override logika dari `hr`, `sale`, `account`, `mrp`, `purchase`, `stock` bawaan. Modifikasi meliputi fungsionalitas di: `custom_delivery_pro`, `custom_backdate`, `app_odoo_customize`.\n- **Support Module Baru:** Dibangun (standalone) untuk menyokong alur operasional: `payment_request`, `inventory_audit_export`, `pr_invoice`, `pr_expenses_pro`, `ohrms_loan`, `pr_expenses`, `google_gmail`.\n- **Custom Reports:** Mendesain format pelaporan spesifik: `account_financial_report`, `report_equity`, `accounting_pdf_reports`, `report_profit_loss_inc_installments_pro`, `report_invoice`, `report_profit_loss_inc_installments`, `report_equity_pro`.\n- **Problem Solved & Result:** Mengeliminasi pembukuan manual dan kompleksitas cashflow multi-company/cabang. Menghasilkan rekonsiliasi pembayaran otomatis dan pelacakan arus kas (Cashbook) yang presisi.\n\n#### Modul POS\n- **Kustomisasi (Inheritance):** Meng-override logika dari `point_of_sale`, `stock` bawaan. Modifikasi meliputi fungsionalitas di: berbagai sub-modul pendukung.\n- **Support Module Baru:** Dibangun (standalone) untuk menyokong alur operasional: `muk_pos_branding`.\n- **Custom Reports:** Mendesain format pelaporan spesifik: `custom_report`.\n- **Problem Solved & Result:** Memecahkan batasan fungsional POS native yang kaku. Hasilnya sinkronisasi transaksi sangat cepat dan terintegrasi ekosistem hardware/promo lokal klien.\n\n#### Modul Sales\n- **Kustomisasi (Inheritance):** Meng-override logika dari `sale`, `purchase`, `stock` bawaan. Modifikasi meliputi fungsionalitas di: `custom_customer`, `custom_responsible`, `custom_customer_pro`, `custom_delivery`.\n- **Support Module Baru:** Dibangun (standalone) untuk menyokong alur operasional: `ks_dashboard_ninja`, `sale_order_variant_mgmt`, `mass_editing_price`, `employees_involved_in_sales`, `ks_dn_advance`, `work_order`, `stock_card`.\n- **Custom Reports:** Mendesain format pelaporan spesifik: `report_inventory`.\n- **Problem Solved & Result:** Mengotomatisasi sistem kontrak dan penagihan B2B yang rumit. Proses billing menjadi terarah dan terhindar dari human-error.\n\n#### Modul Purchase\n- **Kustomisasi (Inheritance):** Meng-override logika dari `purchase` bawaan. Modifikasi meliputi fungsionalitas di: `custom_purchase_pro`, `custom_purchase`.\n- **Custom Reports:** Mendesain format pelaporan spesifik: `custom_report_purchase`, `custom_menu_report_purchase`, `custom_report_purchase_pro`, `report_purchase`.\n- **Problem Solved & Result:** Mencegah pengadaan di luar batas wajar (rogue purchasing). Sistem berhasil menahan pemborosan via Tiered Validation.\n\n#### Modul Inventory\n- **Kustomisasi (Inheritance):** Meng-override logika dari `fleet`, `stock` bawaan. Modifikasi meliputi fungsionalitas di: `cancel_services_logs`, `warehouse_services_log`, `custom_fleet`, `custom_fleet_pro`, `cancel_services_logs_pro`.\n- **Support Module Baru:** Dibangun (standalone) untuk menyokong alur operasional: `inv_loss_product`.\n- **Custom Reports:** Mendesain format pelaporan spesifik: `report_stock_on_hand`, `report_transport_pro`, `report_transport`, `report_trip_fleet`.\n- **Problem Solved & Result:** Mengatasi ketidakcocokan data operasional lapangan/armada dengan sistem pusat. Akurasi pergerakan barang (mutasi logistik/kapal) kini terpantau real-time.\n\n#### Modul HR\n- **Kustomisasi (Inheritance):** Meng-override logika dari `purchase`, `stock`, `account` bawaan. Modifikasi meliputi fungsionalitas di: berbagai sub-modul pendukung.\n- **Support Module Baru:** Dibangun (standalone) untuk menyokong alur operasional: `fee_tanker_pro`, `theme_common`, `fee_driver`, `pr_tanker_delivery`, `tanker_delivery`, `cancel_expense`, `fee_driver_pro`.\n- **Custom Reports:** Mendesain format pelaporan spesifik: `report_expense`, `report_fee_driver`, `report_fee_tanker`.\n- **Problem Solved & Result:** Menyatukan data komisi lapangan/armada dengan struktur HR. Hasilnya adalah perhitungan upah dan tunjangan (ESR/Loan) yang masuk tanpa gesekan ke payroll.\n\n#### Modul System\n- **Support Module Baru:** Dibangun (standalone) untuk menyokong alur operasional: `muk_web_client_refresh`, `oi_stop_database_manager`, `web_widget_x2many_2d_matrix`, `access_restricted`, `muk_web_theme`, `mass_operation_abstract`, `query_deluxe`.\n- **Custom Reports:** Mendesain format pelaporan spesifik: `report_xlsx`.\n- **Problem Solved & Result:** Mengatur skala infrastruktur database dan otorisasi menu untuk menjamin kestabilan instance ERP secara keseluruhan.\n\n",
                    'tags' => ['ERP', 'Backend', 'Logistik'],
                    'technologies' => ['Odoo', 'Python', 'PostgreSQL', 'QWeb'],
                    'image' => 'https://placehold.co/600x400/png?text=Nawacena+Logistics+ERP',
                    'project_url' => '',
                    'github_url' => '',
                ],
                [
                    'title' => 'Wholesale & Retail B2B Ecosystem (Tulusdev)',
                    'slug' => 'tulusdev-wholesale-erp-' . $user->id,
                    'description' => 'Restrukturisasi aliran data Grosir (B2B) menggunakan WebSockets untuk stok mutlak, validasi Procurement, dan HRMS Loan.',
                    'detailed_description' => 'Mengeksekusi ekosistem retail cepat dan distribusi grosir dalam satu core. Memecahkan lag data stok dengan WebSockets, validasi Purchase Request berjenjang, dan bypass hardware printer Dotmatrix.',
                    'content' => "### Architectural Case Study: Tulusdev B2B Ecosystem\n\n#### Modul Accounting\n- **Kustomisasi (Inheritance):** Meng-override logika dari `sale`, `account`, `point_of_sale`, `purchase`, `stock`, `mrp` bawaan. Modifikasi meliputi fungsionalitas di: `customer_activity_statement`, `custom_company_setting`, `customer_outstanding_statement`, `custom_branch`.\n- **Support Module Baru:** Dibangun (standalone) untuk menyokong alur operasional: `purchase_landed_cost`, `purchase_global_discount`, `loyalty_point`, `account_invoice_view_payment`, `vit_dotmatrix`, `commission_management`, `vit_journal_voucher`.\n- **Custom Reports:** Mendesain format pelaporan spesifik: `custom_report_internal`, `account_invoice_report_by_partner`, `custom_report_financial`, `account_financial_report_date_range`, `pos_report_saleperson_groupby`, `report_giro`, `report_account_receivable`.\n- **Problem Solved & Result:** Mengeliminasi pembukuan manual dan kompleksitas cashflow multi-company/cabang. Menghasilkan rekonsiliasi pembayaran otomatis dan pelacakan arus kas (Cashbook) yang presisi.\n\n#### Modul POS\n- **Kustomisasi (Inheritance):** Meng-override logika dari `sale`, `point_of_sale`, `stock` bawaan. Modifikasi meliputi fungsionalitas di: `pos_receipt_custom_template`.\n- **Support Module Baru:** Dibangun (standalone) untuk menyokong alur operasional: `odoo_pos_keyboard`, `config_cashback_loyalty`, `pos_pricelist`, `pos_discount_base`, `pos_uoms_price`, `pos_orders_history`, `longpolling_available_qty_in_pos`.\n- **Custom Reports:** Mendesain format pelaporan spesifik: `pos_order_report_detail`, `profit_pos_report`, `report_pos_by_categ_prod`.\n- **Problem Solved & Result:** Memecahkan batasan fungsional POS native yang kaku. Hasilnya sinkronisasi transaksi sangat cepat dan terintegrasi ekosistem hardware/promo lokal klien.\n\n#### Modul Sales\n- **Kustomisasi (Inheritance):** Meng-override logika dari `sale`, `mrp`, `stock` bawaan. Modifikasi meliputi fungsionalitas di: berbagai sub-modul pendukung.\n- **Support Module Baru:** Dibangun (standalone) untuk menyokong alur operasional: `sale_commission_areamanager`, `so_print`, `sale_order_revision`, `sale_commission_pricelist`, `sale_commission_formula`, `sale_approval`, `sale_cancel_reason`.\n- **Custom Reports:** Mendesain format pelaporan spesifik: `report_sale_by_product_category`, `report_pricelist_product`, `so_report_groupby_customer`, `sr_sales_report_saleperson_groupby`, `so_report_by_salesperson`.\n- **Problem Solved & Result:** Mengotomatisasi sistem kontrak dan penagihan B2B yang rumit. Proses billing menjadi terarah dan terhindar dari human-error.\n\n#### Modul Purchase\n- **Kustomisasi (Inheritance):** Meng-override logika dari `purchase`, `hr` bawaan. Modifikasi meliputi fungsionalitas di: berbagai sub-modul pendukung.\n- **Support Module Baru:** Dibangun (standalone) untuk menyokong alur operasional: `purchase_order_approved`, `product_supplierinfo_discount`, `purchase_request_to_rfq`, `purchase_cancel_qty`, `purchase_last_price_info`, `purchase_request_to_rfq_order_approved`, `purchase_order_approval_block`.\n- **Custom Reports:** Mendesain format pelaporan spesifik: `po_report`.\n- **Problem Solved & Result:** Mencegah pengadaan di luar batas wajar (rogue purchasing). Sistem berhasil menahan pemborosan via Tiered Validation.\n\n#### Modul Inventory\n- **Kustomisasi (Inheritance):** Meng-override logika dari `mrp`, `stock` bawaan. Modifikasi meliputi fungsionalitas di: `custom_reordering_rules`, `custom_label`, `custom_stock`.\n- **Support Module Baru:** Dibangun (standalone) untuk menyokong alur operasional: `product_generator_sku`, `mrp_bom_current_stock`, `product_inventory_location`, `stock_move_optimation`, `vit_stock_card_pro`, `product_default_routes`, `stock_by_wh_in_prod`.\n- **Custom Reports:** Mendesain format pelaporan spesifik: `internal_transfer_report`, `report_stock_opname`, `report_detailed_inventory`.\n- **Problem Solved & Result:** Mengatasi ketidakcocokan data operasional lapangan/armada dengan sistem pusat. Akurasi pergerakan barang (mutasi logistik/kapal) kini terpantau real-time.\n\n#### Modul HR\n- **Support Module Baru:** Dibangun (standalone) untuk menyokong alur operasional: `theme_common`, `persistent_tree_view`.\n- **Problem Solved & Result:** Menyatukan data komisi lapangan/armada dengan struktur HR. Hasilnya adalah perhitungan upah dan tunjangan (ESR/Loan) yang masuk tanpa gesekan ke payroll.\n\n#### Modul MRP\n- **Kustomisasi (Inheritance):** Meng-override logika dari `mrp` bawaan. Modifikasi meliputi fungsionalitas di: berbagai sub-modul pendukung.\n- **Support Module Baru:** Dibangun (standalone) untuk menyokong alur operasional: `mrp_bom_location`.\n- **Custom Reports:** Mendesain format pelaporan spesifik: `mrp_bom_matrix_report`.\n- **Problem Solved & Result:** Menyatukan instruksi produksi langsung dengan divisi terkait. Kalkulasi BoM dieksekusi secara dinamis tanpa jeda komunikasi.\n\n#### Modul System\n- **Kustomisasi (Inheritance):** Meng-override logika dari `core_modules` bawaan. Modifikasi meliputi fungsionalitas di: `mail_base`.\n- **Support Module Baru:** Dibangun (standalone) untuk menyokong alur operasional: `redis_session_module`, `web_widget_many2many_tags_multi_selection`, `smile_redis_session_store`, `vit_kelurahan`, `access_restricted`, `theme_kit`, `backend_theme_v10`.\n- **Custom Reports:** Mendesain format pelaporan spesifik: `base_report_to_printer`, `report_xlsx`.\n- **Problem Solved & Result:** Mengatur skala infrastruktur database dan otorisasi menu untuk menjamin kestabilan instance ERP secara keseluruhan.\n\n",
                    'tags' => ['ERP', 'HRMS Loan', 'WebSockets', 'Dotmatrix', 'Wholesale'],
                    'technologies' => ['Odoo', 'Python', 'PostgreSQL', 'Raw SQL', 'JavaScript', 'Hardware Sync'],
                    'image' => 'https://placehold.co/600x400/png?text=Tulusdev+Wholesale+ERP',
                    'project_url' => '',
                    'github_url' => '',
                ],
                [
                    'title' => 'Hybrid Retail & Production Automation (Glory Dev)',
                    'slug' => 'glory-dev-advanced-erp-' . $user->id,
                    'description' => 'Inovasi *Point of Sale* yang mampu mengontrol arus Produksi (MRP) di dapur, rekap hutang terpusat, dan *Auto-cleanup Database*.',
                    'detailed_description' => 'Membalik paradigma sistem kasir biasa. Di Glory Dev, POS digunakan sebagai antarmuka komando multi-fungsi yang memerintahkan pabrikasi perakitan, mencatat pengeluaran akuntansi instan, dan membagi sesi pesanan antar terminal.',
                    'content' => "### Architectural Case Study: Glory Dev Ecosystem\n\n#### Modul Accounting\n- **Kustomisasi (Inheritance):** Meng-override logika dari `hr`, `sale`, `account`, `point_of_sale`, `purchase`, `stock` bawaan. Modifikasi meliputi fungsionalitas di: `app_odoo_customize`.\n- **Support Module Baru:** Dibangun (standalone) untuk menyokong alur operasional: `account_parent`, `ohrms_loan_accounting`, `om_account_asset`, `muk_account_accountant`, `pos_invoice_pay`, `om_account_budget`, `purchase_global_disc`.\n- **Custom Reports:** Mendesain format pelaporan spesifik: `report_product_category`, `report_purchase_items`, `report_payment_recap`, `accounting_pdf_reports`.\n- **Problem Solved & Result:** Mengeliminasi pembukuan manual dan kompleksitas cashflow multi-company/cabang. Menghasilkan rekonsiliasi pembayaran otomatis dan pelacakan arus kas (Cashbook) yang presisi.\n\n#### Modul POS\n- **Kustomisasi (Inheritance):** Meng-override logika dari `sale`, `point_of_sale`, `purchase`, `mrp`, `stock` bawaan. Modifikasi meliputi fungsionalitas di: `pos_order_receipt_custom`, `custom_receipt`, `pos_receipt_custom_template`, `customer_member`, `custom_pos_mrp`.\n- **Support Module Baru:** Dibangun (standalone) untuk menyokong alur operasional: `pos_expenses_pay`, `pos_restaurant_base`, `pos_orders_history`, `pos_order_note`, `vit_turbo_pos_closing`, `pos_order_cancel`, `pos_discount_total`.\n- **Custom Reports:** Mendesain format pelaporan spesifik: `custom_report`, `pos_z_report_backend`.\n- **Problem Solved & Result:** Memecahkan batasan fungsional POS native yang kaku. Hasilnya sinkronisasi transaksi sangat cepat dan terintegrasi ekosistem hardware/promo lokal klien.\n\n#### Modul Sales\n- **Kustomisasi (Inheritance):** Meng-override logika dari `sale`, `purchase`, `stock` bawaan. Modifikasi meliputi fungsionalitas di: berbagai sub-modul pendukung.\n- **Support Module Baru:** Dibangun (standalone) untuk menyokong alur operasional: `ks_dashboard_ninja`, `ks_dn_advance`, `sales_promotion`, `stock_card`, `ks_website_dashboard_ninja`, `access_cost_product`.\n- **Custom Reports:** Mendesain format pelaporan spesifik: `report_by_salesperson`.\n- **Problem Solved & Result:** Mengotomatisasi sistem kontrak dan penagihan B2B yang rumit. Proses billing menjadi terarah dan terhindar dari human-error.\n\n#### Modul Purchase\n- **Kustomisasi (Inheritance):** Meng-override logika dari `purchase` bawaan. Modifikasi meliputi fungsionalitas di: berbagai sub-modul pendukung.\n- **Support Module Baru:** Dibangun (standalone) untuk menyokong alur operasional: `minimum_stock_vendor`.\n- **Problem Solved & Result:** Mencegah pengadaan di luar batas wajar (rogue purchasing). Sistem berhasil menahan pemborosan via Tiered Validation.\n\n#### Modul HR\n- **Kustomisasi (Inheritance):** Meng-override logika dari `hr` bawaan. Modifikasi meliputi fungsionalitas di: berbagai sub-modul pendukung.\n- **Support Module Baru:** Dibangun (standalone) untuk menyokong alur operasional: `theme_common`, `detail_employee`.\n- **Problem Solved & Result:** Menyatukan data komisi lapangan/armada dengan struktur HR. Hasilnya adalah perhitungan upah dan tunjangan (ESR/Loan) yang masuk tanpa gesekan ke payroll.\n\n#### Modul System\n- **Kustomisasi (Inheritance):** Meng-override logika dari `core_modules` bawaan. Modifikasi meliputi fungsionalitas di: `detail_customer`.\n- **Support Module Baru:** Dibangun (standalone) untuk menyokong alur operasional: `muk_web_client_refresh`, `oi_stop_database_manager`, `access_restricted`, `muk_web_theme`, `muk_web_branding`, `muk_web_client`, `muk_web_utils`.\n- **Problem Solved & Result:** Mengatur skala infrastruktur database dan otorisasi menu untuk menjamin kestabilan instance ERP secara keseluruhan.\n\n",
                    'tags' => ['ERP', 'Manufacturing', 'Kitchen Screen', 'Autovacuum', 'Accounting'],
                    'technologies' => ['Odoo', 'JavaScript', 'PostgreSQL', 'Cron', 'Python'],
                    'image' => 'https://placehold.co/600x400/png?text=Glory+Retail+Ecosystem',
                    'project_url' => '',
                    'github_url' => '',
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
                    'detailed_description' => $projData['detailed_description'] ?? null,
                    'content' => $projData['content'],
                    'thumbnail' => $projData['image'],
                    'project_url' => $projData['project_url'] ?? '',
                    'github_url' => $projData['github_url'] ?? '',
                    'is_featured' => true,
                    'published_at' => Carbon::now(),
                ]);

                // Attach technologies
                $techIds = Technology::whereIn('name', $projData['technologies'])->pluck('id');
                $project->technologies()->attach($techIds);

                // Attach tags
                if (isset($projData['tags'])) {
                    $tagIds = Tag::whereIn('name', $projData['tags'])->pluck('id');
                    $project->tags()->attach($tagIds);
                }

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

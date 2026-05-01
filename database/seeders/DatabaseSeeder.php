<?php

namespace Database\Seeders;

use App\Models\Certification;
use App\Models\Education;
use App\Models\Experience;
use App\Models\PricingPlan;
use App\Models\Profile;
use App\Models\Project;
use App\Models\Service;
use App\Models\Setting;
use App\Models\Skill;
use App\Models\Testimonial;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // ----- Admin user -----
        $plainPassword = Str::random(14);
        User::updateOrCreate(
            ['email' => 'ferhatmuhamad221@gmail.com'],
            [
                'name' => 'Ferhat Muhamad Yasin',
                'password' => Hash::make($plainPassword),
                'is_admin' => true,
                'email_verified_at' => now(),
            ]
        );

        $this->command->info('');
        $this->command->info('============================================');
        $this->command->info('  ADMIN CREDENTIALS (save this!)');
        $this->command->info('  Login URL : /admin-ferhat/login');
        $this->command->info('  Email     : ferhatmuhamad221@gmail.com');
        $this->command->info('  Password  : ' . $plainPassword);
        $this->command->info('============================================');
        $this->command->info('');

        // ----- General settings -----
        Setting::set('site_name', 'Ferhat Muhamad Yasin');
        Setting::set('site_tagline', 'Front End & WordPress Developer');
        Setting::set('seo_description', 'Full-Stack Web Developer | WordPress Expert | React & Laravel Specialist');
        Setting::set('seo_keywords', ['react', 'laravel', 'wordpress', 'odoo', 'frontend developer', 'yogyakarta']);
        Setting::set('show_blog', true);
        Setting::set('show_pricing', true);
        Setting::set('show_testimonials', true);
        Setting::set('default_locale', 'en');

        // ----- Profile -----
        Profile::truncate();
        Profile::create([
            'name' => 'Ferhat Muhamad Yasin',
            'headline' => 'Front End Web Developer & WordPress Developer',
            'summary' => "Results-driven web developer with 3+ years of experience building responsive, high-performance, and user-centric websites. Proficient in React.js, Vue.js, Laravel, Tailwind CSS, and WordPress CMS — with a proven track record of delivering scalable solutions for businesses. Experienced in integrating AI tools and automation workflows to streamline processes and enhance productivity.",
            'summary_id' => "Web developer berorientasi hasil dengan pengalaman 3+ tahun membangun website yang responsif, performa tinggi, dan berfokus pada pengguna. Mahir dalam React.js, Vue.js, Laravel, Tailwind CSS, dan WordPress CMS — dengan rekam jejak menghadirkan solusi scalable untuk bisnis. Berpengalaman mengintegrasikan AI dan otomasi untuk meningkatkan produktivitas.",
            'email' => 'ferhatmuhamad221@gmail.com',
            'phone' => '+62 821-4308-7926',
            'whatsapp' => '6282143087926',
            'location' => 'Yogyakarta, Indonesia',
            'socials' => [
                'github' => 'https://github.com/ferhatmuhamad',
                'linkedin' => 'https://linkedin.com/in/ferhatmuhamad',
                'instagram' => 'https://instagram.com/ferhatmuhamad',
            ],
            'stats' => [
                ['label' => 'Years Experience', 'label_id' => 'Tahun Pengalaman', 'value' => 3, 'suffix' => '+'],
                ['label' => 'Projects Delivered', 'label_id' => 'Proyek Selesai', 'value' => 40, 'suffix' => '+'],
                ['label' => 'Happy Clients', 'label_id' => 'Klien Puas', 'value' => 25, 'suffix' => '+'],
                ['label' => 'Tech Stacks', 'label_id' => 'Tech Stack', 'value' => 15, 'suffix' => '+'],
            ],
        ]);

        // ----- Services -----
        Service::query()->delete();
        $services = [
            [
                'icon' => 'Code2',
                'title' => 'Front-End Development',
                'title_id' => 'Pengembangan Front-End',
                'description' => 'Crafting blazing-fast, accessible UIs with React, Next.js, and Vue. Pixel-perfect to your design.',
                'description_id' => 'Membangun UI cepat dan accessible dengan React, Next.js, dan Vue. Pixel-perfect sesuai desain.',
                'features' => ['React / Next.js', 'Vue / Nuxt', 'Tailwind CSS', 'Framer Motion']
            ],
            [
                'icon' => 'Layers',
                'title' => 'WordPress Development',
                'title_id' => 'Pengembangan WordPress',
                'description' => 'Custom themes, Elementor mastery, WooCommerce stores, and Midtrans payment integration.',
                'description_id' => 'Custom theme, Elementor, WooCommerce, dan integrasi pembayaran Midtrans.',
                'features' => ['Custom Theme', 'Elementor / WPBakery', 'WooCommerce', 'Performance & SEO']
            ],
            [
                'icon' => 'Building2',
                'title' => 'Odoo ERP Development',
                'title_id' => 'Pengembangan Odoo ERP',
                'description' => 'Implementing and customizing Odoo modules: Accounting, CRM, Sales, Inventory, and Project.',
                'description_id' => 'Implementasi dan kustomisasi modul Odoo: Accounting, CRM, Sales, Inventory, dan Project.',
                'features' => ['Module Customization', 'Workflow Automation', 'Reports', 'Training & Support']
            ],
            [
                'icon' => 'Server',
                'title' => 'Full-Stack & API',
                'title_id' => 'Full-Stack & API',
                'description' => 'End-to-end Laravel apps with REST/Inertia APIs, payment gateways, and third-party integrations.',
                'description_id' => 'Aplikasi Laravel end-to-end dengan API REST/Inertia, payment gateway, dan integrasi pihak ketiga.',
                'features' => ['Laravel 12', 'REST / Inertia', 'Auth & Security', 'Postman Tested']
            ],
        ];
        foreach ($services as $i => $s) {
            Service::create($s + ['order' => $i, 'is_active' => true]);
        }

        // ----- Skills -----
        Skill::query()->delete();
        $skills = [
            ['name' => 'React JS', 'category' => 'frontend', 'icon' => 'Atom', 'level' => 92],
            ['name' => 'Next.js', 'category' => 'frontend', 'icon' => 'Triangle', 'level' => 85],
            ['name' => 'Vue.js / Pinia', 'category' => 'frontend', 'icon' => 'Boxes', 'level' => 80],
            ['name' => 'Tailwind CSS', 'category' => 'frontend', 'icon' => 'Wind', 'level' => 95],
            ['name' => 'Bootstrap', 'category' => 'frontend', 'icon' => 'LayoutGrid', 'level' => 88],
            ['name' => 'TypeScript', 'category' => 'frontend', 'icon' => 'FileType', 'level' => 80],
            ['name' => 'PHP 8', 'category' => 'backend', 'icon' => 'Code', 'level' => 88],
            ['name' => 'Laravel 12', 'category' => 'backend', 'icon' => 'Flame', 'level' => 90],
            ['name' => 'MySQL / SQLite', 'category' => 'backend', 'icon' => 'Database', 'level' => 82],
            ['name' => 'REST API', 'category' => 'backend', 'icon' => 'Network', 'level' => 85],
            ['name' => 'WordPress', 'category' => 'cms', 'icon' => 'Globe', 'level' => 95],
            ['name' => 'Elementor', 'category' => 'cms', 'icon' => 'PaintBucket', 'level' => 92],
            ['name' => 'WooCommerce', 'category' => 'cms', 'icon' => 'ShoppingCart', 'level' => 88],
            ['name' => 'WPBakery', 'category' => 'cms', 'icon' => 'Wrench', 'level' => 80],
            ['name' => 'Moodle LMS', 'category' => 'cms', 'icon' => 'GraduationCap', 'level' => 70],
            ['name' => 'Odoo ERP', 'category' => 'other', 'icon' => 'Building2', 'level' => 80],
            ['name' => 'Midtrans Payment', 'category' => 'other', 'icon' => 'CreditCard', 'level' => 85],
            ['name' => 'Server Admin (SSH/FTP)', 'category' => 'other', 'icon' => 'Terminal', 'level' => 78],
            ['name' => 'Postman', 'category' => 'other', 'icon' => 'Send', 'level' => 85],
            ['name' => 'TablePlus', 'category' => 'other', 'icon' => 'Table', 'level' => 82],
        ];
        foreach ($skills as $i => $sk) {
            Skill::create($sk + ['order' => $i, 'is_active' => true]);
        }

        // ----- Experience -----
        Experience::query()->delete();
        $experiences = [
            [
                'role' => 'Front End Web Developer',
                'company' => 'Amanata',
                'location' => 'Remote',
                'start_date' => '2024-11-01',
                'end_date' => null,
                'description' => 'Front-end customization, component development, and API integration for WordPress and Laravel projects.',
                'description_id' => 'Kustomisasi front-end, pengembangan komponen, dan integrasi API untuk proyek WordPress & Laravel.',
                'highlights' => [
                    'Contributed to WordPress and Laravel-based projects: front-end customization, component development, API integration aligned to client needs.',
                    'Optimized application performance via lazy loading, code splitting, and caching.',
                    'Integrated APIs and third-party services to enhance app functionality and performance.',
                ],
                'highlights_id' => [
                    'Berkontribusi pada proyek berbasis WordPress & Laravel: kustomisasi front-end, komponen, dan integrasi API.',
                    'Mengoptimalkan performa via lazy loading, code splitting, dan caching.',
                    'Mengintegrasikan API dan layanan pihak ketiga untuk meningkatkan fungsionalitas aplikasi.',
                ],
            ],
            [
                'role' => 'IT Lead',
                'company' => 'Futake Indonesia',
                'location' => 'Yogyakarta',
                'start_date' => '2024-05-01',
                'end_date' => null,
                'description' => 'Lead Odoo ERP implementation across Accounting, CRM, Sales, Project, Purchasing, and Inventory.',
                'description_id' => 'Memimpin implementasi Odoo ERP: Accounting, CRM, Sales, Project, Purchasing, dan Inventory.',
                'highlights' => [
                    'Lead the implementation, optimization, and management of Odoo ERP modules.',
                    'Oversee integration and customization of Odoo to streamline business processes.',
                    'Manage and maintain the company WordPress website for performance, security, and UX.',
                    'Lead the IT support team, providing technical troubleshooting across the organization.',
                ],
                'highlights_id' => [
                    'Memimpin implementasi, optimasi, dan manajemen modul Odoo ERP.',
                    'Mengawasi integrasi dan kustomisasi Odoo untuk merampingkan proses bisnis.',
                    'Mengelola dan memelihara website WordPress perusahaan: performa, keamanan, UX.',
                    'Memimpin tim IT support: troubleshooting teknis di seluruh organisasi.',
                ],
            ],
            [
                'role' => 'Web Developer',
                'company' => 'PT. Lovary Corpora Indonesia',
                'location' => 'Remote',
                'start_date' => '2024-03-01',
                'end_date' => '2024-06-30',
                'description' => 'High-converting WordPress landing pages for digital advertising campaigns.',
                'description_id' => 'Landing page WordPress untuk kampanye iklan digital dengan konversi tinggi.',
                'highlights' => [
                    'Built high-converting landing pages aligned to brand guidelines.',
                    'Customized themes/page builders (Elementor) for scalable campaign-specific landings.',
                    'Translated marketing objectives into clear CTAs and optimized layouts.',
                ],
                'highlights_id' => [
                    'Membangun landing page konversi tinggi sesuai brand guideline.',
                    'Kustomisasi tema & page builder (Elementor) yang scalable untuk kampanye.',
                    'Menerjemahkan objektif marketing menjadi layout dan CTA yang efektif.',
                ],
            ],
            [
                'role' => 'Fullstack Web Developer',
                'company' => 'Signals99 Studio',
                'location' => 'Yogyakarta',
                'start_date' => '2022-10-01',
                'end_date' => '2024-06-30',
                'description' => 'Dynamic and responsive front-end with Vue.js, agile sprints, code reviews.',
                'description_id' => 'Front-end dinamis & responsif dengan Vue.js, sprint agile, dan code review.',
                'highlights' => [
                    'Developed responsive UIs with Vue.js, HTML, CSS, JavaScript.',
                    'Worked agile sprints with code reviews and tight delivery windows.',
                    'Optimized codebase and deploy pipelines to reduce iteration time.',
                ],
                'highlights_id' => [
                    'Mengembangkan UI responsif dengan Vue.js, HTML, CSS, JavaScript.',
                    'Sprint agile dengan code review dan jadwal rilis ketat.',
                    'Mengoptimalkan codebase & pipeline deployment untuk iterasi lebih cepat.',
                ],
            ],
            [
                'role' => 'Web Developer',
                'company' => 'Futake Indonesia',
                'location' => 'Yogyakarta',
                'start_date' => '2021-02-01',
                'end_date' => '2024-04-30',
                'description' => 'End-to-end WordPress projects, performance optimization, SEO, lead generation.',
                'description_id' => 'Proyek WordPress end-to-end, optimasi performa, SEO, dan lead generation.',
                'highlights' => [
                    'Led end-to-end WordPress projects, coordinating teams for timely launches.',
                    'Improved structure, UX, and SEO via strategic content architecture.',
                    'Boosted Core Web Vitals via image compression, caching, lazy loading, and server config.',
                    'Collaborated with design & marketing to enhance lead generation funnels.',
                ],
                'highlights_id' => [
                    'Memimpin proyek WordPress end-to-end, mengoordinasikan tim untuk peluncuran tepat waktu.',
                    'Meningkatkan struktur, UX, dan SEO melalui arsitektur konten strategis.',
                    'Meningkatkan Core Web Vitals via kompresi gambar, caching, lazy loading, dan konfigurasi server.',
                    'Berkolaborasi dengan tim desain & marketing untuk lead generation funnel.',
                ],
            ],
        ];
        foreach ($experiences as $i => $e) {
            Experience::create($e + ['order' => $i, 'is_active' => true]);
        }

        // ----- Education -----
        Education::query()->delete();
        Education::create([
            'degree' => 'Bachelor of Informatics Engineering',
            'institution' => 'University of Ahmad Dahlan',
            'start_date' => '2018-07-01',
            'end_date' => '2023-11-30',
            'description' => 'Major in Software Engineering. Thesis: "Implementation of QR Code in Goods Inventory Information System".',
            'description_id' => 'Jurusan Rekayasa Perangkat Lunak. Skripsi: "Implementasi QR Code pada Sistem Informasi Inventaris Barang".',
            'order' => 0,
            'is_active' => true,
        ]);

        // ----- Certifications -----
        Certification::query()->delete();
        $certs = [
            ['title' => 'Belajar Analisis Data dengan Python', 'issuer' => 'Dicoding Indonesia', 'issued_at' => '2024-10-01'],
            ['title' => 'Odoo Development Training', 'issuer' => 'Arkana Solusi Digital', 'issued_at' => '2025-01-01'],
            ['title' => 'Full-Stack Web Developer Laravel React: Toko Online Cosmetic', 'issuer' => 'BuildWithAngga', 'issued_at' => '2025-03-01'],
            ['title' => 'Belajar Fundamental Aplikasi Web dengan React', 'issuer' => 'Dicoding Indonesia', 'issued_at' => '2025-04-01'],
            ['title' => 'Menjadi React Web Developer Expert', 'issuer' => 'Dicoding Indonesia', 'issued_at' => '2025-04-15'],
        ];
        foreach ($certs as $i => $c) {
            Certification::create($c + ['order' => $i, 'is_active' => true]);
        }

        // ----- Projects -----
        Project::query()->delete();
        $projects = [
            [
                'title' => 'Cosmetic E-Commerce',
                'category' => 'laravel',
                'client' => 'Personal Project',
                'summary' => 'Full-stack online cosmetics store with Laravel + React, Midtrans payment, and admin dashboard.',
                'summary_id' => 'Toko kosmetik online full-stack dengan Laravel + React, pembayaran Midtrans, dan dashboard admin.',
                'tech_stack' => ['Laravel', 'React', 'Tailwind', 'Midtrans', 'MySQL'],
                'is_featured' => true,
                'completed_at' => '2025-04-01'
            ],
            [
                'title' => 'Futake Corporate Website',
                'category' => 'wordpress',
                'client' => 'Futake Indonesia',
                'summary' => 'Corporate WordPress site with custom Elementor blocks and Core Web Vitals score 95+.',
                'summary_id' => 'Website korporat WordPress dengan blok Elementor kustom, skor Core Web Vitals 95+.',
                'tech_stack' => ['WordPress', 'Elementor', 'PHP', 'CDN'],
                'is_featured' => true,
                'completed_at' => '2024-09-01'
            ],
            [
                'title' => 'Odoo ERP — Manufacturing Suite',
                'category' => 'odoo',
                'client' => 'Futake Indonesia',
                'summary' => 'Full Odoo implementation: Accounting, CRM, Sales, Inventory, Purchasing, and Project.',
                'summary_id' => 'Implementasi Odoo lengkap: Accounting, CRM, Sales, Inventory, Purchasing, dan Project.',
                'tech_stack' => ['Odoo 17', 'Python', 'PostgreSQL', 'XML'],
                'is_featured' => true,
                'completed_at' => '2025-02-01'
            ],
            [
                'title' => 'Marketing Landing Pages',
                'category' => 'wordpress',
                'client' => 'PT. Lovary Corpora',
                'summary' => 'Series of conversion-optimized landing pages for paid ad campaigns.',
                'summary_id' => 'Serangkaian landing page yang dioptimalkan untuk konversi kampanye iklan.',
                'tech_stack' => ['WordPress', 'Elementor', 'Meta Pixel', 'GA4'],
                'completed_at' => '2024-06-01'
            ],
            [
                'title' => 'Vue.js Internal Dashboard',
                'category' => 'vue',
                'client' => 'Signals99 Studio',
                'summary' => 'Internal SPA dashboard with Vue 3, Pinia, and REST API integration.',
                'summary_id' => 'Dashboard SPA internal dengan Vue 3, Pinia, dan integrasi REST API.',
                'tech_stack' => ['Vue 3', 'Pinia', 'Tailwind', 'Axios'],
                'completed_at' => '2024-03-01'
            ],
            [
                'title' => 'QR Inventory System',
                'category' => 'laravel',
                'client' => 'Final Year Thesis',
                'summary' => 'QR Code-based goods inventory information system — thesis project.',
                'summary_id' => 'Sistem informasi inventaris barang berbasis QR Code (proyek skripsi).',
                'tech_stack' => ['Laravel', 'Bootstrap', 'MySQL', 'QR Code'],
                'completed_at' => '2023-10-01'
            ],
        ];
        foreach ($projects as $i => $p) {
            Project::create($p + ['order' => $i, 'is_active' => true]);
        }

        // ----- Testimonials -----
        Testimonial::query()->delete();
        $testimonials = [
            [
                'name' => 'Andi Pratama',
                'role' => 'Marketing Manager',
                'company' => 'PT. Lovary Corpora',
                'quote' => 'Ferhat delivered our landing pages on schedule and our ad CTR improved noticeably. Reliable and detail-oriented.',
                'quote_id' => 'Ferhat menyelesaikan landing page kami tepat waktu dan CTR iklan kami meningkat. Andal dan detail.',
                'rating' => 5
            ],
            [
                'name' => 'Siti Rahma',
                'role' => 'Operations Lead',
                'company' => 'Futake Indonesia',
                'quote' => 'His Odoo implementation transformed our workflow. Documentation, training, and support were excellent.',
                'quote_id' => 'Implementasi Odoo-nya mengubah workflow kami. Dokumentasi, training, dan support sangat baik.',
                'rating' => 5
            ],
            [
                'name' => 'Dimas Surya',
                'role' => 'Founder',
                'company' => 'Signals99 Studio',
                'quote' => 'Strong full-stack instincts. He plugs into agile teams quickly and ships clean, performant code.',
                'quote_id' => 'Insting full-stack yang kuat. Cepat menyatu dengan tim agile dan menghasilkan kode yang bersih.',
                'rating' => 5
            ],
        ];
        foreach ($testimonials as $i => $t) {
            Testimonial::create($t + ['order' => $i, 'is_active' => true]);
        }

        // ----- Pricing -----
        PricingPlan::query()->delete();
        $plans = [
            [
                'name' => 'Landing Page',
                'name_id' => 'Landing Page',
                'tagline' => 'Perfect for campaigns & launches',
                'tagline_id' => 'Cocok untuk kampanye & peluncuran',
                'price' => 2500000,
                'currency' => 'IDR',
                'billing_period' => '/project',
                'features' => ['1–3 sections', 'Mobile responsive', 'SEO basics', 'WhatsApp integration', '7-day delivery'],
                'features_id' => ['1–3 section', 'Mobile responsive', 'SEO dasar', 'Integrasi WhatsApp', 'Pengerjaan 7 hari'],
                'cta_label' => 'Start Project',
                'cta_url' => '#contact'
            ],
            [
                'name' => 'Business Website',
                'name_id' => 'Website Bisnis',
                'tagline' => 'Most popular for SMEs',
                'tagline_id' => 'Paling populer untuk UKM',
                'price' => 7500000,
                'currency' => 'IDR',
                'billing_period' => '/project',
                'features' => ['Up to 8 pages', 'CMS (WordPress/Custom)', 'Blog & SEO', 'Performance optimization', 'Free 1-month support'],
                'features_id' => ['Hingga 8 halaman', 'CMS (WordPress/Custom)', 'Blog & SEO', 'Optimasi performa', 'Support 1 bulan'],
                'is_popular' => true,
                'cta_label' => 'Get Started',
                'cta_url' => '#contact'
            ],
            [
                'name' => 'Custom App',
                'name_id' => 'Aplikasi Custom',
                'tagline' => 'Tailored full-stack solution',
                'tagline_id' => 'Solusi full-stack sesuai kebutuhan',
                'price' => null,
                'currency' => 'IDR',
                'billing_period' => 'Custom Quote',
                'features' => ['Laravel / React / Vue', 'Database design', 'Auth & roles', 'Payment gateway', 'API integrations', 'Deployment & training'],
                'features_id' => ['Laravel / React / Vue', 'Desain database', 'Auth & roles', 'Payment gateway', 'Integrasi API', 'Deployment & training'],
                'cta_label' => 'Discuss Project',
                'cta_url' => '#contact'
            ],
        ];
        foreach ($plans as $i => $p) {
            PricingPlan::create($p + ['order' => $i, 'is_active' => true]);
        }
    }
}

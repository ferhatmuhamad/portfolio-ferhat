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
        // ----- Admin user (preserve existing password) -----
        $existingUser = User::where('email', 'ferhatmuhamad221@gmail.com')->first();
        if (! $existingUser) {
            $plainPassword = Str::random(14);
            User::create([
                'email' => 'ferhatmuhamad221@gmail.com',
                'name' => 'Ferhat Muhamad Yasin',
                'password' => Hash::make($plainPassword),
                'is_admin' => true,
                'email_verified_at' => now(),
            ]);
            $this->command->info('');
            $this->command->info('============================================');
            $this->command->info('  ADMIN CREDENTIALS (save this!)');
            $this->command->info('  Login URL : /admin-ferhat/login');
            $this->command->info('  Email     : ferhatmuhamad221@gmail.com');
            $this->command->info('  Password  : ' . $plainPassword);
            $this->command->info('============================================');
            $this->command->info('');
        } else {
            $existingUser->update([
                'name' => 'Ferhat Muhamad Yasin',
                'is_admin' => true,
            ]);
            $this->command->info('Admin user already exists — password preserved.');
        }

        // ----- General settings -----
        Setting::set('site_name', 'Ferhat Muhamad Yasin');
        Setting::set('site_tagline', 'Full-Stack Web Developer · Odoo ERP Specialist · WordPress Performance Expert');
        Setting::set('seo_description', 'Full-Stack Web Developer specializing in Odoo ERP, WordPress, React & Vue. I build high-performance, scalable, and conversion-focused web products for businesses.');
        Setting::set('seo_keywords', [
            'full-stack web developer',
            'odoo erp specialist',
            'wordpress performance expert',
            'react developer',
            'vue developer',
            'laravel developer',
            'freelance web developer indonesia',
            'yogyakarta developer',
            'core web vitals',
            'landing page developer',
        ]);
        Setting::set('show_blog', true);
        Setting::set('show_pricing', true);
        Setting::set('show_testimonials', true);
        Setting::set('default_locale', 'en');

        // ----- Profile (preserve uploaded avatar/cv) -----
        Profile::updateOrCreate(
            ['email' => 'ferhatmuhamad221@gmail.com'],
            [
                'name' => 'Ferhat Muhamad Yasin',
                'headline' => 'Full-Stack Web Developer · Odoo ERP Specialist · WordPress Performance Expert',
                'summary' => "Full-Stack Web Developer with 3+ years of experience specializing in Odoo ERP, WordPress, and modern JavaScript frameworks (React, Vue). I help businesses ship fast, scalable, and conversion-driven web products — from high-converting landing pages and corporate websites to complete ERP implementations and custom Laravel applications.\n\nProven track record in optimizing Core Web Vitals, automating business processes through Odoo, and integrating REST APIs and payment gateways that streamline operations. Passionate about performance, clean architecture, and crafting user-centric experiences that move metrics for clients.",
                'summary_id' => "Full-Stack Web Developer dengan 3+ tahun pengalaman yang fokus di Odoo ERP, WordPress, dan framework JavaScript modern (React, Vue). Saya membantu bisnis menghadirkan produk web yang cepat, scalable, dan berorientasi konversi — mulai dari landing page berperforma tinggi, website korporat, hingga implementasi ERP dan aplikasi Laravel custom.\n\nMemiliki rekam jejak meningkatkan Core Web Vitals, mengotomasi proses bisnis lewat Odoo, dan mengintegrasikan REST API serta payment gateway. Passionate pada performa, arsitektur yang bersih, dan pengalaman pengguna yang memberi dampak nyata pada metrik bisnis klien.",
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
                    ['label' => 'Core Web Vitals Lift', 'label_id' => 'Peningkatan Core Web Vitals', 'value' => 40, 'suffix' => '%'],
                ],
            ]
        );

        // ----- Services -----
        Service::query()->delete();
        $services = [
            [
                'icon' => 'Code2',
                'title' => 'Front-End Development',
                'title_id' => 'Pengembangan Front-End',
                'description' => 'Pixel-perfect, accessible, and blazing-fast interfaces with React (Next.js) and Vue (Nuxt). Strict attention to performance and UX.',
                'description_id' => 'Antarmuka pixel-perfect, accessible, dan super cepat dengan React (Next.js) dan Vue (Nuxt). Fokus penuh pada performa dan UX.',
                'features' => ['React / Next.js', 'Vue / Nuxt', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
            ],
            [
                'icon' => 'Layers',
                'title' => 'WordPress Performance & Custom Builds',
                'title_id' => 'WordPress Performance & Custom',
                'description' => 'Custom themes, Elementor mastery, WooCommerce stores, and Core Web Vitals optimization that ranks and converts.',
                'description_id' => 'Tema custom, Elementor, WooCommerce, dan optimasi Core Web Vitals untuk ranking dan konversi maksimal.',
                'features' => ['Custom Theme & Blocks', 'Elementor / WPBakery', 'WooCommerce', 'Core Web Vitals 90+', 'Technical SEO'],
            ],
            [
                'icon' => 'Building2',
                'title' => 'Odoo ERP Implementation',
                'title_id' => 'Implementasi Odoo ERP',
                'description' => 'End-to-end Odoo deployment & customization across Accounting, CRM, Sales, Purchasing, Inventory, and Project.',
                'description_id' => 'Implementasi Odoo end-to-end & kustomisasi modul Accounting, CRM, Sales, Purchasing, Inventory, dan Project.',
                'features' => ['Module Customization', 'Workflow Automation', 'Custom Reports', 'Data Migration', 'Training & Support'],
            ],
            [
                'icon' => 'Server',
                'title' => 'Full-Stack Apps & API Integration',
                'title_id' => 'Aplikasi Full-Stack & Integrasi API',
                'description' => 'Production-grade Laravel apps with REST/Inertia APIs, payment gateways (Midtrans), VPS deployment, and PWA capabilities.',
                'description_id' => 'Aplikasi Laravel siap produksi dengan REST/Inertia API, payment gateway (Midtrans), deployment VPS, dan PWA.',
                'features' => ['Laravel 12', 'REST / Inertia.js', 'Midtrans Payment', 'VPS / Server Setup', 'PWA Ready'],
            ],
            [
                'icon' => 'Rocket',
                'title' => 'High-Converting Landing Pages',
                'title_id' => 'Landing Page Konversi Tinggi',
                'description' => 'Conversion-optimized landing pages for paid ad campaigns — built to lift CTR and CPL with strong CTAs and analytics.',
                'description_id' => 'Landing page yang dioptimalkan untuk konversi kampanye iklan — meningkatkan CTR dan menurunkan CPL.',
                'features' => ['A/B Test Ready', 'Meta Pixel & GA4', 'Lead Forms', 'Mobile-first', '7-day Delivery'],
            ],
            [
                'icon' => 'Workflow',
                'title' => 'Maintenance & Performance Audit',
                'title_id' => 'Maintenance & Audit Performa',
                'description' => 'Ongoing maintenance, security hardening, performance audits, and Core Web Vitals tuning for existing sites.',
                'description_id' => 'Maintenance berkala, hardening keamanan, audit performa, dan tuning Core Web Vitals untuk website yang sudah berjalan.',
                'features' => ['Monthly Reports', 'Security Patches', 'Backup Strategy', 'Speed Audit', 'Uptime Monitor'],
            ],
        ];
        foreach ($services as $i => $s) {
            Service::create($s + ['order' => $i, 'is_active' => true]);
        }

        // ----- Skills (aligned with CV) -----
        Skill::query()->delete();
        $skills = [
            // Front End Stack
            ['name' => 'React.js', 'category' => 'frontend', 'icon' => 'Atom', 'level' => 92],
            ['name' => 'Next.js', 'category' => 'frontend', 'icon' => 'Triangle', 'level' => 88],
            ['name' => 'Vue.js', 'category' => 'frontend', 'icon' => 'Boxes', 'level' => 85],
            ['name' => 'Nuxt.js', 'category' => 'frontend', 'icon' => 'Sparkles', 'level' => 78],
            ['name' => 'Tailwind CSS', 'category' => 'frontend', 'icon' => 'Wind', 'level' => 95],
            ['name' => 'TypeScript', 'category' => 'frontend', 'icon' => 'FileType', 'level' => 82],

            // Back End Stack
            ['name' => 'PHP 8', 'category' => 'backend', 'icon' => 'Code', 'level' => 90],
            ['name' => 'Laravel 12', 'category' => 'backend', 'icon' => 'Flame', 'level' => 92],
            ['name' => 'Python', 'category' => 'backend', 'icon' => 'FileCode', 'level' => 75],
            ['name' => 'REST API', 'category' => 'backend', 'icon' => 'Network', 'level' => 88],

            // Database (placed under backend category for grouping)
            ['name' => 'PostgreSQL', 'category' => 'backend', 'icon' => 'Database', 'level' => 82],
            ['name' => 'MySQL', 'category' => 'backend', 'icon' => 'Database', 'level' => 88],
            ['name' => 'SQLite', 'category' => 'backend', 'icon' => 'Database', 'level' => 85],

            // CMS
            ['name' => 'Odoo ERP', 'category' => 'cms', 'icon' => 'Building2', 'level' => 88],
            ['name' => 'WordPress', 'category' => 'cms', 'icon' => 'Globe', 'level' => 95],
            ['name' => 'Elementor', 'category' => 'cms', 'icon' => 'PaintBucket', 'level' => 92],
            ['name' => 'WooCommerce', 'category' => 'cms', 'icon' => 'ShoppingCart', 'level' => 88],
            ['name' => 'Moodle LMS', 'category' => 'cms', 'icon' => 'GraduationCap', 'level' => 72],

            // Other
            ['name' => 'Server Admin (SSH/FTP)', 'category' => 'other', 'icon' => 'Terminal', 'level' => 82],
            ['name' => 'VPS Setup & Deployment', 'category' => 'other', 'icon' => 'Server', 'level' => 80],
            ['name' => 'Payment Gateway (Midtrans)', 'category' => 'other', 'icon' => 'CreditCard', 'level' => 85],
            ['name' => 'Postman', 'category' => 'other', 'icon' => 'Send', 'level' => 88],
            ['name' => 'TablePlus', 'category' => 'other', 'icon' => 'Table', 'level' => 85],
            ['name' => 'PWA (Progressive Web Apps)', 'category' => 'other', 'icon' => 'Smartphone', 'level' => 78],
            ['name' => 'Git & GitHub', 'category' => 'other', 'icon' => 'GitBranch', 'level' => 90],
            ['name' => 'Core Web Vitals Tuning', 'category' => 'other', 'icon' => 'Gauge', 'level' => 90],
        ];
        foreach ($skills as $i => $sk) {
            Skill::create($sk + ['order' => $i, 'is_active' => true]);
        }

        // ----- Experience (per CV, professionally polished) -----
        Experience::query()->delete();
        $experiences = [
            [
                'role' => 'IT Lead',
                'company' => 'Futake Indonesia',
                'location' => 'Yogyakarta, Indonesia',
                'start_date' => '2024-05-01',
                'end_date' => null,
                'description' => 'Leading Odoo ERP implementation and the IT function across the organization, owning systems performance, integrations, and user enablement.',
                'description_id' => 'Memimpin implementasi Odoo ERP dan seluruh fungsi IT perusahaan: performa sistem, integrasi, dan pemberdayaan pengguna.',
                'highlights' => [
                    'Lead end-to-end Odoo ERP implementation, optimization, and management across Accounting, CRM, Sales, Project Management, Purchasing, and Inventory modules.',
                    'Oversee custom integration and module customization to streamline business processes and improve operational efficiency.',
                    "Manage and maintain the company's WordPress website to ensure optimal performance, security posture, and user experience.",
                    'Lead the IT support team — providing technical troubleshooting and ensuring smooth functioning of all IT systems across the organization.',
                ],
                'highlights_id' => [
                    'Memimpin implementasi end-to-end Odoo ERP, optimasi, dan manajemen modul Accounting, CRM, Sales, Project, Purchasing, dan Inventory.',
                    'Mengawasi integrasi dan kustomisasi modul untuk merampingkan proses bisnis dan meningkatkan efisiensi operasional.',
                    'Mengelola dan memelihara website WordPress perusahaan untuk performa, keamanan, dan UX yang optimal.',
                    'Memimpin tim IT support — troubleshooting teknis dan menjaga seluruh sistem IT berjalan lancar.',
                ],
            ],
            [
                'role' => 'Front End Web Developer',
                'company' => 'Amanata',
                'location' => 'Remote',
                'start_date' => '2024-11-01',
                'end_date' => null,
                'description' => 'Front-end engineering for WordPress and Laravel-based products: component development, customization, and third-party API integration.',
                'description_id' => 'Front-end engineering untuk produk berbasis WordPress dan Laravel: pengembangan komponen, kustomisasi, dan integrasi API pihak ketiga.',
                'highlights' => [
                    'Contributed to multiple WordPress and Laravel-based projects — front-end customization, component development, and API integration aligned to client needs.',
                    'Optimized application performance through lazy loading, code splitting, and caching strategies.',
                    'Integrated APIs and third-party services to expand functionality and elevate the overall user experience.',
                    'Collaborated with designers and back-end engineers to deliver pixel-perfect, accessible UI components.',
                ],
                'highlights_id' => [
                    'Berkontribusi pada beberapa proyek WordPress & Laravel — kustomisasi front-end, pengembangan komponen, dan integrasi API sesuai kebutuhan klien.',
                    'Mengoptimasi performa aplikasi via lazy loading, code splitting, dan strategi caching.',
                    'Mengintegrasikan API dan layanan pihak ketiga untuk memperluas fitur dan meningkatkan pengalaman pengguna.',
                    'Berkolaborasi dengan desainer dan back-end engineer untuk komponen UI pixel-perfect dan accessible.',
                ],
            ],
            [
                'role' => 'Web Developer',
                'company' => 'Lovary Corpora Indonesia',
                'location' => 'Remote',
                'start_date' => '2024-03-01',
                'end_date' => '2024-06-30',
                'description' => 'Conversion-driven WordPress landing pages supporting digital advertising campaigns end-to-end.',
                'description_id' => 'Landing page WordPress berorientasi konversi untuk kampanye iklan digital end-to-end.',
                'highlights' => [
                    'Developed high-converting landing pages using WordPress to support digital advertising campaigns, ensuring responsive design and brand-guideline alignment.',
                    'Customized WordPress themes and page builders (Elementor) to build scalable, campaign-specific landings without compromising performance.',
                    'Translated marketing objectives into clear CTAs, optimized layouts, and friction-free content flow that maximized conversions.',
                ],
                'highlights_id' => [
                    'Membangun landing page konversi tinggi dengan WordPress untuk kampanye iklan digital — responsif dan selaras brand guideline.',
                    'Kustomisasi tema WordPress dan page builder (Elementor) untuk landing kampanye yang scalable tanpa mengorbankan performa.',
                    'Menerjemahkan objektif marketing ke CTA yang jelas, layout optimal, dan alur konten yang memaksimalkan konversi.',
                ],
            ],
            [
                'role' => 'Fullstack Web Developer',
                'company' => 'Signals99 Studio',
                'location' => 'Yogyakarta, Indonesia',
                'start_date' => '2022-10-01',
                'end_date' => '2024-06-30',
                'description' => 'Dynamic and responsive front-end interfaces in an agile software-house environment, with strong focus on cross-browser quality.',
                'description_id' => 'Front-end dinamis dan responsif di lingkungan software house agile, dengan fokus kualitas cross-browser.',
                'highlights' => [
                    'Developed dynamic and responsive front-end interfaces using Vue.js, HTML, CSS, and JavaScript — ensuring optimal user experience and cross-browser compatibility.',
                    'Worked closely within agile teams to plan sprints, conduct code reviews, and deliver high-quality solutions within strict project timelines.',
                    'Built high-converting landing pages that increased campaign conversion rates by up to 25%.',
                ],
                'highlights_id' => [
                    'Mengembangkan UI front-end dinamis & responsif dengan Vue.js, HTML, CSS, JavaScript — memastikan UX optimal dan kompatibilitas cross-browser.',
                    'Bekerja erat dalam tim agile: perencanaan sprint, code review, dan delivery solusi berkualitas dalam timeline ketat.',
                    'Membangun landing page konversi tinggi yang meningkatkan conversion rate kampanye hingga 25%.',
                ],
            ],
            [
                'role' => 'Web Developer',
                'company' => 'Futake Indonesia',
                'location' => 'Yogyakarta, Indonesia',
                'start_date' => '2021-02-01',
                'end_date' => '2024-04-30',
                'description' => 'Owned WordPress projects end-to-end with measurable wins on performance, SEO, and lead generation.',
                'description_id' => 'Mengelola proyek WordPress end-to-end dengan hasil terukur pada performa, SEO, dan lead generation.',
                'highlights' => [
                    'Led end-to-end WordPress website projects, coordinating teams to ensure smooth and timely launches.',
                    'Managed WordPress content — improving structure, UX, and SEO through strategic content architecture.',
                    'Improved website load time by up to 40% through image optimization, caching, and code refactoring.',
                    'Spearheaded performance optimization — image compression, caching strategies, code minification, lazy loading, and server configuration — resulting in significantly improved Core Web Vitals scores.',
                    'Collaborated closely with design and marketing teams to integrate UI/UX best practices, enhance lead-generation funnels, and support digital campaign objectives.',
                ],
                'highlights_id' => [
                    'Memimpin proyek website WordPress end-to-end, mengoordinasikan tim untuk peluncuran tepat waktu.',
                    'Mengelola konten WordPress — meningkatkan struktur, UX, dan SEO melalui arsitektur konten strategis.',
                    'Meningkatkan load time hingga 40% melalui optimasi gambar, caching, dan refactoring kode.',
                    'Memimpin optimasi performa — kompresi gambar, caching, minifikasi, lazy loading, dan konfigurasi server — yang menghasilkan skor Core Web Vitals yang jauh lebih baik.',
                    'Berkolaborasi dengan tim desain & marketing untuk best practice UI/UX, lead-generation funnel, dan tujuan kampanye digital.',
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
            'institution' => 'Universitas Ahmad Dahlan',
            'start_date' => '2018-07-01',
            'end_date' => '2023-11-30',
            'description' => 'Major in Software Engineering. Thesis: "Implementation of QR Code in Goods Inventory Information System" — building a QR-based inventory tracking system that improved data accuracy and operational speed.',
            'description_id' => 'Jurusan Rekayasa Perangkat Lunak. Skripsi: "Implementasi QR Code pada Sistem Informasi Inventaris Barang" — sistem pelacakan inventaris berbasis QR yang meningkatkan akurasi data dan kecepatan operasional.',
            'order' => 0,
            'is_active' => true,
        ]);

        // ----- Certifications -----
        Certification::query()->delete();
        $certs = [
            ['title' => 'Menjadi React Web Developer Expert', 'issuer' => 'Dicoding Indonesia', 'issued_at' => '2025-04-15'],
            ['title' => 'Belajar Fundamental Aplikasi Web dengan React', 'issuer' => 'Dicoding Indonesia', 'issued_at' => '2025-04-01'],
            ['title' => 'Full-Stack Web Developer Laravel React: Toko Online Cosmetic', 'issuer' => 'BuildWithAngga', 'issued_at' => '2025-03-01'],
            ['title' => 'Odoo Development Training', 'issuer' => 'Arkana Solusi Digital', 'issued_at' => '2025-01-01'],
            ['title' => 'Belajar Analisis Data dengan Python', 'issuer' => 'Dicoding Indonesia', 'issued_at' => '2024-10-01'],
        ];
        foreach ($certs as $i => $c) {
            Certification::create($c + ['order' => $i, 'is_active' => true]);
        }

        // ----- Projects -----
        Project::query()->delete();
        $projects = [
            [
                'title' => 'Cosmetic E-Commerce Platform',
                'category' => 'laravel',
                'client' => 'Personal Project',
                'summary' => 'Production-ready full-stack online cosmetics store with Laravel + React, Midtrans payment, multi-role admin dashboard, and inventory management.',
                'summary_id' => 'Toko kosmetik online full-stack siap produksi dengan Laravel + React, pembayaran Midtrans, dashboard admin multi-role, dan manajemen inventaris.',
                'tech_stack' => ['Laravel 11', 'React', 'Tailwind CSS', 'Midtrans', 'MySQL', 'Inertia.js'],
                'is_featured' => true,
                'completed_at' => '2025-04-01',
            ],
            [
                'title' => 'Odoo ERP — Manufacturing Suite',
                'category' => 'odoo',
                'client' => 'Futake Indonesia',
                'summary' => 'End-to-end Odoo implementation across Accounting, CRM, Sales, Inventory, Purchasing, and Project — including custom modules and process automation.',
                'summary_id' => 'Implementasi Odoo end-to-end: Accounting, CRM, Sales, Inventory, Purchasing, dan Project — termasuk modul custom dan otomasi proses.',
                'tech_stack' => ['Odoo 17', 'Python', 'PostgreSQL', 'XML', 'OWL'],
                'is_featured' => true,
                'completed_at' => '2025-02-01',
            ],
            [
                'title' => 'Futake Corporate Website',
                'category' => 'wordpress',
                'client' => 'Futake Indonesia',
                'summary' => 'Custom WordPress corporate site with hand-built Elementor blocks, achieving 95+ Core Web Vitals scores on mobile.',
                'summary_id' => 'Website korporat WordPress custom dengan blok Elementor buatan sendiri, skor Core Web Vitals 95+ di mobile.',
                'tech_stack' => ['WordPress', 'Elementor', 'PHP', 'Cloudflare CDN'],
                'is_featured' => true,
                'completed_at' => '2024-09-01',
            ],
            [
                'title' => 'Marketing Landing Pages — Ad Campaigns',
                'category' => 'wordpress',
                'client' => 'Lovary Corpora Indonesia',
                'summary' => 'Series of conversion-optimized WordPress landing pages for paid ad campaigns — instrumented with GA4 and Meta Pixel for full-funnel insight.',
                'summary_id' => 'Serangkaian landing page WordPress yang dioptimalkan untuk kampanye iklan berbayar — terhubung GA4 & Meta Pixel untuk insight funnel.',
                'tech_stack' => ['WordPress', 'Elementor', 'Meta Pixel', 'GA4'],
                'completed_at' => '2024-06-01',
            ],
            [
                'title' => 'Vue.js Internal Operations Dashboard',
                'category' => 'vue',
                'client' => 'Signals99 Studio',
                'summary' => 'Internal SPA dashboard with Vue 3, Pinia state management, and a typed REST API client — used daily by ops & sales teams.',
                'summary_id' => 'Dashboard SPA internal dengan Vue 3, state management Pinia, dan client REST API typed — dipakai harian oleh tim ops & sales.',
                'tech_stack' => ['Vue 3', 'Pinia', 'Tailwind CSS', 'Axios', 'TypeScript'],
                'completed_at' => '2024-03-01',
            ],
            [
                'title' => 'QR Inventory Information System',
                'category' => 'laravel',
                'client' => 'Final Year Thesis',
                'summary' => 'QR Code-based goods inventory information system — designed to reduce manual data entry and improve audit accuracy. Final-year thesis project.',
                'summary_id' => 'Sistem informasi inventaris barang berbasis QR Code — dirancang untuk mengurangi entri data manual dan meningkatkan akurasi audit. Proyek skripsi.',
                'tech_stack' => ['Laravel', 'Bootstrap', 'MySQL', 'QR Code', 'PWA'],
                'completed_at' => '2023-10-01',
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
                'company' => 'Lovary Corpora Indonesia',
                'quote' => 'Ferhat shipped our landing pages on schedule and our ad CTR improved noticeably. Reliable, communicative, and deeply detail-oriented.',
                'quote_id' => 'Ferhat menyelesaikan landing page kami tepat waktu dan CTR iklan kami naik signifikan. Andal, komunikatif, dan sangat detail.',
                'rating' => 5,
            ],
            [
                'name' => 'Siti Rahma',
                'role' => 'Operations Lead',
                'company' => 'Futake Indonesia',
                'quote' => 'His Odoo implementation transformed our workflow. Documentation, training, and ongoing support have been outstanding.',
                'quote_id' => 'Implementasi Odoo-nya mengubah workflow kami. Dokumentasi, training, dan support sangat luar biasa.',
                'rating' => 5,
            ],
            [
                'name' => 'Dimas Surya',
                'role' => 'Founder',
                'company' => 'Signals99 Studio',
                'quote' => 'Strong full-stack instincts. Plugs into agile teams quickly and ships clean, performant code that holds up in production.',
                'quote_id' => 'Insting full-stack yang kuat. Cepat menyatu dengan tim agile dan menghasilkan kode bersih yang tahan di produksi.',
                'rating' => 5,
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
                'tagline' => 'Perfect for ad campaigns & product launches',
                'tagline_id' => 'Cocok untuk kampanye iklan & peluncuran produk',
                'price' => 2500000,
                'currency' => 'IDR',
                'billing_period' => 'project',
                'features' => [
                    '1–3 sections, mobile-first',
                    'Conversion-focused copy structure',
                    'On-page SEO basics',
                    'WhatsApp & form integration',
                    'GA4 / Meta Pixel setup',
                    '7-day delivery',
                ],
                'features_id' => [
                    '1–3 section, mobile-first',
                    'Struktur copy fokus konversi',
                    'On-page SEO dasar',
                    'Integrasi WhatsApp & form',
                    'Setup GA4 / Meta Pixel',
                    'Delivery 7 hari',
                ],
                'cta_label' => 'Start Project',
                'cta_url' => '#contact',
            ],
            [
                'name' => 'Business Website',
                'name_id' => 'Website Bisnis',
                'tagline' => 'Most popular — for SMEs & growing brands',
                'tagline_id' => 'Paling populer — untuk UKM & brand yang berkembang',
                'price' => 7500000,
                'currency' => 'IDR',
                'billing_period' => 'project',
                'features' => [
                    'Up to 8 pages',
                    'Custom WordPress / Laravel CMS',
                    'Blog & technical SEO',
                    'Core Web Vitals 90+ tuning',
                    'Multilingual ready (EN/ID)',
                    'Free 1-month maintenance',
                ],
                'features_id' => [
                    'Hingga 8 halaman',
                    'CMS custom WordPress / Laravel',
                    'Blog & technical SEO',
                    'Tuning Core Web Vitals 90+',
                    'Siap multibahasa (EN/ID)',
                    'Maintenance gratis 1 bulan',
                ],
                'is_popular' => true,
                'cta_label' => 'Get Started',
                'cta_url' => '#contact',
            ],
            [
                'name' => 'Custom App / ERP',
                'name_id' => 'Aplikasi Custom / ERP',
                'tagline' => 'Tailored full-stack or Odoo solution',
                'tagline_id' => 'Solusi full-stack atau Odoo sesuai kebutuhan',
                'price' => null,
                'currency' => 'IDR',
                'billing_period' => 'Custom Quote',
                'features' => [
                    'Laravel / React / Vue / Odoo',
                    'Database design & migration',
                    'Auth, roles & permissions',
                    'Payment gateway (Midtrans)',
                    'REST / Inertia API integrations',
                    'VPS deployment & training',
                ],
                'features_id' => [
                    'Laravel / React / Vue / Odoo',
                    'Desain database & migrasi',
                    'Auth, role & permission',
                    'Payment gateway (Midtrans)',
                    'Integrasi REST / Inertia API',
                    'Deployment VPS & training',
                ],
                'cta_label' => 'Discuss Project',
                'cta_url' => '#contact',
            ],
        ];
        foreach ($plans as $i => $p) {
            PricingPlan::create($p + ['order' => $i, 'is_active' => true]);
        }
    }
}

<?php

/**
 * Restore ALL projects from Upwork portfolio screenshots (May 10, 2026).
 *
 * Behavior:
 *   1. Hard-deletes ALL existing projects (Project::query()->delete()).
 *   2. Inserts the 17 projects below in display order.
 *
 * Run on the server:
 *   cd /www/wwwroot/ferhatmuhamad.web.id
 *   sudo -u www php artisan tinker --execute="require 'database/recovered/restore_from_upwork.php';"
 *
 * Notes:
 *   - cover_path & gallery intentionally left empty — pasangkan manual via admin panel.
 *   - completed_at is set from Upwork "Published on" dates.
 *   - category derived from primary tech (wordpress / laravel / react / vue / nuxt).
 */

use App\Models\Project;
use Illuminate\Support\Str;

$projects = [
    // 1
    [
        'title'      => 'University Academic Information System — SIAKAD UM OKU Timur',
        'category'   => 'laravel',
        'client'     => 'Universitas Muhammadiyah OKU Timur',
        'summary'    => 'Comprehensive academic information system for a private university — covering student data, curriculum, schedules, financial billing with overdue tracking, real-time student monitoring via Google Maps, and a full audit trail.',
        'summary_id' => 'Sistem informasi akademik komprehensif untuk universitas swasta — meliputi data mahasiswa, kurikulum, jadwal, tagihan keuangan dengan pelacakan jatuh tempo, monitoring mahasiswa real-time via Google Maps, dan audit trail lengkap.',
        'content'    => "Built a comprehensive academic information system for a private university, covering student data, curriculum, schedule management, financial billing with overdue tracking, real-time student monitoring via Google Maps, and an audit trail. Delivered a unified platform that replaced fragmented manual processes across departments — giving management live visibility through a statistics dashboard with financial trend charts.\n\nKey features:\n- Student data, curriculum, and schedule management\n- Financial billing with active vs overdue tracking\n- Real-time student monitoring via Google Maps API\n- Statistics dashboard with financial trend charts\n- Multi-role access (BAAK, finance, student affairs, repository)\n- Full audit trail for sensitive operations",
        'content_id' => "Membangun sistem informasi akademik komprehensif untuk universitas swasta, mencakup data mahasiswa, kurikulum, manajemen jadwal, penagihan keuangan dengan pelacakan jatuh tempo, monitoring mahasiswa real-time via Google Maps, serta audit trail. Menghadirkan platform terpadu yang menggantikan proses manual yang terfragmentasi antar departemen — memberi manajemen visibilitas langsung melalui dashboard statistik dengan grafik tren keuangan.\n\nFitur utama:\n- Manajemen data mahasiswa, kurikulum, dan jadwal\n- Penagihan keuangan dengan tracking aktif vs jatuh tempo\n- Monitoring mahasiswa real-time via Google Maps API\n- Dashboard statistik dengan grafik tren keuangan\n- Akses multi-role (BAAK, keuangan, kemahasiswaan, repository)\n- Audit trail penuh untuk operasi sensitif",
        'tech_stack' => ['Laravel', 'Vue.js', 'TypeScript', 'REST API', 'MySQL', 'Google Maps API', 'Tailwind CSS'],
        'live_url'   => 'https://siakad.umokut.ac.id',
        'completed_at' => '2026-05-06',
        'is_featured' => true,
        'order' => 1,
    ],
    // 2
    [
        'title'      => 'Construction & Property Ecosystem Website — IKP',
        'category'   => 'laravel',
        'client'     => 'IKP',
        'summary'    => 'Company profile website for a construction & property ecosystem with service directories, inspiration gallery, articles, free-consultation CTA, and a custom CMS for independent content management.',
        'summary_id' => 'Website company profile untuk ekosistem konstruksi & properti dengan direktori layanan, galeri inspirasi, artikel, CTA konsultasi gratis, dan CMS custom untuk manajemen konten mandiri.',
        'content'    => "Built a company profile website for a construction and property ecosystem platform, featuring service directories (residential & non-estate), an inspiration gallery, tips & articles section, and a free consultation CTA with WhatsApp integration. Includes a custom CMS so the client can manage content independently without touching code.\n\nKey features:\n- Service directory (residential & non-estate)\n- Inspiration gallery & tips/articles section\n- Free consultation CTA with WhatsApp integration\n- Custom CMS for independent content management\n- Responsive, SEO-friendly structure",
        'content_id' => "Membangun website company profile untuk platform ekosistem konstruksi dan properti, dilengkapi direktori layanan (residensial & non-estate), galeri inspirasi, section tips & artikel, serta CTA konsultasi gratis dengan integrasi WhatsApp. Termasuk CMS custom agar klien dapat mengelola konten secara mandiri tanpa menyentuh kode.\n\nFitur utama:\n- Direktori layanan (residensial & non-estate)\n- Galeri inspirasi & section tips/artikel\n- CTA konsultasi gratis dengan integrasi WhatsApp\n- CMS custom untuk manajemen konten mandiri\n- Struktur responsif dan SEO-friendly",
        'tech_stack' => ['Laravel', 'PHP', 'MySQL', 'Custom CMS'],
        'live_url'   => 'http://ikp.co.id/',
        'completed_at' => '2026-05-06',
        'is_featured' => true,
        'order' => 2,
    ],
    // 3
    [
        'title'      => 'Business Services Company Profile Website — Precizie',
        'category'   => 'laravel',
        'client'     => 'Precizie',
        'summary'    => 'Full company profile website for a business consultancy offering 8+ professional services — web development, SEO, logo design, ISO/SNI certification, business licensing (NIB, OSS, SIUP), lab testing, and management training.',
        'summary_id' => 'Website company profile lengkap untuk firma konsultan bisnis dengan 8+ layanan profesional — web development, SEO, desain logo, sertifikasi ISO/SNI, perizinan usaha (NIB, OSS, SIUP), uji lab, dan pelatihan manajemen.',
        'content'    => "Built a full company profile website for a business consultancy firm offering 8+ professional services — website development, SEO, logo design, ISO/SNI certification, business licensing (NIB, OSS, SIUP), lab testing, and management training. Features include a services directory, portfolio showcase, articles section, and a free consultation CTA. Includes a custom CMS for independent content management.\n\nKey features:\n- Services directory for 8+ professional services\n- Portfolio showcase & articles section\n- Free consultation CTA\n- Custom CMS for client-side content management\n- Responsive, SEO-friendly Tailwind UI",
        'content_id' => "Membangun website company profile lengkap untuk firma konsultan bisnis yang menyediakan 8+ layanan profesional — pengembangan website, SEO, desain logo, sertifikasi ISO/SNI, perizinan usaha (NIB, OSS, SIUP), uji laboratorium, dan pelatihan manajemen. Fitur meliputi direktori layanan, portfolio showcase, section artikel, serta CTA konsultasi gratis. Dilengkapi CMS custom untuk manajemen konten mandiri.\n\nFitur utama:\n- Direktori layanan untuk 8+ jasa profesional\n- Portfolio showcase & section artikel\n- CTA konsultasi gratis\n- CMS custom untuk manajemen konten oleh klien\n- UI Tailwind responsif dan SEO-friendly",
        'tech_stack' => ['Laravel', 'Custom CMS', 'MySQL', 'Tailwind CSS'],
        'live_url'   => 'http://precizie.co.id/',
        'completed_at' => '2026-05-06',
        'is_featured' => false,
        'order' => 3,
    ],
    // 4
    [
        'title'      => 'Food Delivery SaaS Platform — Multi-Role Web App (PesanApp)',
        'category'   => 'react',
        'client'     => 'Personal Project',
        'summary'    => 'Complete food delivery SaaS with 4 role-based apps: customer, merchant dashboard, driver app, and super admin console — all connected via a unified REST API.',
        'summary_id' => 'Platform SaaS food delivery lengkap dengan 4 aplikasi berbasis role: customer, dashboard merchant, aplikasi driver, dan super admin console — semuanya terhubung lewat REST API terpadu.',
        'content'    => "Built a complete food delivery platform with 4 separate role-based applications: customer app (browse merchants, search menu, promo banners, order placement), merchant dashboard (store status toggle, order management, menu management, revenue tracking), driver app, and super admin console (user management, product data, order monitoring, financial summary, commission tracking, refund management). Admin dashboard features live revenue trend charts and real-time order status breakdown. All apps connected via a unified REST API.\n\nKey features:\n- Customer app: merchant browse, menu search, promo banners, order placement\n- Merchant dashboard: store status toggle, order/menu management, revenue tracking\n- Driver app for delivery operations\n- Super admin: users, products, orders, financials, commissions, refunds\n- Live revenue trend charts & real-time order status\n- Unified REST API across all roles",
        'content_id' => "Membangun platform food delivery lengkap dengan 4 aplikasi berbasis role yang terpisah: customer app (jelajah merchant, pencarian menu, banner promo, penempatan order), dashboard merchant (toggle status toko, manajemen order, manajemen menu, pelacakan pendapatan), aplikasi driver, dan super admin console (manajemen user, data produk, monitoring order, ringkasan keuangan, tracking komisi, manajemen refund). Dashboard admin dilengkapi grafik tren pendapatan live dan breakdown status order real-time. Semua aplikasi terhubung lewat REST API terpadu.\n\nFitur utama:\n- Customer app: browse merchant, pencarian menu, banner promo, order placement\n- Dashboard merchant: toggle status toko, manajemen order/menu, pelacakan pendapatan\n- Driver app untuk operasi pengantaran\n- Super admin: user, produk, order, keuangan, komisi, refund\n- Grafik tren pendapatan & status order real-time\n- REST API terpadu lintas role",
        'tech_stack' => ['React.js', 'REST API', 'Tailwind CSS', 'Vercel'],
        'live_url'   => 'https://delivery-app-phi-rouge.vercel.app',
        'completed_at' => '2026-05-06',
        'is_featured' => true,
        'order' => 4,
    ],
    // 5
    [
        'title'      => 'Game Top-Up E-Commerce Platform — Reborn Store',
        'category'   => 'laravel',
        'client'     => 'Reborn Store',
        'summary'    => 'Game top-up e-commerce supporting Mobile Legends, Free Fire, PUBG, Genshin Impact, and Valorant — with catalog, transaction check, price list, top-up calculator, and admin panel.',
        'summary_id' => 'Platform e-commerce top-up game untuk Mobile Legends, Free Fire, PUBG, Genshin Impact, dan Valorant — dengan katalog, cek transaksi, daftar harga, kalkulator top-up, dan admin panel.',
        'content'    => "Built a game top-up e-commerce platform supporting multiple popular titles (Mobile Legends, Free Fire, PUBG, Genshin Impact, Valorant). Features include a game catalog with product listings, transaction check system, price list directory, a built-in calculator for top-up amounts, and WhatsApp integration for customer support. Includes an admin panel for managing products, transactions, and pricing.\n\nKey features:\n- Multi-game catalog (ML, FF, PUBG, Genshin, Valorant)\n- Transaction check system\n- Price list directory & top-up calculator\n- WhatsApp integration for customer support\n- Admin panel for products, transactions, and pricing",
        'content_id' => "Membangun platform e-commerce top-up game yang mendukung berbagai judul populer (Mobile Legends, Free Fire, PUBG, Genshin Impact, Valorant). Fitur meliputi katalog game dengan daftar produk, sistem cek transaksi, direktori daftar harga, kalkulator top-up bawaan, serta integrasi WhatsApp untuk customer support. Dilengkapi admin panel untuk mengelola produk, transaksi, dan harga.\n\nFitur utama:\n- Katalog multi-game (ML, FF, PUBG, Genshin, Valorant)\n- Sistem cek transaksi\n- Direktori daftar harga & kalkulator top-up\n- Integrasi WhatsApp untuk customer support\n- Admin panel untuk produk, transaksi, dan harga",
        'tech_stack' => ['Laravel', 'Nuxt.js', 'MySQL', 'Tailwind CSS', 'REST API'],
        'live_url'   => null,
        'completed_at' => '2026-05-06',
        'is_featured' => false,
        'order' => 5,
    ],
    // 6
    [
        'title'      => 'Industrial Solutions Company Profile Website — Futake Indonesia',
        'category'   => 'wordpress',
        'client'     => 'Futake Indonesia',
        'summary'    => 'Professional WordPress + Flatsome company profile and product catalog for an industrial solutions provider — responsive, WhatsApp-integrated, and SEO-friendly.',
        'summary_id' => 'Company profile dan katalog produk WordPress + Flatsome profesional untuk penyedia solusi industri — responsif, terintegrasi WhatsApp, dan SEO-friendly.',
        'content'    => "Developed a professional company profile and product catalog website for Futake Indonesia using WordPress and Flatsome Theme. The website features responsive design, dynamic homepage banners, product categories, search functionality, WhatsApp integration, and SEO-friendly structure. Built to showcase industrial products and services with a clean UI/UX while ensuring easy content management, mobile optimization, and scalable business presentation for better customer engagement and online visibility.\n\nKey features:\n- Dynamic homepage banners & responsive design\n- Product categories with search functionality\n- WhatsApp contact integration\n- SEO-friendly structure & mobile-optimized\n- Easy WordPress content management",
        'content_id' => "Mengembangkan website company profile dan katalog produk profesional untuk Futake Indonesia menggunakan WordPress dan tema Flatsome. Website dilengkapi desain responsif, banner homepage dinamis, kategori produk, fitur pencarian, integrasi WhatsApp, serta struktur SEO-friendly. Dibangun untuk menampilkan produk dan layanan industri dengan UI/UX yang bersih sambil memastikan kemudahan manajemen konten, optimasi mobile, dan presentasi bisnis yang skalabel guna meningkatkan engagement pelanggan dan visibilitas online.\n\nFitur utama:\n- Banner homepage dinamis & desain responsif\n- Kategori produk dengan fitur pencarian\n- Integrasi kontak WhatsApp\n- Struktur SEO-friendly & teroptimasi mobile\n- Manajemen konten WordPress yang mudah",
        'tech_stack' => ['WordPress', 'Flatsome', 'WooCommerce', 'MySQL', 'SEO'],
        'live_url'   => 'https://futake.co.id/',
        'completed_at' => '2026-05-09',
        'is_featured' => false,
        'order' => 6,
    ],
    // 7
    [
        'title'      => 'Infrastructure Metal Casting Company Profile — Futago Karya',
        'category'   => 'wordpress',
        'client'     => 'Futago Karya',
        'summary'    => 'Professional WordPress company profile for a street furniture & metal casting manufacturer — responsive design, product catalog, project gallery, and WhatsApp integration.',
        'summary_id' => 'Company profile WordPress profesional untuk produsen street furniture & metal casting — desain responsif, katalog produk, galeri proyek, dan integrasi WhatsApp.',
        'content'    => "Developed a professional company profile website for Futago Karya using WordPress with a responsive and modern design. The website was built to showcase the company's street furniture and metal casting products, including product catalogs, project galleries, company information, and customer contact integration. Features include responsive UI/UX, custom page layouts, product showcase sections, WhatsApp contact integration, SEO-friendly structure, and easy content management for business scalability and online brand presence.\n\nKey features:\n- Product catalog for street furniture & metal casting\n- Project gallery & company information pages\n- Custom page layouts and product showcase sections\n- WhatsApp contact integration\n- SEO-friendly structure for better visibility",
        'content_id' => "Mengembangkan website company profile profesional untuk Futago Karya menggunakan WordPress dengan desain modern dan responsif. Website dibangun untuk menampilkan produk street furniture dan metal casting perusahaan, termasuk katalog produk, galeri proyek, informasi perusahaan, dan integrasi kontak pelanggan. Fitur meliputi UI/UX responsif, layout halaman custom, section showcase produk, integrasi kontak WhatsApp, struktur SEO-friendly, serta manajemen konten yang mudah untuk skalabilitas bisnis dan kehadiran brand online.\n\nFitur utama:\n- Katalog produk street furniture & metal casting\n- Galeri proyek & halaman informasi perusahaan\n- Layout halaman custom dan section showcase produk\n- Integrasi kontak WhatsApp\n- Struktur SEO-friendly untuk visibilitas lebih baik",
        'tech_stack' => ['WordPress', 'Elementor', 'MySQL', 'SEO'],
        'live_url'   => 'https://futagotrotoar.co.id/',
        'completed_at' => '2026-05-09',
        'is_featured' => false,
        'order' => 7,
    ],
    // 8
    [
        'title'      => 'Metal Casting & Ornamental Manufacturing Website — Ayem Tentrem',
        'category'   => 'wordpress',
        'client'     => 'Ayem Tentrem Logam',
        'summary'    => 'Custom WordPress + Elementor company profile for a metal casting & ornamental manufacturer — interactive product showcases, gallery, and WhatsApp integration.',
        'summary_id' => 'Company profile WordPress + Elementor custom untuk produsen metal casting & ornamental — showcase produk interaktif, galeri, dan integrasi WhatsApp.',
        'content'    => "Developed a custom company profile website for Ayem Tentrem Logam using WordPress and Elementor with a modern and artistic design approach. The website was created to showcase metal casting products, street furniture, and decorative urban elements through an interactive and responsive user experience. Features include product showcases, gallery pages, company information, WhatsApp integration, responsive layouts, and an SEO-friendly structure to strengthen the company's online presence and branding.\n\nKey features:\n- Interactive product showcase\n- Dedicated gallery pages\n- WhatsApp contact integration\n- Responsive Elementor layouts\n- SEO-friendly structure",
        'content_id' => "Mengembangkan website company profile custom untuk Ayem Tentrem Logam menggunakan WordPress dan Elementor dengan pendekatan desain modern dan artistik. Website dibuat untuk menampilkan produk metal casting, street furniture, dan elemen dekoratif urban melalui pengalaman pengguna yang interaktif dan responsif. Fitur meliputi showcase produk, halaman galeri, informasi perusahaan, integrasi WhatsApp, layout responsif, serta struktur SEO-friendly untuk memperkuat kehadiran online dan branding perusahaan.\n\nFitur utama:\n- Showcase produk interaktif\n- Halaman galeri khusus\n- Integrasi kontak WhatsApp\n- Layout Elementor responsif\n- Struktur SEO-friendly",
        'tech_stack' => ['WordPress', 'Elementor', 'MySQL'],
        'live_url'   => 'https://ayemtentremlogam.co.id',
        'completed_at' => '2026-05-09',
        'is_featured' => false,
        'order' => 8,
    ],
    // 9
    [
        'title'      => 'Industrial Machinery Manufacturing Company Profile — Kembar Teknika',
        'category'   => 'wordpress',
        'client'     => 'Kembar Teknika',
        'summary'    => 'WordPress + Flatsome company profile and product catalog for an industrial & commercial machinery manufacturer — clean responsive UI with marketplace integration.',
        'summary_id' => 'Company profile dan katalog produk WordPress + Flatsome untuk produsen mesin industri & komersial — UI responsif yang bersih dengan integrasi marketplace.',
        'content'    => "Developed a professional company profile and product catalog website for Kembar Teknika using WordPress and Flatsome Theme. The website was designed to showcase industrial and commercial machinery products with a clean, responsive, and user-friendly interface. Features include dynamic product categories, detailed product specification pages, search functionality, marketplace integration, WhatsApp contact support, and an SEO-friendly structure to improve online visibility and customer engagement.\n\nKey features:\n- Dynamic product categories & specification pages\n- Search functionality\n- Marketplace integration\n- WhatsApp contact support\n- SEO-friendly structure",
        'content_id' => "Mengembangkan website company profile dan katalog produk profesional untuk Kembar Teknika menggunakan WordPress dan tema Flatsome. Website dirancang untuk menampilkan produk mesin industri dan komersial dengan antarmuka yang bersih, responsif, dan user-friendly. Fitur meliputi kategori produk dinamis, halaman spesifikasi produk yang detail, fitur pencarian, integrasi marketplace, dukungan kontak WhatsApp, serta struktur SEO-friendly untuk meningkatkan visibilitas online dan engagement pelanggan.\n\nFitur utama:\n- Kategori produk dinamis & halaman spesifikasi\n- Fitur pencarian\n- Integrasi marketplace\n- Dukungan kontak WhatsApp\n- Struktur SEO-friendly",
        'tech_stack' => ['WordPress', 'Flatsome', 'MySQL'],
        'live_url'   => 'https://kembarteknika.co.id',
        'completed_at' => '2026-05-09',
        'is_featured' => false,
        'order' => 9,
    ],
    // 10
    [
        'title'      => 'Technical Supply Company Profile Website — TVILING',
        'category'   => 'wordpress',
        'client'     => 'TVILING',
        'summary'    => 'WordPress + Flatsome company profile and product showcase for a technical materials & construction supply business — modern responsive UI with category-based navigation.',
        'summary_id' => 'Company profile dan showcase produk WordPress + Flatsome untuk bisnis material teknis & konstruksi — UI responsif modern dengan navigasi berbasis kategori.',
        'content'    => "Developed a professional company profile and product showcase website for Tviling using WordPress and Flatsome Theme. The website was designed to present technical materials and construction supply products with a modern, responsive, and easy-to-navigate interface. Features include product search functionality, category-based navigation, responsive UI/UX, contact integration, and an SEO-friendly structure to improve customer engagement, brand credibility, and online business visibility.\n\nKey features:\n- Product search & category-based navigation\n- Responsive Flatsome UI/UX\n- Contact form integration\n- SEO-friendly structure",
        'content_id' => "Mengembangkan website company profile dan showcase produk profesional untuk Tviling menggunakan WordPress dan tema Flatsome. Website dirancang untuk menampilkan material teknis dan produk supply konstruksi dengan antarmuka modern, responsif, dan mudah dinavigasi. Fitur meliputi fitur pencarian produk, navigasi berbasis kategori, UI/UX responsif, integrasi kontak, serta struktur SEO-friendly untuk meningkatkan engagement pelanggan, kredibilitas brand, dan visibilitas bisnis online.\n\nFitur utama:\n- Pencarian produk & navigasi berbasis kategori\n- UI/UX Flatsome responsif\n- Integrasi form kontak\n- Struktur SEO-friendly",
        'tech_stack' => ['WordPress', 'Flatsome', 'MySQL'],
        'live_url'   => 'https://tviling.co.id',
        'completed_at' => '2026-05-09',
        'is_featured' => false,
        'order' => 10,
    ],
    // 11
    [
        'title'      => 'Aquaculture Cooperative Company Profile Website — Solusi3M',
        'category'   => 'wordpress',
        'client'     => 'Solusi3M',
        'summary'    => 'Modern WordPress + Elementor company profile for an aquaculture cooperative — interactive landing pages, product showcase, and download integration.',
        'summary_id' => 'Company profile WordPress + Elementor modern untuk koperasi akuakultur — landing page interaktif, showcase produk, dan integrasi download.',
        'content'    => "Developed a modern company profile website for Solusi3M using WordPress and Elementor. The website was designed to showcase technology and business solutions for the aquaculture industry through a clean, responsive, and professional interface. Features include interactive landing pages, product and service showcases, responsive UI/UX, download integration, mobile optimization, and SEO-friendly structure to strengthen online branding and improve customer engagement.\n\nKey features:\n- Interactive Elementor landing pages\n- Product & service showcase\n- Download integration\n- Mobile-optimized responsive UI/UX\n- SEO-friendly structure",
        'content_id' => "Mengembangkan website company profile modern untuk Solusi3M menggunakan WordPress dan Elementor. Website dirancang untuk menampilkan teknologi dan solusi bisnis bagi industri akuakultur melalui antarmuka yang bersih, responsif, dan profesional. Fitur meliputi landing page interaktif, showcase produk dan layanan, UI/UX responsif, integrasi download, optimasi mobile, dan struktur SEO-friendly untuk memperkuat branding online dan meningkatkan engagement pelanggan.\n\nFitur utama:\n- Landing page Elementor interaktif\n- Showcase produk & layanan\n- Integrasi download\n- UI/UX responsif teroptimasi mobile\n- Struktur SEO-friendly",
        'tech_stack' => ['WordPress', 'Elementor', 'MySQL'],
        'live_url'   => 'http://solusi3m.com/',
        'completed_at' => '2026-05-09',
        'is_featured' => false,
        'order' => 11,
    ],
    // 12
    [
        'title'      => 'Civil & Mining Services Company Profile Website — CAS',
        'category'   => 'wordpress',
        'client'     => 'PT. Cipta Abirama Sinergi',
        'summary'    => 'Professional WordPress + Elementor company profile for a civil & mining engineering firm — multilingual, corporate-focused, with service presentation pages.',
        'summary_id' => 'Company profile WordPress + Elementor profesional untuk firma engineering sipil & tambang — multilingual, fokus korporat, dengan halaman presentasi layanan.',
        'content'    => "Developed a professional company profile website for PT. Cipta Abirama Sinergi using WordPress and Elementor. The website was designed to showcase the company's engineering, surveying, and technical services with a modern, responsive, and corporate-focused interface. Features include multilingual support, responsive UI/UX, service presentation pages, contact integration, and an SEO-friendly structure to enhance online visibility, credibility, and customer engagement across desktop and mobile devices.\n\nKey features:\n- Multilingual support\n- Service presentation pages (engineering, surveying, technical)\n- Corporate-focused responsive UI/UX\n- Contact integration\n- SEO-friendly structure",
        'content_id' => "Mengembangkan website company profile profesional untuk PT. Cipta Abirama Sinergi menggunakan WordPress dan Elementor. Website dirancang untuk menampilkan layanan engineering, surveying, dan teknis perusahaan dengan antarmuka modern, responsif, dan fokus korporat. Fitur meliputi dukungan multilingual, UI/UX responsif, halaman presentasi layanan, integrasi kontak, dan struktur SEO-friendly untuk meningkatkan visibilitas online, kredibilitas, dan engagement pelanggan di desktop maupun mobile.\n\nFitur utama:\n- Dukungan multilingual\n- Halaman presentasi layanan (engineering, surveying, teknis)\n- UI/UX responsif fokus korporat\n- Integrasi kontak\n- Struktur SEO-friendly",
        'tech_stack' => ['WordPress', 'Elementor', 'MySQL'],
        'live_url'   => 'https://ciptaabiramasinergi.com',
        'completed_at' => '2026-05-09',
        'is_featured' => false,
        'order' => 12,
    ],
    // 13
    [
        'title'      => 'CNC Router & Laser Cutting Company Profile — Indorouterlaser',
        'category'   => 'wordpress',
        'client'     => 'Indorouterlaser.id',
        'summary'    => 'WordPress + WPBakery company profile for a CNC router & laser engraving service — service showcases, portfolio gallery, and SEO-friendly structure.',
        'summary_id' => 'Company profile WordPress + WPBakery untuk layanan CNC router & laser engraving — showcase layanan, galeri portfolio, dan struktur SEO-friendly.',
        'content'    => "Developed a professional company profile website for Indorouterlaser.id using WordPress and WPBakery. The website was designed to showcase CNC Router and Laser Engraving services with a modern, responsive, and industry-focused interface. Features include service showcase sections, portfolio/gallery pages, responsive UI/UX, contact integration, and an SEO-friendly structure to improve online branding, customer engagement, and business credibility across desktop and mobile devices.\n\nKey features:\n- Service showcase sections\n- Portfolio/gallery pages\n- Responsive industry-focused UI/UX\n- Contact integration\n- SEO-friendly WPBakery layout",
        'content_id' => "Mengembangkan website company profile profesional untuk Indorouterlaser.id menggunakan WordPress dan WPBakery. Website dirancang untuk menampilkan layanan CNC Router dan Laser Engraving dengan antarmuka modern, responsif, dan fokus industri. Fitur meliputi section showcase layanan, halaman portfolio/galeri, UI/UX responsif, integrasi kontak, serta struktur SEO-friendly untuk meningkatkan branding online, engagement pelanggan, dan kredibilitas bisnis di desktop maupun mobile.\n\nFitur utama:\n- Section showcase layanan\n- Halaman portfolio/galeri\n- UI/UX responsif fokus industri\n- Integrasi kontak\n- Layout WPBakery SEO-friendly",
        'tech_stack' => ['WordPress', 'WPBakery', 'MySQL'],
        'live_url'   => 'http://indorouterlaser.id/',
        'completed_at' => '2026-05-09',
        'is_featured' => false,
        'order' => 13,
    ],
    // 14
    [
        'title'      => 'Aluminium Fabrication Company Profile Website — MKS',
        'category'   => 'wordpress',
        'client'     => 'PT. Mitra Karunia Sejahtera',
        'summary'    => 'WordPress + Elementor company profile for an aluminium, glass, and interior design fabricator — modern corporate layout with project showcase.',
        'summary_id' => 'Company profile WordPress + Elementor untuk fabrikator aluminium, kaca, dan desain interior — layout korporat modern dengan showcase proyek.',
        'content'    => "Developed a professional company profile website for PT. Mitra Karunia Sejahtera (ptmks.co.id) using WordPress and Elementor. The website was designed with a modern corporate layout to showcase company services, project portfolios, and business credibility through a responsive and user-friendly interface. Features include responsive UI/UX, service presentation pages, project showcase sections, contact integration, and an SEO-friendly structure to improve online presence, customer trust, and business engagement.\n\nKey features:\n- Modern corporate Elementor layout\n- Service presentation pages\n- Project showcase sections\n- Contact integration\n- SEO-friendly responsive structure",
        'content_id' => "Mengembangkan website company profile profesional untuk PT. Mitra Karunia Sejahtera (ptmks.co.id) menggunakan WordPress dan Elementor. Website dirancang dengan layout korporat modern untuk menampilkan layanan perusahaan, portfolio proyek, dan kredibilitas bisnis melalui antarmuka yang responsif dan user-friendly. Fitur meliputi UI/UX responsif, halaman presentasi layanan, section showcase proyek, integrasi kontak, dan struktur SEO-friendly untuk meningkatkan kehadiran online, kepercayaan pelanggan, dan engagement bisnis.\n\nFitur utama:\n- Layout Elementor korporat modern\n- Halaman presentasi layanan\n- Section showcase proyek\n- Integrasi kontak\n- Struktur responsif SEO-friendly",
        'tech_stack' => ['WordPress', 'Elementor', 'MySQL'],
        'live_url'   => 'https://ptmks.co.id',
        'completed_at' => '2026-05-09',
        'is_featured' => false,
        'order' => 14,
    ],
    // 15
    [
        'title'      => 'Hajj & Umrah Travel Company Profile Website — Fista Tour Jogja',
        'category'   => 'wordpress',
        'client'     => 'Fista Tour Jogja',
        'summary'    => 'Elegant WordPress + Elementor company profile for a Hajj & Umrah travel service — travel packages, news updates, and consultation services.',
        'summary_id' => 'Company profile WordPress + Elementor elegan untuk layanan travel Haji & Umrah — paket perjalanan, update berita, dan layanan konsultasi.',
        'content'    => "Developed a professional company profile website for a Hajj & Umrah travel service using WordPress and Elementor. The website was designed with an elegant and responsive interface to showcase travel packages, company information, news updates, and customer consultation services. Features include responsive UI/UX, service landing pages, contact and WhatsApp integration, SEO-friendly structure, and modern visual presentation to strengthen brand credibility and improve customer engagement.\n\nKey features:\n- Travel package showcases\n- News & updates section\n- Service landing pages\n- WhatsApp & contact integration\n- SEO-friendly elegant Elementor design",
        'content_id' => "Mengembangkan website company profile profesional untuk layanan travel Haji & Umrah menggunakan WordPress dan Elementor. Website dirancang dengan antarmuka yang elegan dan responsif untuk menampilkan paket perjalanan, informasi perusahaan, update berita, dan layanan konsultasi pelanggan. Fitur meliputi UI/UX responsif, landing page layanan, integrasi kontak dan WhatsApp, struktur SEO-friendly, serta presentasi visual modern untuk memperkuat kredibilitas brand dan meningkatkan engagement pelanggan.\n\nFitur utama:\n- Showcase paket perjalanan\n- Section berita & update\n- Landing page layanan\n- Integrasi WhatsApp & kontak\n- Desain Elementor elegan SEO-friendly",
        'tech_stack' => ['WordPress', 'Elementor', 'MySQL'],
        'live_url'   => 'https://fistatourjogja.co.id',
        'completed_at' => '2026-05-09',
        'is_featured' => false,
        'order' => 15,
    ],
    // 16
    [
        'title'      => 'Terrazzo Interior & Architecture Website — Terrazzo.co.id',
        'category'   => 'wordpress',
        'client'     => 'Terrazzo.co.id',
        'summary'    => 'Modern WordPress + Elementor company profile and product showcase for a terrazzo product business — clean, elegant interface with consultation CTA.',
        'summary_id' => 'Company profile dan showcase produk WordPress + Elementor modern untuk bisnis produk terrazzo — antarmuka bersih dan elegan dengan CTA konsultasi.',
        'content'    => "Developed a modern company profile and product showcase website for a terrazzo product business using WordPress and Elementor. The website was designed with a clean and elegant interface to highlight terrazzo products, interior design solutions, project showcases, and company information. Features include responsive UI/UX, product presentation pages, consultation call-to-action sections, an SEO-friendly structure, and mobile optimization to strengthen brand identity and improve customer engagement.\n\nKey features:\n- Terrazzo product showcase pages\n- Interior design solution highlights\n- Project showcase\n- Consultation CTA sections\n- Mobile-optimized SEO-friendly Elementor design",
        'content_id' => "Mengembangkan website company profile dan showcase produk modern untuk bisnis produk terrazzo menggunakan WordPress dan Elementor. Website dirancang dengan antarmuka yang bersih dan elegan untuk menonjolkan produk terrazzo, solusi desain interior, showcase proyek, dan informasi perusahaan. Fitur meliputi UI/UX responsif, halaman presentasi produk, section call-to-action konsultasi, struktur SEO-friendly, dan optimasi mobile untuk memperkuat identitas brand dan meningkatkan engagement pelanggan.\n\nFitur utama:\n- Halaman showcase produk terrazzo\n- Highlight solusi desain interior\n- Showcase proyek\n- Section CTA konsultasi\n- Desain Elementor SEO-friendly teroptimasi mobile",
        'tech_stack' => ['WordPress', 'Elementor', 'MySQL'],
        'live_url'   => 'https://terrazzo.co.id',
        'completed_at' => '2026-05-09',
        'is_featured' => false,
        'order' => 16,
    ],
    // 17
    [
        'title'      => 'Premium Fitness & Gym Website — Infinity Gym & Club',
        'category'   => 'vue',
        'client'     => 'Infinity Gym & Club',
        'summary'    => 'Modern Vue 3 + Tailwind + Vite mobile-first GYM membership and management web app — package selection, digital cards, checkout, QR code, and attendance.',
        'summary_id' => 'Aplikasi web membership dan manajemen GYM mobile-first dengan Vue 3 + Tailwind + Vite — pemilihan paket, kartu digital, checkout, QR code, dan absensi.',
        'content'    => "Developed a modern GYM membership and management web application with a responsive mobile-first interface using Vue JS, Tailwind CSS, and Vite. The system includes membership package selection, digital membership cards, checkout and payment pages, QR code integration, attendance features, and service management modules. Designed with clean UI/UX and optimized performance to provide a seamless user experience for gym members across mobile devices.\n\nKey features:\n- Membership package selection\n- Digital membership cards\n- Checkout & payment pages\n- QR code integration\n- Attendance & service management modules\n- Mobile-first responsive design",
        'content_id' => "Mengembangkan aplikasi web membership dan manajemen GYM modern dengan antarmuka responsif mobile-first menggunakan Vue JS, Tailwind CSS, dan Vite. Sistem mencakup pemilihan paket membership, kartu membership digital, halaman checkout dan pembayaran, integrasi QR code, fitur absensi, serta modul manajemen layanan. Dirancang dengan UI/UX yang bersih dan performa yang teroptimasi untuk memberikan pengalaman pengguna yang mulus bagi member gym di perangkat mobile.\n\nFitur utama:\n- Pemilihan paket membership\n- Kartu membership digital\n- Halaman checkout & pembayaran\n- Integrasi QR code\n- Modul absensi & manajemen layanan\n- Desain responsif mobile-first",
        'tech_stack' => ['Vue.js', 'Tailwind CSS', 'Vite'],
        'live_url'   => 'https://member.infinityjogja.com',
        'completed_at' => '2026-05-10',
        'is_featured' => true,
        'order' => 17,
    ],
];

// 1) WIPE existing projects
$existing = Project::query()->count();
echo "Deleting {$existing} existing projects...\n";
Project::query()->delete();

// 2) INSERT all 17 in order
foreach ($projects as $p) {
    $p['slug'] = Str::slug($p['title']) . '-' . Str::random(6);
    $p['is_active'] = true;
    Project::create($p);
    echo "  + {$p['title']}\n";
}

echo "\nDone. Inserted " . count($projects) . " projects.\n";

<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" class="dark">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="theme-color" content="#0a0a10">
    <meta name="description"
        content="Ferhat Muhamad Yasin — Front End Web Developer, WordPress Developer, Odoo Developer & IT Leader. Building premium, high-performance web experiences.">

    <title inertia>{{ config('app.name', 'Laravel') }}</title>

    <link rel="icon" type="image/svg+xml" href="/favicon.svg">

    <!-- Preconnect to font origins so fonts download in parallel with JS -->
    <link rel="preconnect" href="https://fonts.googleapis.com" crossorigin>
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link rel="preconnect" href="https://api.fontshare.com" crossorigin>
    <link rel="preconnect" href="https://cdn.fontshare.com" crossorigin>
    <link
        rel="preload"
        as="style"
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;600&display=swap">
    <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;600&display=swap"
        media="print" onload="this.media='all'">
    <link
        rel="stylesheet"
        href="https://api.fontshare.com/v2/css?f[]=clash-display@500,600,700&display=swap"
        media="print" onload="this.media='all'">

    <!-- Scripts -->
    @routes
    @viteReactRefresh
    @vite(['resources/js/app.tsx', "resources/js/Pages/{$page['component']}.tsx"])
    @inertiaHead
</head>

<body class="font-sans antialiased bg-ink-900 text-ink-100">
    @inertia
    <noscript>
        <div style="padding:24px;color:#f1f1f5;background:#0a0a10;font-family:sans-serif;text-align:center">
            JavaScript dinonaktifkan atau browser Anda tidak didukung. Silakan
            gunakan browser modern (Chrome / Safari versi terbaru) untuk membuka
            situs ini.
        </div>
    </noscript>
</body>

</html>

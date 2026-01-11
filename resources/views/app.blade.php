<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" data-appearance="{{ $appearance ?? 'system' }}"
    @class(['dark'=> ($appearance ?? 'system') == 'dark'])>

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title inertia>{{ config('app.name', 'Asmin - Creative Developer') }}</title>
    <meta name="description" content="Portfolio of Asmin, a Creative Developer specializing in building exceptional digital experiences.">
    <meta name="keywords" content="Asmin, Creative Developer, Web Developer, Portfolio, Laravel, React, Inertia.js">
    <meta name="author" content="Asmin">

    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website">
    <meta property="og:url" content="{{ url()->current() }}">
    <meta property="og:title" content="Asmin - Creative Developer">
    <meta property="og:description" content="Portfolio of Asmin, a Creative Developer specializing in building exceptional digital experiences.">
    <meta property="og:image" content="{{ asset('og-image.jpg') }}">

    <!-- Twitter -->
    <meta property="twitter:card" content="summary_large_image">
    <meta property="twitter:url" content="{{ url()->current() }}">
    <meta property="twitter:title" content="Asmin - Creative Developer">
    <meta property="twitter:description" content="Portfolio of Asmin, a Creative Developer specializing in building exceptional digital experiences.">
    <meta property="twitter:image" content="{{ asset('og-image.jpg') }}">


    <link rel="icon" href="/favicon.svg" type="image/svg+xml">
    <link rel="apple-touch-icon" href="/apple-touch-icon.png">

    <link rel="preconnect" href="https://fonts.bunny.net">
    <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />

    <script>
        (() => {
            const systemDark = window.matchMedia('(prefers-color-scheme: dark)')

            const apply = () => {
                const stored = localStorage.getItem('appearance') ?? document.documentElement.dataset.appearance ?? 'system'
                const isDark = stored === 'dark' || (stored === 'system' && systemDark.matches)
                document.documentElement.classList.toggle('dark', isDark)
            }

            apply()
            systemDark.addEventListener('change', apply)
        })()
    </script>

    @routes
    @viteReactRefresh
    @vite(['resources/js/app.tsx', "resources/js/pages/{$page['component']}.tsx"])
    @inertiaHead
</head>

<body class="font-sans antialiased">
    @inertia
</body>

</html>

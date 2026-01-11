# Asmin - Creative Developer Portfolio

> **A high-performance, visually stunning portfolio built with Laravel 12, React 19, and Inertia.js 2.0.**

[![Laravel](https://img.shields.io/badge/Laravel-12.x-FF2D20?style=flat&logo=laravel)](https://laravel.com)
[![React](https://img.shields.io/badge/React-19.x-61DAFB?style=flat&logo=react)](https://reactjs.org)
[![Inertia](https://img.shields.io/badge/Inertia.js-2.0-9553E9?style=flat)](https://inertiajs.com)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.0-38B2AC?style=flat&logo=tailwind-css)](https://tailwindcss.com)
[![Framer Motion](https://img.shields.io/badge/Motion-12.x-0055FF?style=flat&logo=framer)](https://www.framer.com/motion/)

---

## 🚀 Overview

This project is a modern portfolio website designed to showcase creative work with a premium, engaging user experience. It leverages the power of **Laravel 12** for a robust backend and **Inertia.js** with **React 19** for a seamless, single-page application (SPA) frontend.

The UI is built with **Shadcn UI** and **Tailwind CSS 4**, featuring glassmorphism effects, smooth transitions, and a "mind-blowing" mobile navigation system.

## ✨ Key Features

- **Dynamic Dock Navigation**: A revolutionary mobile navigation experience that morphs from a compact pill to a full bottom dock using `framer-motion` layout animations.
- **Premium Aesthetics**: Deep dark mode, subtle gradients, noise textures, and glass-like components.
- **Smooth Animations**: Scroll-driven animations, blur-in text effects, and spring physics interactions.
- **Localization**: Content tailored for Indonesian audiences (Beranda, Keahlian, Proyek).
- **Admin Dashboard**: A secure, integrated admin panel to manage projects, skills, and testimonials.
- **Headless Auth**: Powered by Laravel Fortify for secure, customizable authentication.
- **SEO Optimized**: Comprehensive meta tags and Open Graph support for social sharing.

## 🛠 Tech Stack

- **Backend**: Laravel 12, MySQL
- **Frontend**: React 19, Inertia.js 2.0, TypeScript
- **Styling**: Tailwind CSS 4, Shadcn UI, Class Variance Authority
- **Animation**: Motion (Framer Motion 12)
- **Icons**: Lucide React
- **Routing**: Ziggy

## 📦 Installation

1.  **Clone the repository**

    ```bash
    git clone https://github.com/your-username/portfolio-laravel.git
    cd portfolio-laravel
    ```

2.  **Install PHP dependencies**

    ```bash
    composer install
    ```

3.  **Install Node.js dependencies**

    ```bash
    npm install
    ```

4.  **Environment Setup**

    ```bash
    cp .env.example .env
    php artisan key:generate
    ```

5.  **Database Setup** (Ensure MySQL is running)

    ```bash
    php artisan migrate --seed
    ```

6.  **Run Development Server**

    ```bash
    npm run dev
    ```

    In a separate terminal:

    ```bash
    php artisan serve
    ```

## 🎨 UI Design Philosophy

- **Glassmorphism**: Using `backdrop-blur` and semi-transparent backgrounds to create depth.
- **Typography**: Clean, sans-serif fonts (`Instrument Sans`) with massive headers for impact.
- **Motion**: Meaningful animations that guide the user's attention without being distracting.
- **Contrast**: High contrast ratios in dark mode for readability and visual pop.

## 📄 License

This project is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).

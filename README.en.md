# AperturePrism Official Website

**Version**: V1.2.0

[English](./README.en.md) | [简体中文](./README.md)

This is a modern official website for AperturePrism, built with [Next.js](https://nextjs.org) 15, featuring an **Apple-Class Design Style** to showcase the team's innovation and design philosophy.

## 📅 Changelog

### V1.3.0 (Current)
- 📰 **Blog System**: Added `/blog` list and details pages with category filtering, reading progress bar, and sidebar.
- 🚀 **Project Details**: Brand new project details page featuring stats dashboard, gallery, and key features list.
- 🎨 **UI Components**: Added Shadcn UI style Button component, optimized 404 page visual.
- 🐛 **Fix**: Resolved runtime errors with dynamic route params unpacking in Next.js 15+.
- 🔧 **Engineering**: Upgraded `package.json` version, updated documentation guide.

### V1.2.0
- 🚀 **Team Page Refactor**: Added "Affiliated Teams" and "Co-creation Teams" sections with rich media cards.
- ✨ **Co-creation Plan**: Added Co-creation Plan banner to invite partners.
- 🆕 **New Page**: Created `/services` page to showcase core business areas.
- 🔗 **Navbar Update**: Added "Friend Links" entry and brand Logo.
- 🐛 **Fix**: Resolved issue where Footer "Services" link was broken.
- 🎨 **UI Improvements**: Optimized card image display (Contain mode) and enlarged external link buttons.
- 🔧 **Config Update**: Added `furcraft.top` to image domain whitelist.
- 📝 **Docs Update**: Added "Content & Layout Modification Guide".

### V1.1.2
- ✨ **Friend Links Page**: Added `/friends` page.
- 🌍 **Friends i18n**: Bilingual support for friend links.
- 🔧 **Footer Update**: Added Friend Links entry.

### V1.0.0
- 🎉 **Initial Release**: Official launch of AperturePrism website.
- ⚛️ **Core Architecture**: Built with Next.js 15 App Router and Server Components.
- 🎨 **Design Language**: Established Apple-Class minimalist style with glassmorphism and smooth animations.
- 🌍 **Internationalization**: Full support for Chinese/English (i18n) switching.
- 📱 **Responsive**: Fully adapted for desktop and mobile devices.
- 📧 **Features**: Integrated contact form with SMTP email sending capability.

## ✨ Features

- **Internationalization (i18n)**: Supports Simplified Chinese (zh) and English (en), with Chinese as the default language.
- **Apple Design Style**: Minimalism, glassmorphism effects, and smooth animations.
- **Responsive Design**: Perfectly adapted for both desktop and mobile devices, including mobile hamburger menu.
- **Dark Mode**: Automatically follows system settings or manual toggle.
- **Contact Form**: Integrated email sending functionality via SMTP (e.g., Feishu, Gmail).
- **Careers Page**: Dedicated section for job listings and application process.
- **Legal Pages**: Complete Privacy Policy and Terms of Service pages.
- **High Performance**: Built on Next.js App Router and Server Components.
- **Docker Deployment**: Production-optimized Docker image provided.

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Animation**: Framer Motion
- **Internationalization**: next-intl
- **Email**: Nodemailer
- **Icons**: Lucide React, React Icons

## 📝 Content & Layout Modification Guide

Since this project uses **Internationalization (i18n)**, modifications are split into two parts: **Text Content** and **Page Structure**.

### 1. Modifying Text Content (Most Common)
If you just want to change text (e.g., change "About Us" to "Who We Are", or update descriptions), modify the JSON files in the `messages` folder:

*   **Chinese Content**: Edit `messages/zh.json`
*   **English Content**: Edit `messages/en.json`

### 2. Modifying Page Structure/Layout
If you want to add new modules, change layout, or add images, you need to modify the corresponding page code files (`src/app/[locale]/...`):

| Page Name | File Path | Modification Notes |
| :--- | :--- | :--- |
| **About** | `src/app/[locale]/about/page.tsx` | Modify About page layout |
| **Team** | `src/app/[locale]/team/page.tsx` | Modify member names, add sub-teams/co-creation sections |
| **Projects** | `src/app/[locale]/projects/page.tsx` | Change project images, adjust card layout |
| **Project Details** | `src/app/[locale]/projects/[slug]/page.tsx` | Modify details layout, **stats logic**, gallery |
| **Friends** | `src/app/[locale]/friends/page.tsx` | Change logos, adjust link display |
| **Blog List** | `src/app/[locale]/blog/page.tsx` | Modify list layout, filter logic |
| **Blog Post** | `src/app/[locale]/blog/[slug]/page.tsx` | Modify article layout, **sidebar**, progress bar |
| **Contact** | `src/app/[locale]/contact/page.tsx` | Modify contact form, social links |
| **Careers** | `src/app/[locale]/careers/page.tsx` | Modify job listing structure |

### 3. Modifying Images
*   **Team Member Avatars**: Place in `public/images/team/` directory.
*   **Project Covers**: Place in `public/images/projects/` directory.
*   **Logos/Icons**: Place in `public/` root directory.

### 4. Social Media Links
Modify the `socialLinks` array in `src/app/[locale]/contact/page.tsx`, replacing `href` with your actual links.

## 🚀 Getting Started

First, install dependencies:

```bash
npm install
```

Configure environment variables (optional, for email functionality):

```bash
cp .env.local.example .env.local
# Edit .env.local to fill in SMTP details
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📂 Project Structure

```
src/
├── app/
│   └── [locale]/       # Internationalized route pages
│       ├── about/      # About page
│       ├── careers/    # Careers page
│       ├── contact/    # Contact page
│       ├── friends/    # Friend Links
│       ├── privacy/    # Privacy Policy
│       ├── projects/   # Projects page
│       ├── team/       # Team page
│       ├── terms/      # Terms of Service
│       ├── page.tsx    # Home page
│       └── layout.tsx  # Root layout
├── components/         # React components
│   ├── ui/             # Reusable UI components (Card, Section, etc.)
│   ├── Navbar.tsx      # Navigation bar
│   ├── Footer.tsx      # Footer
│   ├── ContactForm.tsx # Contact form
│   └── ...
├── i18n/               # i18n configuration
├── messages/           # Translation files (zh.json, en.json)
└── lib/                # Utility functions
```

## 🌍 Internationalization (i18n)

This project uses `next-intl` for internationalization management.
- Translation files are located in `messages/zh.json` (Chinese) and `messages/en.json` (English).
- Route structure is `/[locale]/path`, e.g., `/zh/about` or `/en/about`.
- Default language configuration is in `src/i18n/request.ts`.

## 📧 Email Configuration

This project uses `nodemailer` to send emails. You need to configure an SMTP service (e.g., Feishu Enterprise Mail, Gmail).
See `.env.local.example` for detailed configuration.

## 🐳 Docker Deployment

1. **Build the image**:
   ```bash
   docker build -t aprism-website .
   ```

2. **Run the container**:
   ```bash
   docker run -p 3000:3000 aprism-website
   ```

## 📄 License

[MIT](LICENSE)

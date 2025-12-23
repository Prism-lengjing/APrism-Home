# AperturePrism Official Website

**Version**: V1.1.2

[English](./README.en.md) | [简体中文](./README.md)

This is a modern official website for AperturePrism, built with [Next.js](https://nextjs.org) 15, featuring an **Apple-Class Design Style** to showcase the team's innovation and design philosophy.

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

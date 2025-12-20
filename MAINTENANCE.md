# Maintenance Guide for AperturePrism Website

This guide provides instructions for maintaining, updating, and deploying the AperturePrism official website.

## 🛠️ Development Environment

### Prerequisites
- Node.js 18+
- npm 9+
- Git

### Quick Start
```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

## 📦 Project Structure

```
src/
├── app/                # App Router pages and layouts
│   ├── about/          # About page
│   ├── contact/        # Contact page
│   ├── projects/       # Projects page
│   ├── team/           # Team page
│   ├── globals.css     # Global styles (Tailwind + Apple Design System)
│   └── layout.tsx      # Root layout
├── components/         # React components
│   ├── ui/             # Reusable UI components (Card, Section, etc.)
│   ├── Navbar.tsx      # Navigation bar
│   ├── Footer.tsx      # Footer
│   ├── Hero.tsx        # Hero section
│   └── ScrollReveal.tsx # Animation wrapper
└── lib/                # Utilities (cn helper)
```

## 🎨 Design System

The project follows the **Apple-Class Design System** defined in `globals.css`.

- **Colors**: Uses CSS variables for theming (light/dark mode).
  - `--background`, `--foreground`: Main colors
  - `--accent`: Apple Blue (`#007AFF`)
  - `--muted`: Subtle gray backgrounds
- **Typography**: Uses `clamp()` for responsive font sizes.
  - `.text-apple-display`: Large headings
  - `.text-apple-body`: Body text
- **Glassmorphism**: 
  - `.glass`: Basic glass effect
  - `.glass-card`: Card style
  - `.glass-button`: Button style

## 🚀 Deployment

### Vercel (Recommended)
Connect your GitHub repository to Vercel. It will automatically detect the Next.js project and deploy it.

### Docker
1. **Build the image**:
   ```bash
   docker build -t aprism-website .
   ```

2. **Run the container**:
   ```bash
   docker run -p 3000:3000 aprism-website
   ```

## 📝 Common Tasks

### Adding a New Project
1. Open `src/app/projects/page.tsx`.
2. Add a new object to the `projects` array with `title`, `category`, and `description`.

### Adding a Team Member
1. Open `src/app/team/page.tsx`.
2. Add a new object to the `teamMembers` array.

### Updating SEO
1. Open `src/app/layout.tsx`.
2. Update the `metadata` object with new titles, descriptions, or Open Graph images.

## 🔄 Updates
- Keep dependencies updated: `npm update`
- Check for Next.js updates: `npx next@latest`

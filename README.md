# dogmai-website

![License: MIT](https://img.shields.io/badge/license-MIT-green) ![Next.js](https://img.shields.io/badge/Next.js-16-black) ![React](https://img.shields.io/badge/React-19-61dafb) ![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6) ![Tailwind](https://img.shields.io/badge/Tailwind-4-38bdf8)

The official marketing and content website for dogm.ai — a Philippines-based coding bootcamp. Built with Next.js, it covers program pages, curriculum, enrollment, blog, events, and internally generated marketing assets (PDFs, presentations, LinkedIn content, OG images).

## Overview

dogmai-website serves as the public-facing home for dogm.ai's bootcamp programs. It includes multi-language support, animated video compositions (Remotion), and a suite of content generation tools used by the team.

## Programs

- **Praxis** — Flagship developer bootcamp
- **Initium** — Beginner/intro program
- **Ascenda** — Advanced/executive track
- **Elevare** — Specialized program

## Pages & Features

- Program landing pages (with i18n: English, and other locales)
- Enrollment and application forms
- Curriculum and syllabus pages
- Blog and career resources
- Events and info sessions
- Team and about pages
- Privacy policy, refund policy, and terms

## Content Generation Tools (Internal)

| Tool | Description |
|---|---|
| `/linkedin-generator` | Generate LinkedIn post content |
| `/og-generator` | Open Graph image generator |
| `/logo-generator` | Logo asset generator |
| `/pdf-brochure` | Downloadable PDF brochures |
| `/presentations` | Curriculum slide presentations |
| Remotion compositions | Animated video content for social media |

## Tech Stack

| Category | Technology |
|---|---|
| Framework | Next.js (App Router), React, TypeScript |
| Styling | Tailwind CSS |
| Video | Remotion |
| PDF | React-PDF |
| i18n | Custom per-program language context |
| Email | Nodemailer, React Email |
| Slides | PptxGenJS |
| Deployment | Vercel |

## Getting Started

### Prerequisites

- Node.js 20+
- For the enrollment/contact/syllabus API routes, set `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `SMTP_FROM`, `SMTP_TO` (and optionally `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_GA_ID`) in `.env.local`

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Production Build

```bash
npm run build
npm start
```

Other scripts: `npm run lint`, `npm run remotion:preview` (video compositions).

## Project Structure

```
app/
├── programs/         # Praxis, Initium, Ascenda program pages
├── about/            # About, contact, enroll
├── blog/             # Blog and articles
├── events/           # Events and info sessions
├── curriculum/       # Curriculum overview
├── services/         # Bootcamp and executive services
├── linkedin-generator/
├── og-generator/
├── pdf-brochure/
├── presentations/    # Curriculum slide decks
└── components/       # Shared UI and layout components

remotion/
└── compositions/     # Animated video compositions for social content

emails/               # Email templates
public/               # Static assets
```

## License

MIT. See [LICENSE](LICENSE). Brand names, logos and the Raveo font retain their own owners' terms.

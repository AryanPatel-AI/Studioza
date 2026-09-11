# Full-Stack Studio Website

A modern, responsive **full-stack studio website** built to showcase creative work, services, projects, and studio information. The project includes a polished frontend experience with a scalable backend architecture.

## ✨ Features

* 🎨 Modern and responsive UI
* 📱 Fully responsive across desktop, tablet, and mobile
* 🏢 Studio/company landing page
* 🚀 Projects and portfolio showcase
* 🛠️ Services section
* 👥 About/team section
* 📩 Contact form
* ⚡ Fast and optimized performance
* 🔐 Backend API integration
* 🗄️ Database integration
* 🌙 Modern animations and interactions
* 📦 Clean and scalable project structure

## 🛠️ Tech Stack

### Frontend

* React / Next.js
* TypeScript
* Tailwind CSS
* Framer Motion

### Backend

* Node.js
* Express.js / Next.js API Routes
* REST API

### Database

* MongoDB / PostgreSQL

### Tools

* Git & GitHub
* ESLint
* Prettier
* Vercel / Render

## 📂 Project Structure

```text
Studioza/
├── frontend/                      # Next.js App Router Client & Admin UI
│   ├── public/                    # Static assets & photography samples
│   ├── src/
│   │   ├── app/                   # App Router Pages & Routes
│   │   │   ├── admin/             # Studio Admin Dashboard Suite
│   │   │   │   ├── inquiries/     # Client Inquiries Management
│   │   │   │   ├── portfolio/     # Portfolio Categories & Works CMS
│   │   │   │   ├── services/      # Studio Packages & Services
│   │   │   │   ├── layout.tsx     # Admin Navigation Layout
│   │   │   │   └── page.tsx       # Studio Metrics & Telemetry
│   │   │   ├── contact/           # Commission & Production Brief Submission
│   │   │   ├── login/             # Atelier Client Portal & Admin Authentication
│   │   │   ├── main/              # Visual Archive, Category Filter & Session Tiers
│   │   │   ├── actions.ts         # Server Actions
│   │   │   ├── globals.css        # Global CSS & Dual-Tone Theme Variables
│   │   │   ├── layout.tsx         # Root Layout & Typography Setup
│   │   │   └── page.tsx           # Atelier Entrance Hero & Discipline Showcase
│   │   ├── components/
│   │   │   ├── AnimatedBackground.tsx # Dual-Tone Canvas (Blue Hour + Golden Hour)
│   │   │   ├── Footer.tsx         # Global Footer (Aryan Patel Attribution)
│   │   │   └── Navbar.tsx         # Floating Glass Navigation
│   │   └── lib/
│   │       └── supabase/          # Supabase SSR Client & Server Helpers
│   ├── next.config.ts             # Next.js Configuration (External Images, etc.)
│   ├── package.json
│   └── tsconfig.json
│
├── backend/                       # Express & Prisma REST API Server
│   ├── prisma/
│   │   └── schema.prisma          # Database Schema (PostgreSQL / Supabase)
│   ├── src/
│   │   ├── controllers/           # Auth, Inquiries, Services, Portfolio Controllers
│   │   ├── middleware/            # JWT Authentication & Authorization
│   │   ├── routes/                # Express API Route Handlers
│   │   ├── lib/                   # Supabase Admin Client
│   │   └── index.ts               # Express Application Entry Point
│   ├── .env.example               # Backend Environment Template
│   ├── package.json
│   └── tsconfig.json
│
├── .env.example                   # Root Environment Template
├── .gitignore                     # Git Exclusion Rules (Secrets, .vscode, .next)
├── package.json                   # Root Monorepo Orchestration Scripts
└── README.md                      # Project Documentation
```

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/studio-website.git
cd studio-website
```

### 2. Install dependencies

```bash
npm install
```

If the frontend and backend use separate packages:

```bash
cd frontend
npm install

cd ../backend
npm install
```

### 3. Configure environment variables

Create a `.env` file and add the required environment variables:

```env
DATABASE_URL=your_database_url
API_URL=your_api_url
PORT=5000
```

### 4. Start the development server

```bash
npm run dev
```

The application will be available locally at the configured development URL.

## 📸 Screenshots

Add screenshots of the website here.

```text
screenshots/
├── home.png
├── projects.png
├── services.png
└── contact.png
```

## 🔮 Future Improvements

* [ ] Admin dashboard
* [ ] Authentication
* [ ] CMS integration
* [ ] Blog system
* [ ] Project filtering
* [ ] Email notifications
* [ ] Analytics dashboard
* [ ] Improved SEO
* [ ] Dark/light theme

## 🤝 Contributing

Contributions are welcome.

1. Fork the repository
2. Create a new branch

```bash
git checkout -b feature/your-feature
```

3. Commit your changes

```bash
git commit -m "Add your feature"
```

4. Push to your branch

```bash
git push origin feature/your-feature
```

5. Open a Pull Request

## 📄 License

This project is available under the **MIT License**.

## 👨‍💻 Author

**Aryan Patel**
---

⭐ If you found this project useful, consider giving it a star!

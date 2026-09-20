# Geek Intern - Client Portal

Official client-side web application for **Geek Intern** Virtual Internship Program.

## Features
- Virtual Internship Applications & Exploration
- Live Application & Domain Tracking
- Student Credential & Verification Portal (OTP Authentication via Supabase)
- Certificate Verification
- Career Tools: ATS Resume Checker, Portfolio Builder, Resume Builder

## Tech Stack
- React 18, Vite, TypeScript
- Tailwind CSS, Lucide React, shadcn/ui components
- Supabase Authentication & Storage
- Zustand, Axios

## Setup & Running Locally

1. Install dependencies:
   ```bash
   npm install
   ```

2. Copy environment variables:
   ```bash
   cp .env.example .env
   ```
   Add your `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`, and `VITE_API_URL`.

3. Start development server:
   ```bash
   npm run dev
   ```

4. Build for production:
   ```bash
   npm run build
   ```

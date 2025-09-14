'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Eye, EyeOff, Globe, Sparkles, BarChart2, Layers, Users, Shield, Zap } from 'lucide-react';

const ACCENT = '#ea580c'; // Sipman accent (orange)

// Brand assets
const DOC_URL = 'https://docs.google.com/document/d/1qEe9bdln6Ue5n_z9OLgpeR3SDumJxGJGCi4J6gC33Xg/edit?usp=sharing';

export default function Page() {
  const [showPwd, setShowPwd] = useState(false);

  return (
    <div
      className="relative min-h-screen w-full bg-stone-50 text-stone-900"
      style={{ ['--accent' as any]: ACCENT } as React.CSSProperties}
    >
      {/* HEADER LEFT: LOGO + WORDMARK */}
      <header className="fixed left-6 top-6 z-40 flex items-center gap-3">
        <Image
          src="/logo.png"
          alt="Sipman logo"
          width={40}
          height={40}
          sizes="(max-width: 768px) 32px, 40px"
          priority
          className="h-8 w-8 rounded"
        />
        <a href="/" className="select-none text-2xl font-bold tracking-tight">Sipman</a>
      </header>

      {/* LANG SWITCH */}
      <div className="fixed left-6 top-[76px] z-40 flex items-center gap-2 text-sm opacity-90">
        <Globe className="h-4 w-4" />
        <nav>
          <a href="/th/login" className="hover:underline opacity-80">TH</a>
          <span className="mx-1 opacity-40">/</span>
          <a href="/en/login" className="hover:underline">EN</a>
        </nav>
      </div>

      {/* LOGIN CARD: mobile-friendly, fixed on desktop */}
      <aside className="static mx-auto mt-4 w-[92vw] max-w-sm rounded-xl border border-[var(--accent)] bg-white/10 bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-md backdrop-saturate-150 p-2 shadow-[0_6px_24px_rgba(0,0,0,0.08)] md:fixed md:right-4 md:top-4 md:mx-0 md:mt-0 md:w-[70vw] md:max-w-[18rem]">
        <h2 className="mb-1 text-base font-semibold tracking-tight">Login</h2>
        <form className="space-y-1.5" onSubmit={(e) => e.preventDefault()}>
          <label className="block text-xs">
            <span className="mb-1 block text-stone-700">Email</span>
            <input
              type="email"
              placeholder="email@email.com"
              autoComplete="email"
              inputMode="email"
              className="w-full rounded-xl border border-stone-200 bg-white px-3 py-1.5 text-stone-900 placeholder-stone-400 outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)]"
              required
            />
          </label>
          <label className="block text-xs">
            <span className="mb-1 block text-stone-700">Password</span>
            <div className="relative">
              <input
                type={showPwd ? 'text' : 'password'}
                placeholder="••••••••"
                autoComplete="current-password"
                className="w-full rounded-xl border border-stone-200 bg-white px-3 py-1.5 pr-10 text-stone-900 placeholder-stone-400 outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)]"
                required
              />
              <button
                type="button"
                aria-label={showPwd ? 'Hide password' : 'Show password'}
                onClick={() => setShowPwd((v) => !v)}
                className="absolute inset-y-0 right-0 grid w-10 place-items-center text-stone-500 hover:text-stone-700"
              >
                {showPwd ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
          </label>
          <div className="flex items-center justify-between text-xs">
            <a href="/en/forgot" className="text-[var(--accent)] hover:underline">Forgot password?</a>
            <a href="/en/signup" className="text-[var(--accent)] hover:underline">Create account</a>
          </div>
          <button
            type="submit"
            className="mt-1 w-full rounded-xl bg-stone-900 px-4 py-2 font-semibold text-white hover:bg-stone-800 focus:outline-none focus:ring-2 focus:ring-stone-300"
          >
            Login
          </button>
          {/* Removed Google sign-in per request */}
        </form>
      </aside>

      {/* HERO */}
      <main className="relative z-30 mx-auto flex min-h-screen max-w-7xl flex-col items-center justify-center px-6 py-24">
        <section className="text-center">
          <Image
            src="/logo.png"
            alt="Sipman"
            width={120}
            height={120}
            sizes="(max-width: 768px) 80px, 120px"
            className="mx-auto mb-6 h-28 w-28 rounded"
            priority
          />
          <h1 className="text-3xl font-extrabold tracking-tight md:text-5xl">Run your beverage program with clarity</h1>
          <p className="mx-auto mt-4 max-w-3xl text-stone-600 md:text-lg">
            Inventory, digital menus, and supplier workflows — in one place. Designed in Bangkok for Thailand’s HORECA by Michelin‑star sommeliers.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <a href="mailto:sipman.asia@gmail.com?subject=Sipman%20Demo%20Request" className="rounded-xl bg-stone-900 px-5 py-3 text-sm font-semibold text-white hover:bg-stone-800">Request a demo</a>
            <a href="#investors" className="rounded-xl border border-stone-300 px-5 py-3 text-sm font-semibold text-stone-900 hover:bg-white">Investor overview</a>
          </div>
        </section>

        {/* LIGHT TRUST LINE */}
        <section className="mt-10 text-center text-xs uppercase tracking-wide text-stone-500">
          Used in Michelin‑star environments in Bangkok
        </section>

        {/* FEATURES GRID */}
        <section id="features" className="mt-12 grid w-full max-w-6xl grid-cols-1 gap-5 md:grid-cols-3">
          <FeatureCard icon={<Layers className="h-5 w-5" />} title="Inventory">
            Track every bottle in real‑time, cut waste, and stay on top of costs.
          </FeatureCard>
          <FeatureCard icon={<Sparkles className="h-5 w-5" />} title="Digital menus">
            Beautiful QR and print menus that update instantly — no reprinting.
          </FeatureCard>
          <FeatureCard icon={<Users className="h-5 w-5" />} title="Supplier links">
            Request quotes, samples, and place orders without email back‑and‑forth.
          </FeatureCard>
          <FeatureCard icon={<BarChart2 className="h-5 w-5" />} title="Insights">
            Understand movement by SKU and venue to buy smarter, faster.
          </FeatureCard>
          <FeatureCard icon={<Shield className="h-5 w-5" />} title="Compliance">
            Built‑in respect of Thai regulations for responsible operations.
          </FeatureCard>
          <FeatureCard icon={<Zap className="h-5 w-5" />} title="Integrations">
            Accounting and WMS connectors on the roadmap.
          </FeatureCard>
        </section>

        {/* INVESTOR BLOCK */}
        <section id="investors" className="mt-14 grid w-full max-w-6xl grid-cols-1 gap-6 md:grid-cols-3">
          <div className="md:col-span-2 rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
            <h3 className="text-xl font-semibold">Why invest now</h3>
            <ul className="mt-3 grid list-disc gap-2 pl-5 text-sm text-stone-700">
              <li>MVP live; early validation in Michelin‑star restaurants.</li>
              <li>Free for HORECA; clear path to supplier‑side monetization.</li>
              <li>Capital‑efficient roadmap focused on core workflows.</li>
              <li>Growing beverage dataset and usage patterns create a moat.</li>
            </ul>
            <a href="mailto:sipman.asia@gmail.com" className="mt-5 inline-block rounded-xl bg-stone-900 px-5 py-3 text-sm font-semibold text-white hover:bg-stone-800">Request investor deck</a>
          </div>
          <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
            <h3 className="mb-4 text-xl font-semibold">Testimonials</h3>
            <ul className="space-y-3 text-sm text-stone-700 text-center">
              <li>“Sipman streamlines operations for creative kitchens.” — Chalee Kader, Wana Yook</li>
              <li>“Nothing comparable right now.” — Antoine & Théo, Bisou Bangkok</li>
              <li>“Great opportunity for suppliers.” — Kim Wachtveitl, Wine Garage</li>
            </ul>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="relative z-30 mt-auto w-full px-6 py-10 text-center text-xs text-stone-500">
        <p>
          © {new Date().getFullYear()} Sipman · Bangkok, Thailand · <a href={DOC_URL} target="_blank" rel="noopener noreferrer" className="hover:underline">Terms</a> · <a href={DOC_URL} target="_blank" rel="noopener noreferrer" className="hover:underline">Privacy</a>
        </p>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm">
      <div className="mb-2 flex items-center gap-2 text-[var(--accent)]">
        {icon}
        <span className="text-sm font-semibold">{title}</span>
      </div>
      <p className="text-sm text-stone-700">{children}</p>
    </div>
  );
}

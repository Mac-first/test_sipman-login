'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Eye, EyeOff, Sparkles, BarChart2, Layers, Users, Shield, Zap, CheckCircle2, Loader2 } from 'lucide-react';

const ACCENT = '#E8984D'; // Sipman accent (wine-orange)

// Brand assets
const DOC_URL = 'https://docs.google.com/document/d/1qEe9bdln6Ue5n_z9OLgpeR3SDumJxGJGCi4J6gC33Xg/edit?usp=sharing';

export default function Page() {
  const [showPwd, setShowPwd] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [touched, setTouched] = useState<{ email?: boolean; password?: boolean }>({});
  const [loading, setLoading] = useState(false);

  const validate = (vals: { email: string; password: string }) => {
    const next: { email?: string; password?: string } = {};
    const emailOk = /[^\s@]+@[^\s@]+\.[^\s@]+/.test(vals.email);
    if (!emailOk) next.email = 'Please enter a valid email.';
    if (!vals.password || vals.password.length < 8) next.password = 'Minimum 8 characters.';
    return next;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const nextErrors = validate({ email, password });
    setErrors(nextErrors);
    setTouched({ email: true, password: true });
    if (Object.keys(nextErrors).length === 0) {
      setLoading(true);
      setTimeout(() => setLoading(false), 1200);
    }
  };

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

      {/* Language switch removed (EN only) */}

      {/* LOGIN CARD: mobile-friendly, fixed on desktop */}
      <aside
        className="static z-50 mx-auto mt-4 w-[69vw] max-w-[18rem] rounded-xl border border-[var(--accent)] backdrop-blur-md backdrop-saturate-150 p-[0.4rem] shadow-[0_6px_24px_rgba(0,0,0,0.08)] md:fixed md:right-4 md:top-4 md:mx-0 md:mt-0 md:w-[52.5vw] md:max-w-[13.5rem]"
        style={{ backgroundColor: 'rgba(255, 252, 250, 0.5)' }}
      >
        <form className="space-y-[0.3rem]" onSubmit={handleSubmit}>
          <label className="block text-xs">
            <span className="mb-[0.2rem] block text-stone-700">Email</span>
            <input
              type="email"
              placeholder="email@email.com"
              autoComplete="email"
              inputMode="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (touched.email) setErrors((prev) => ({ ...prev, ...validate({ email: e.target.value, password }) }));
              }}
              onBlur={() => {
                setTouched((t) => ({ ...t, email: true }));
                setErrors((prev) => ({ ...prev, ...validate({ email, password }) }));
              }}
              className={`w-full rounded-xl border bg-white px-3 py-[0.3rem] text-stone-900 placeholder-stone-400 outline-none focus:ring-1 ${
                errors.email && touched.email
                  ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                  : 'border-stone-200 focus:border-[var(--accent)] focus:ring-[var(--accent)]'
              }`}
              aria-invalid={Boolean(errors.email && touched.email)}
              aria-describedby={errors.email && touched.email ? 'email-error' : undefined}
              required
            />
            {errors.email && touched.email ? (
              <p id="email-error" className="mt-1 text-[10px] text-red-600">
                {errors.email}
              </p>
            ) : null}
          </label>
          <label className="block text-xs">
            <span className="mb-[0.2rem] block text-stone-700">Password</span>
            <div className="relative">
              <input
                type={showPwd ? 'text' : 'password'}
                placeholder="••••••••"
                autoComplete="current-password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (touched.password) setErrors((prev) => ({ ...prev, ...validate({ email, password: e.target.value }) }));
                }}
                onBlur={() => {
                  setTouched((t) => ({ ...t, password: true }));
                  setErrors((prev) => ({ ...prev, ...validate({ email, password }) }));
                }}
                className={`w-full rounded-xl border bg-white px-3 py-[0.3rem] pr-10 text-stone-900 placeholder-stone-400 outline-none focus:ring-1 ${
                  errors.password && touched.password
                    ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                    : 'border-stone-200 focus:border-[var(--accent)] focus:ring-[var(--accent)]'
                }`}
                aria-invalid={Boolean(errors.password && touched.password)}
                aria-describedby={errors.password && touched.password ? 'password-error' : undefined}
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
            {errors.password && touched.password ? (
              <p id="password-error" className="mt-1 text-[10px] text-red-600">
                {errors.password}
              </p>
            ) : null}
          </label>
          <div className="flex items-center justify-between text-xs">
            <a href="/en/forgot" className="text-[var(--accent)] hover:underline">Forgot password?</a>
            <a href="/en/signup" className="text-[var(--accent)] hover:underline">Create account</a>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="mt-[0.2rem] w-full rounded-lg bg-stone-900 px-3 py-[0.3rem] text-sm font-medium text-white hover:bg-stone-800 focus:outline-none focus:ring-2 focus:ring-stone-300 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? (
              <span className="inline-flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                Logging in...
              </span>
            ) : (
              'Login'
            )}
          </button>
          {/* Google sign-in intentionally removed */}
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
            Built for Thailand’s HORECA. Manage inventory, digital menus, and supplier workflows in one place — designed with Michelin‑star sommeliers in Bangkok.
          </p>
          <ul className="mx-auto mt-5 flex max-w-3xl flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm text-stone-700">
            <li className="inline-flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-[var(--accent)]" /> Real‑time stock</li>
            <li className="inline-flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-[var(--accent)]" /> Instant menu updates</li>
            <li className="inline-flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-[var(--accent)]" /> Supplier workflows</li>
          </ul>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <a href="mailto:sipman.asia@gmail.com?subject=Sipman%20Demo%20Request" className="rounded-xl bg-stone-900 px-5 py-3 text-sm font-semibold text-white hover:bg-stone-800">Request a demo</a>
            <a href="#investors" className="rounded-xl border border-stone-300 px-5 py-3 text-sm font-semibold text-stone-900 hover:bg-white">Investor overview</a>
          </div>
        </section>

        {/* TRUST LINE (prominent, no pill) */}
        <section className="mt-10 text-center">
          <p className="text-[11px] font-medium uppercase tracking-wide text-stone-600 md:text-sm">
            Used in Michelin‑star, 50 Best, and fine‑dining venues in Bangkok
          </p>
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
          © {new Date().getFullYear()} Sipman · Bangkok, Thailand · Complies with Thai regulations — no online alcohol sales to individuals. · <a href={DOC_URL} target="_blank" rel="noopener noreferrer" className="hover:underline">Terms & Privacy</a>
        </p>
      </footer>

      {/* Sticky CTA on mobile */}
      <div className="fixed inset-x-0 bottom-3 z-40 flex justify-center md:hidden pointer-events-none">
        <a
          href="mailto:sipman.asia@gmail.com?subject=Sipman%20Demo%20Request"
          className="pointer-events-auto rounded-full bg-stone-900 px-5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-stone-800"
          style={{ paddingBottom: 'calc(0.5rem + env(safe-area-inset-bottom))' }}
        >
          Request a demo
        </a>
      </div>
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

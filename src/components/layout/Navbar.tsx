// ============================================================
// src/components/layout/Navbar.tsx
// Navbar fixed di atas halaman.
// ============================================================
import { Link } from "wouter";

export function Navbar() {
  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md"
      style={{ background: "rgba(10,10,10,0.85)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 no-underline">
          <div
            className="w-8 h-8 rounded flex items-center justify-center"
            style={{ background: "rgba(201,168,76,0.1)", border: "1px solid rgba(201,168,76,0.25)" }}
          >
            <span className="font-serif font-bold text-xl" style={{ color: "var(--gold)" }}>P</span>
          </div>
          <span className="font-serif font-semibold text-xl tracking-wide text-white">Plenfow</span>
        </Link>

        {/* Nav links */}
        <div className="flex items-center gap-6">
          <Link href="/login" className="text-sm font-medium no-underline transition-colors" style={{ color: "var(--text-muted)" }}>
            Login
          </Link>
          <Link href="/register" className="btn-primary text-sm px-5 py-2">
            Get Started
          </Link>
        </div>
      </div>
    </header>
  );
}

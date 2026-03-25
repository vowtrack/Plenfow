// ============================================================
// src/components/layout/Footer.tsx
// ============================================================
import { Link } from "wouter";

export function Footer() {
  return (
    <footer style={{ background: "#050505", borderTop: "1px solid rgba(255,255,255,0.05)" }} className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8">

          {/* Brand */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <span className="font-serif font-bold text-2xl" style={{ color: "var(--gold)" }}>P</span>
              <span className="font-serif font-semibold text-xl text-white">Plenfow</span>
            </div>
            <p className="text-sm max-w-xs" style={{ color: "var(--text-muted)" }}>
              The all-in-one platform for professional Wedding & Event Organizers.
            </p>
          </div>

          {/* Links */}
          <div className="flex gap-12 text-sm">
            <div className="flex flex-col gap-3">
              <span className="font-semibold text-white">Product</span>
              <Link href="#" className="no-underline transition-colors hover:text-white" style={{ color: "var(--text-muted)" }}>Features</Link>
              <Link href="#" className="no-underline transition-colors hover:text-white" style={{ color: "var(--text-muted)" }}>Pricing</Link>
            </div>
            <div className="flex flex-col gap-3">
              <span className="font-semibold text-white">Company</span>
              <Link href="#" className="no-underline transition-colors hover:text-white" style={{ color: "var(--text-muted)" }}>About</Link>
              <Link href="#" className="no-underline transition-colors hover:text-white" style={{ color: "var(--text-muted)" }}>Contact</Link>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs" style={{ borderTop: "1px solid rgba(255,255,255,0.05)", color: "var(--text-muted)" }}>
          <p>© {new Date().getFullYear()} Plenfow. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="#" className="no-underline hover:text-white transition-colors" style={{ color: "var(--text-muted)" }}>Privacy Policy</Link>
            <Link href="#" className="no-underline hover:text-white transition-colors" style={{ color: "var(--text-muted)" }}>Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

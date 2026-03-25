// ============================================================
// src/pages/landing.tsx
// Halaman utama / homepage Plenfow.
// Berisi: Hero, Features, Testimonials, Footer.
// ============================================================
import { motion } from "framer-motion";
import { Link } from "wouter";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Calendar, Users, Briefcase, MessageSquare, BarChart } from "lucide-react";

// Daftar fitur yang ditampilkan di section "Everything you need"
const features = [
  {
    icon: <Calendar className="w-6 h-6" style={{ color: "var(--gold)" }} />,
    title: "Event Tracking",
    desc: "Track every detail of your events in real-time from a single dashboard.",
  },
  {
    icon: <Briefcase className="w-6 h-6" style={{ color: "var(--gold)" }} />,
    title: "Vendor Management",
    desc: "Manage all your vendors, contracts, and contacts in one organized place.",
  },
  {
    icon: <Users className="w-6 h-6" style={{ color: "var(--gold)" }} />,
    title: "Team Management",
    desc: "Coordinate your internal team effortlessly with role-based access.",
  },
  {
    icon: <MessageSquare className="w-6 h-6" style={{ color: "var(--gold)" }} />,
    title: "Client Communication",
    desc: "Keep clients updated automatically with magic links and status portals.",
  },
  {
    icon: <BarChart className="w-6 h-6" style={{ color: "var(--gold)" }} />,
    title: "Reports & Analytics",
    desc: "Gain deep insights into your business performance and event profitability.",
  },
];

// Testimoni dummy - nanti bisa diganti data dari Supabase
const testimonials = [
  {
    name: "Sarah Mitchell",
    role: "Wedding Organizer",
    quote: "Plenfow transformed how I manage my events. Worth every penny. My clients love the modern interface.",
  },
  {
    name: "James Reeves",
    role: "Event Director",
    quote: "The vendor management feature alone saved me 10 hours per week. Essential tool for any serious EO.",
  },
  {
    name: "Priya Sharma",
    role: "Luxury Events Co.",
    quote: "My clients are always impressed by the seamless communication. It elevated our entire brand perception.",
  },
];

export function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: "var(--bg)" }}>
      <Navbar />

      {/* ---- HERO SECTION ---- */}
      <section className="relative pt-40 pb-24 md:pt-56 md:pb-36 flex-1 flex flex-col justify-center overflow-hidden">
        {/* Efek glow di belakang */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(201,168,76,0.08) 0%, transparent 70%)" }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1 className="text-5xl md:text-7xl font-medium text-white mb-6 leading-tight">
              Manage Your Events{" "}
              <br className="hidden md:block" />
              <span
                className="bg-clip-text text-transparent"
                style={{ backgroundImage: "linear-gradient(90deg, var(--gold), #e8d5a3, var(--gold))" }}
              >
                Like a Pro
              </span>
            </h1>

            <p className="mt-4 text-lg md:text-xl max-w-2xl mx-auto mb-10 font-light" style={{ color: "var(--text-muted)" }}>
              The all-in-one platform designed specifically for professional Wedding & Event Organizers to scale their business.
            </p>

            <Link href="/register" className="btn-primary text-base px-8 py-4">
              Get Started Free
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ---- FEATURES SECTION ---- */}
      <section className="py-24" style={{ background: "#070707", borderTop: "1px solid rgba(255,255,255,0.05)", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl text-white mb-4">Everything you need</h2>
            <div className="w-24 h-1 mx-auto rounded-full" style={{ background: "var(--gold)" }} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
              >
                <div className="card h-full hover:border-opacity-30 transition-colors group" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
                  {/* Icon container */}
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform"
                    style={{ background: "var(--gold-dim)" }}
                  >
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-medium text-white mb-3">{feature.title}</h3>
                  <p className="leading-relaxed" style={{ color: "var(--text-muted)" }}>{feature.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ---- TESTIMONIALS ---- */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl text-white mb-4">Trusted by Professionals</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.5 }}
              >
                <div className="card h-full">
                  <p className="text-lg italic mb-8 leading-relaxed" style={{ color: "rgba(255,255,255,0.85)" }}>
                    "{t.quote}"
                  </p>
                  <div>
                    <h4 className="font-medium" style={{ color: "var(--gold)" }}>{t.name}</h4>
                    <p className="text-sm" style={{ color: "var(--text-muted)" }}>{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

// ============================================================
// src/pages/forgot-password.tsx
// Halaman reset password.
// TODO: Hubungkan ke Supabase auth.resetPasswordForEmail() setelah setup.
// ============================================================
import { useState } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, ArrowLeft } from "lucide-react";

export function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isSent, setIsSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);

    // --------------------------------------------------------
    // TODO: Ganti dengan Supabase setelah setup:
    // await supabase.auth.resetPasswordForEmail(email, {
    //   redirectTo: "https://yourapp.vercel.app/reset-password",
    // });
    // --------------------------------------------------------

    setTimeout(() => {
      setLoading(false);
      setIsSent(true);
    }, 800);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-4" style={{ background: "var(--bg)" }}>
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(201,168,76,0.06) 0%, transparent 70%)" }}
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md relative z-10"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/login" className="inline-flex items-center gap-2 no-underline">
            <div
              className="w-10 h-10 rounded flex items-center justify-center"
              style={{ background: "var(--gold-dim)", border: "1px solid rgba(201,168,76,0.3)" }}
            >
              <span className="font-serif font-bold text-2xl" style={{ color: "var(--gold)" }}>P</span>
            </div>
          </Link>
        </div>

        <div className="card">
          <AnimatePresence mode="wait">
            {/* Form state */}
            {!isSent ? (
              <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <h1 className="text-3xl text-white mb-2 text-center">Reset Password</h1>
                <p className="text-center text-sm mb-8" style={{ color: "var(--text-muted)" }}>
                  Enter your email and we'll send you a reset link.
                </p>

                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  <div>
                    <label className="form-label">Email Address</label>
                    <input
                      type="email"
                      required
                      className="input-field"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-primary w-full py-3"
                    style={{ opacity: loading ? 0.7 : 1 }}
                  >
                    {loading ? "Sending..." : "Send Reset Link"}
                  </button>
                </form>
              </motion.div>
            ) : (
              /* Success state */
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-6"
              >
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
                  style={{ background: "var(--gold-dim)" }}
                >
                  <CheckCircle2 className="w-8 h-8" style={{ color: "var(--gold)" }} />
                </div>
                <h2 className="text-2xl text-white mb-3">Check your email</h2>
                <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                  We've sent a reset link to{" "}
                  <span className="text-white font-medium">{email}</span>
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Back to login */}
          <div className="mt-8 text-center">
            <Link href="/login" className="inline-flex items-center gap-2 text-sm no-underline transition-colors group" style={{ color: "var(--text-muted)" }}>
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Back to Login
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

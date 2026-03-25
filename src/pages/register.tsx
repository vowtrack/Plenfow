import { supabase } from "../lib/supabase";
import { useState } from "react";
import { Link, useLocation } from "wouter";
import { motion } from "framer-motion";

export function RegisterPage() {
  const [, setLocation] = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.auth.signUp({ email, password });
    if (error) {
      alert(error.message);
      setLoading(false);
      return;
    }
    alert("Registration successful! Please check your email to confirm.");
    setLocation("/login");
    setLoading(false);
  };

  return (
    <div
      className="min-h-screen flex flex-col justify-center items-center p-4"
      style={{ background: "var(--bg)" }}
    >
      {/* Glow effect */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(201,168,76,0.06) 0%, transparent 70%)" }}
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md relative z-10"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 no-underline">
            <div
              className="w-10 h-10 rounded flex items-center justify-center"
              style={{ background: "var(--gold-dim)", border: "1px solid rgba(201,168,76,0.3)" }}
            >
              <span className="font-serif font-bold text-2xl" style={{ color: "var(--gold)" }}>P</span>
            </div>
          </Link>
        </div>

        {/* Card form */}
        <div className="card" style={{ background: "rgba(17,17,17,0.9)", backdropFilter: "blur(20px)" }}>
          <h1 className="text-3xl text-white mb-2 text-center">Create Account</h1>
          <p className="text-center text-sm mb-8" style={{ color: "var(--text-muted)" }}>
            Start organizing your perfect moments
          </p>

          <form onSubmit={handleRegister} className="flex flex-col gap-5">
            {/* Email */}
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

            {/* Password */}
            <div>
              <label className="form-label">Password</label>
              <input
                type="password"
                required
                className="input-field"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full py-3 mt-2"
              style={{ opacity: loading ? 0.7 : 1, cursor: loading ? "not-allowed" : "pointer" }}
            >
              {loading ? "Creating account..." : "Register"}
            </button>
          </form>

          <p className="mt-8 text-center text-sm" style={{ color: "var(--text-muted)" }}>
            Already have an account?{" "}
            <Link href="/login" className="no-underline" style={{ color: "var(--gold)" }}>
              Login here
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}

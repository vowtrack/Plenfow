import { useState } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { CheckCircle2, ArrowLeft } from "lucide-react";

export function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if(email) setIsSent(true);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col justify-center items-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-background" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="text-center mb-8">
          <Link href="/login" className="inline-flex items-center gap-2 group cursor-pointer">
            <div className="w-10 h-10 rounded bg-primary/10 flex items-center justify-center border border-primary/30">
              <span className="font-serif font-bold text-primary text-2xl">P</span>
            </div>
          </Link>
        </div>

        <Card className="p-8 bg-card/80 backdrop-blur-xl border-white/10 shadow-2xl">
          <AnimatePresence mode="wait">
            {!isSent ? (
              <motion.div
                key="form"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
              >
                <h1 className="font-serif text-3xl text-white mb-2 text-center">Reset Password</h1>
                <p className="text-muted-foreground text-center mb-8 text-sm">
                  Enter your email address and we'll send you a link to reset your password.
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-white/70">Email Address</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="bg-background/50 border-white/10 focus-visible:ring-primary focus-visible:border-primary h-12 text-white"
                    />
                  </div>
                  
                  <Button type="submit" className="w-full h-12 text-base font-medium bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/20">
                    Send Reset Link
                  </Button>
                </form>
              </motion.div>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-6"
              >
                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="w-8 h-8 text-primary" />
                </div>
                <h2 className="font-serif text-2xl text-white mb-3">Check your email</h2>
                <p className="text-muted-foreground mb-8 text-sm leading-relaxed">
                  We've sent a password reset link to<br/>
                  <span className="text-white font-medium">{email}</span>
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="mt-8 text-center">
            <Link href="/login" className="inline-flex items-center text-sm text-muted-foreground hover:text-white transition-colors group">
              <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
              Back to Login
            </Link>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}

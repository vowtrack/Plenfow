import { useState } from "react";
import { Link, useLocation } from "wouter";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";

export function LoginPage() {
  const [, setLocation] = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Purely frontend flow: navigate directly to onboarding on submit
    setLocation("/onboarding");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col justify-center items-center p-4 relative overflow-hidden">
      {/* Background imagery */}
      <div className="absolute inset-0 z-0">
        <img 
          src={`${import.meta.env.BASE_URL}images/login-bg.png`}
          alt="Luxury background" 
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-md relative z-10"
      >
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 group cursor-pointer">
            <div className="w-10 h-10 rounded bg-primary/10 flex items-center justify-center border border-primary/30">
              <span className="font-serif font-bold text-primary text-2xl">P</span>
            </div>
          </Link>
        </div>

        <Card className="p-8 bg-card/60 backdrop-blur-xl border-white/10 shadow-2xl shadow-black/50">
          <h1 className="font-serif text-3xl text-white mb-2 text-center">Welcome Back</h1>
          <p className="text-muted-foreground text-center mb-8 text-sm">Enter your credentials to access your portal</p>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-white/70">Email Address</Label>
              <Input 
                id="email" 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="bg-background/50 border-white/10 focus-visible:ring-primary focus-visible:border-primary h-12 text-white placeholder:text-white/20"
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label htmlFor="password" className="text-white/70">Password</Label>
                <Link href="/forgot-password" className="text-xs text-primary hover:text-primary/80 transition-colors">
                  Forgot Password?
                </Link>
              </div>
              <Input 
                id="password" 
                type="password" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="bg-background/50 border-white/10 focus-visible:ring-primary focus-visible:border-primary h-12 text-white placeholder:text-white/20"
              />
            </div>

            <Button type="submit" className="w-full h-12 text-base font-medium bg-primary hover:bg-primary/90 text-primary-foreground mt-4 shadow-lg shadow-primary/20">
              Login
            </Button>
          </form>

          <div className="mt-8 text-center text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link href="#" className="text-primary hover:text-white transition-colors">
              Register here
            </Link>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}

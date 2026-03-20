import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded bg-primary/10 flex items-center justify-center border border-primary/20 group-hover:border-primary/50 transition-colors">
            <span className="font-serif font-bold text-primary text-xl">P</span>
          </div>
          <span className="font-serif font-semibold text-xl tracking-wide text-foreground">Plenfow</span>
        </Link>

        <div className="flex items-center gap-4">
          <Link href="/login" className="text-sm font-medium text-muted-foreground hover:text-white transition-colors">
            Login
          </Link>
          <Link href="/login">
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium px-6 shadow-lg shadow-primary/20">
              Get Started
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}

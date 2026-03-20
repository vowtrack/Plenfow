import { Link } from "wouter";

export function Footer() {
  return (
    <footer className="bg-[#050505] border-t border-white/5 py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center md:items-start gap-8">
        <div className="flex flex-col items-center md:items-start gap-4">
          <div className="flex items-center gap-2">
            <span className="font-serif font-bold text-primary text-2xl">P</span>
            <span className="font-serif font-semibold text-xl tracking-wide text-foreground">Plenfow</span>
          </div>
          <p className="text-muted-foreground text-sm max-w-xs text-center md:text-left">
            The all-in-one platform for professional Wedding & Event Organizers.
          </p>
        </div>
        
        <div className="flex gap-8 text-sm">
          <div className="flex flex-col gap-3">
            <span className="font-semibold text-white">Product</span>
            <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">Features</Link>
            <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">Pricing</Link>
          </div>
          <div className="flex flex-col gap-3">
            <span className="font-semibold text-white">Company</span>
            <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">About</Link>
            <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">Contact</Link>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
        <p>© {new Date().getFullYear()} Plenfow. All rights reserved.</p>
        <div className="flex gap-4">
          <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
          <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
}

import { motion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Calendar, Users, Briefcase, MessageSquare, BarChart, CheckCircle2 } from "lucide-react";

export function LandingPage() {
  const features = [
    {
      icon: <Calendar className="w-6 h-6 text-primary" />,
      title: "Event Tracking",
      desc: "Track every detail of your events in real-time from a single dashboard."
    },
    {
      icon: <Briefcase className="w-6 h-6 text-primary" />,
      title: "Vendor Management",
      desc: "Manage all your vendors, contracts, and contacts in one organized place."
    },
    {
      icon: <Users className="w-6 h-6 text-primary" />,
      title: "Team Management",
      desc: "Coordinate your internal team effortlessly with role-based access."
    },
    {
      icon: <MessageSquare className="w-6 h-6 text-primary" />,
      title: "Client Communication",
      desc: "Keep clients updated automatically with magic links and status portals."
    },
    {
      icon: <BarChart className="w-6 h-6 text-primary" />,
      title: "Reports & Analytics",
      desc: "Gain deep insights into your business performance and event profitability."
    }
  ];

  const testimonials = [
    {
      name: "Sarah Mitchell",
      role: "Wedding Organizer",
      quote: "Plenfow transformed how I manage my events. Worth every penny. My clients love the modern interface."
    },
    {
      name: "James Reeves",
      role: "Event Director",
      quote: "The vendor management feature alone saved me 10 hours per week. Essential tool for any serious EO."
    },
    {
      name: "Priya Sharma",
      role: "Luxury Events Co.",
      quote: "My clients are always impressed by the seamless communication. It elevated our entire brand perception."
    }
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden flex-1 flex flex-col justify-center">
        {/* Abstract Background Element */}
        <div className="absolute inset-0 z-0">
          <img 
            src={`${import.meta.env.BASE_URL}images/hero-abstract.png`}
            alt="Premium abstract background" 
            className="w-full h-full object-cover opacity-30 mix-blend-screen"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background/80 to-background" />
        </div>
        
        {/* Subtle glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] z-0" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-medium text-white mb-6 leading-[1.1]">
              Manage Your Events <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-yellow-200 to-primary">Like a Pro</span>
            </h1>
            <p className="mt-4 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto font-light mb-10">
              The all-in-one platform designed specifically for professional Wedding & Event Organizers to scale their business.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/login">
                <Button size="lg" className="w-full sm:w-auto h-14 px-8 text-lg bg-primary hover:bg-primary/90 text-primary-foreground shadow-[0_0_40px_-10px_rgba(201,168,76,0.5)] transition-all hover:scale-105">
                  Get Started Free
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 relative z-10 bg-[#070707] border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl md:text-5xl text-white mb-4">Everything you need</h2>
            <div className="w-24 h-1 bg-primary mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className={i === 3 ? "md:col-span-2 lg:col-span-1" : i === 4 ? "md:col-span-2 lg:col-span-2" : ""}
              >
                <Card className="p-8 h-full bg-card/50 border-white/5 hover:border-primary/30 transition-colors group">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-medium text-white mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{feature.desc}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl md:text-5xl text-white mb-4">Trusted by Professionals</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((test, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.5 }}
              >
                <Card className="p-8 bg-gradient-to-b from-card to-background border-white/5 relative">
                  <div className="absolute top-8 right-8 opacity-10">
                    <CheckCircle2 className="w-12 h-12 text-primary" />
                  </div>
                  <p className="text-lg text-white/90 italic mb-8 relative z-10">"{test.quote}"</p>
                  <div>
                    <h4 className="font-medium text-primary">{test.name}</h4>
                    <p className="text-sm text-muted-foreground">{test.role}</p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

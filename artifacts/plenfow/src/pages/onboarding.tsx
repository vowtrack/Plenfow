import { useState } from "react";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Plus, Trash2, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

type Vendor = {
  id: string;
  name: string;
  role: string;
  email: string;
  whatsapp: string;
};

export function OnboardingPage() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const totalSteps = 4;

  const [formData, setFormData] = useState({
    eventName: "",
    eventDate: undefined as Date | undefined,
    eventType: "",
    clientName: "",
    clientEmail: "",
    clientWhatsapp: "",
    vendors: [] as Vendor[]
  });

  const nextStep = () => setStep(s => Math.min(s + 1, totalSteps));
  const prevStep = () => setStep(s => Math.max(s - 1, 1));

  const addVendor = () => {
    setFormData(prev => ({
      ...prev,
      vendors: [...prev.vendors, { id: crypto.randomUUID(), name: "", role: "", email: "", whatsapp: "" }]
    }));
  };

  const removeVendor = (id: string) => {
    setFormData(prev => ({
      ...prev,
      vendors: prev.vendors.filter(v => v.id !== id)
    }));
  };

  const updateVendor = (id: string, field: keyof Vendor, value: string) => {
    setFormData(prev => ({
      ...prev,
      vendors: prev.vendors.map(v => v.id === id ? { ...v, [field]: value } : v)
    }));
  };

  const handleSubmit = () => {
    toast({
      title: "Success!",
      description: "Magic links sent successfully to client and vendors!",
      className: "bg-background border-primary text-white",
    });
    setTimeout(() => {
      setLocation("/");
    }, 2000);
  };

  const stepTitles = ["Event Info", "Client Details", "Vendors", "Review"];

  return (
    <div className="min-h-screen bg-background flex flex-col pt-12 pb-24 px-4 sm:px-6">
      <div className="max-w-3xl w-full mx-auto">
        
        {/* Header & Progress */}
        <div className="mb-12">
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded bg-primary/10 flex items-center justify-center border border-primary/30">
                <span className="font-serif font-bold text-primary text-xl">P</span>
              </div>
              <span className="font-serif font-semibold text-xl text-white">Plenfow</span>
            </div>
            <div className="text-sm font-medium text-muted-foreground">
              Step {step} of {totalSteps}
            </div>
          </div>

          <div className="relative">
            <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-white/5 -translate-y-1/2 z-0" />
            <div className="relative z-10 flex justify-between">
              {stepTitles.map((title, i) => {
                const stepNumber = i + 1;
                const isActive = stepNumber === step;
                const isPassed = stepNumber < step;
                return (
                  <div key={title} className="flex flex-col items-center gap-3">
                    <div 
                      className={cn(
                        "w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-colors duration-300",
                        isActive ? "bg-primary text-primary-foreground shadow-[0_0_15px_rgba(201,168,76,0.5)]" :
                        isPassed ? "bg-primary/20 text-primary border border-primary/30" :
                        "bg-card border border-white/10 text-muted-foreground"
                      )}
                    >
                      {isPassed ? <CheckCircle2 className="w-4 h-4" /> : stepNumber}
                    </div>
                    <span className={cn(
                      "text-xs font-medium hidden sm:block transition-colors",
                      isActive ? "text-white" : isPassed ? "text-primary/80" : "text-muted-foreground"
                    )}>
                      {title}
                    </span>
                  </div>
                );
              })}
            </div>
            {/* Active progress line */}
            <div 
              className="absolute top-1/2 left-0 h-[2px] bg-primary -translate-y-1/2 z-0 transition-all duration-500 ease-out"
              style={{ width: `${((step - 1) / (totalSteps - 1)) * 100}%` }}
            />
          </div>
        </div>

        {/* Form Area */}
        <Card className="bg-card/40 backdrop-blur-xl border-white/5 shadow-2xl p-6 sm:p-10 relative overflow-hidden min-h-[500px]">
          {/* Subtle gradient blob inside card */}
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8 relative z-10"
              >
                <div>
                  <h2 className="font-serif text-3xl text-white mb-2">Tell us about your event</h2>
                  <p className="text-muted-foreground">Let's set up the foundation for your next masterpiece.</p>
                </div>
                
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="eventName">Project / Event Name</Label>
                    <Input 
                      id="eventName" 
                      placeholder="e.g. Smith & Doe Wedding"
                      value={formData.eventName}
                      onChange={(e) => setFormData({...formData, eventName: e.target.value})}
                      className="h-12 bg-background/50"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2 flex flex-col">
                      <Label>Event Date</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full justify-start text-left font-normal h-12 bg-background/50 border-white/10 hover:bg-background/80 hover:text-white",
                              !formData.eventDate && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4 text-primary" />
                            {formData.eventDate ? format(formData.eventDate, "PPP") : <span>Pick a date</span>}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0 bg-card border-white/10" align="start">
                          <Calendar
                            mode="single"
                            selected={formData.eventDate}
                            onSelect={(date) => setFormData({...formData, eventDate: date})}
                            initialFocus
                            className="bg-card text-white"
                          />
                        </PopoverContent>
                      </Popover>
                    </div>

                    <div className="space-y-2">
                      <Label>Event Type</Label>
                      <Select 
                        value={formData.eventType} 
                        onValueChange={(val) => setFormData({...formData, eventType: val})}
                      >
                        <SelectTrigger className="h-12 bg-background/50 border-white/10">
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent className="bg-card border-white/10 text-white">
                          <SelectItem value="Wedding">Wedding</SelectItem>
                          <SelectItem value="Birthday">Birthday Party</SelectItem>
                          <SelectItem value="Corporate">Corporate Event</SelectItem>
                          <SelectItem value="Anniversary">Anniversary</SelectItem>
                          <SelectItem value="Other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8 relative z-10"
              >
                <div>
                  <h2 className="font-serif text-3xl text-white mb-2">Who is your client?</h2>
                  <p className="text-muted-foreground">We'll use this to set up their dedicated portal.</p>
                </div>

                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="clientName">Full Name</Label>
                    <Input 
                      id="clientName" 
                      placeholder="Jane Doe"
                      value={formData.clientName}
                      onChange={(e) => setFormData({...formData, clientName: e.target.value})}
                      className="h-12 bg-background/50"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="clientEmail">Email Address</Label>
                    <Input 
                      id="clientEmail" 
                      type="email"
                      placeholder="jane@example.com"
                      value={formData.clientEmail}
                      onChange={(e) => setFormData({...formData, clientEmail: e.target.value})}
                      className="h-12 bg-background/50"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="clientWhatsapp">WhatsApp Number</Label>
                    <div className="flex">
                      <div className="flex items-center justify-center px-4 bg-background/80 border border-white/10 border-r-0 rounded-l-md text-muted-foreground text-sm font-medium">
                        +1
                      </div>
                      <Input 
                        id="clientWhatsapp" 
                        placeholder="555 123 4567"
                        value={formData.clientWhatsapp}
                        onChange={(e) => setFormData({...formData, clientWhatsapp: e.target.value})}
                        className="h-12 bg-background/50 rounded-l-none"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8 relative z-10"
              >
                <div>
                  <h2 className="font-serif text-3xl text-white mb-2">Add your vendors</h2>
                  <p className="text-muted-foreground">Build your dream team for this event.</p>
                </div>

                <div className="space-y-6 max-h-[50vh] overflow-y-auto pr-2 custom-scrollbar">
                  {formData.vendors.map((vendor, index) => (
                    <Card key={vendor.id} className="p-6 bg-background/30 border-white/5 relative group">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="absolute top-2 right-2 text-muted-foreground opacity-0 group-hover:opacity-100 hover:text-destructive hover:bg-destructive/10 transition-all"
                        onClick={() => removeVendor(vendor.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                      
                      <div className="mb-4">
                        <span className="text-xs font-semibold uppercase tracking-wider text-primary">Vendor {index + 1}</span>
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label className="text-xs">Company / Name</Label>
                          <Input 
                            value={vendor.name} 
                            onChange={(e) => updateVendor(vendor.id, "name", e.target.value)}
                            placeholder="e.g. Bloom Florals"
                            className="bg-background/80 h-10"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-xs">Role</Label>
                          <Select 
                            value={vendor.role} 
                            onValueChange={(val) => updateVendor(vendor.id, "role", val)}
                          >
                            <SelectTrigger className="bg-background/80 h-10">
                              <SelectValue placeholder="Select role" />
                            </SelectTrigger>
                            <SelectContent className="bg-card border-white/10 text-white">
                              <SelectItem value="Catering">Catering</SelectItem>
                              <SelectItem value="Decoration">Decoration</SelectItem>
                              <SelectItem value="PhotoVideo">Photo/Video</SelectItem>
                              <SelectItem value="Music">Music/Entertainment</SelectItem>
                              <SelectItem value="Florist">Florist</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label className="text-xs">Email</Label>
                          <Input 
                            type="email"
                            value={vendor.email} 
                            onChange={(e) => updateVendor(vendor.id, "email", e.target.value)}
                            placeholder="vendor@example.com"
                            className="bg-background/80 h-10"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-xs">WhatsApp</Label>
                          <Input 
                            value={vendor.whatsapp} 
                            onChange={(e) => updateVendor(vendor.id, "whatsapp", e.target.value)}
                            placeholder="+1 234 567 890"
                            className="bg-background/80 h-10"
                          />
                        </div>
                      </div>
                    </Card>
                  ))}

                  <Button 
                    variant="outline" 
                    onClick={addVendor}
                    className="w-full h-14 border-dashed border-primary/40 text-primary hover:bg-primary/10 hover:text-primary hover:border-primary transition-all"
                  >
                    <Plus className="w-4 h-4 mr-2" /> Add Another Vendor
                  </Button>
                </div>
              </motion.div>
            )}

            {step === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8 relative z-10"
              >
                <div>
                  <h2 className="font-serif text-3xl text-white mb-2">Review & Send</h2>
                  <p className="text-muted-foreground">Verify details before creating the magic links.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Event Summary */}
                  <Card className="p-6 bg-background/40 border-white/5">
                    <h3 className="text-lg font-serif text-white border-b border-white/10 pb-3 mb-4">Event Details</h3>
                    <dl className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <dt className="text-muted-foreground">Name</dt>
                        <dd className="font-medium text-white text-right">{formData.eventName || "—"}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-muted-foreground">Type</dt>
                        <dd className="font-medium text-white text-right">{formData.eventType || "—"}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-muted-foreground">Date</dt>
                        <dd className="font-medium text-white text-right">
                          {formData.eventDate ? format(formData.eventDate, "PPP") : "—"}
                        </dd>
                      </div>
                    </dl>
                  </Card>

                  {/* Client Summary */}
                  <Card className="p-6 bg-background/40 border-white/5">
                    <h3 className="text-lg font-serif text-white border-b border-white/10 pb-3 mb-4">Client Details</h3>
                    <dl className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <dt className="text-muted-foreground">Name</dt>
                        <dd className="font-medium text-white text-right">{formData.clientName || "—"}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-muted-foreground">Email</dt>
                        <dd className="font-medium text-white text-right">{formData.clientEmail || "—"}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-muted-foreground">WhatsApp</dt>
                        <dd className="font-medium text-white text-right">{formData.clientWhatsapp || "—"}</dd>
                      </div>
                    </dl>
                  </Card>
                </div>

                {formData.vendors.length > 0 && (
                  <Card className="p-6 bg-background/40 border-white/5">
                    <h3 className="text-lg font-serif text-white border-b border-white/10 pb-3 mb-4">
                      Vendors ({formData.vendors.length})
                    </h3>
                    <div className="space-y-4">
                      {formData.vendors.map(v => (
                        <div key={v.id} className="flex justify-between items-center text-sm p-3 bg-background/50 rounded-lg">
                          <div>
                            <p className="font-medium text-white">{v.name || "Unnamed Vendor"}</p>
                            <p className="text-xs text-primary">{v.role || "No role"}</p>
                          </div>
                          <div className="text-right text-muted-foreground text-xs space-y-1">
                            <p>{v.email}</p>
                            <p>{v.whatsapp}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Card>
                )}

                <div className="p-4 border border-primary/30 bg-primary/5 rounded-xl flex items-start gap-4">
                  <CheckCircle2 className="w-6 h-6 text-primary shrink-0 mt-0.5" />
                  <p className="text-sm text-white/90 leading-relaxed">
                    Magic links will be generated and sent via <strong className="text-white">Email</strong> and <strong className="text-white">WhatsApp</strong> to your client and all added vendors automatically upon submission.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </Card>

        {/* Footer Actions */}
        <div className="mt-8 flex justify-between items-center">
          <Button 
            variant="ghost" 
            onClick={prevStep}
            disabled={step === 1}
            className="text-muted-foreground hover:text-white"
          >
            Back
          </Button>
          
          {step < totalSteps ? (
            <Button 
              onClick={nextStep}
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 font-medium shadow-lg shadow-primary/20"
            >
              Next Step
            </Button>
          ) : (
            <Button 
              onClick={handleSubmit}
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 font-medium shadow-[0_0_20px_rgba(201,168,76,0.4)] hover:scale-105 transition-all"
            >
              Send Magic Links
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

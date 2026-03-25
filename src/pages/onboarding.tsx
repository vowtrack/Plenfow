// ============================================================
// src/pages/onboarding.tsx
// Form onboarding 4 langkah untuk bikin event baru.
// Step 1: Info event | Step 2: Data klien | Step 3: Vendor | Step 4: Review
//
// TODO: Di step 4, fungsi handleSubmit perlu diupdate untuk
//       menyimpan data ke Supabase setelah setup.
// ============================================================
import { useState } from "react";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { format } from "date-fns";
import { Plus, Trash2, CheckCircle2, Calendar, ChevronDown } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

// Tipe data untuk satu vendor
type Vendor = {
  id: string;
  name: string;
  role: string;
  email: string;
  whatsapp: string;
};

// Judul tiap step untuk ditampilkan di progress bar
const stepTitles = ["Event Info", "Client Details", "Vendors", "Review"];

// Pilihan tipe event
const eventTypes = ["Wedding", "Birthday Party", "Corporate Event", "Anniversary", "Other"];

// Pilihan role vendor
const vendorRoles = ["Catering", "Decoration", "Photo/Video", "Music/Entertainment", "Florist", "Other"];

export function OnboardingPage() {
  const [, setLocation] = useLocation();
  const [step, setStep] = useState(1);
  const totalSteps = 4;

  // Semua data form disimpan di satu state
  const [formData, setFormData] = useState({
    eventName: "",
    eventDate: "" as string,
    eventType: "",
    clientName: "",
    clientEmail: "",
    clientCountryCode: "+62", // Default Indonesia, user bisa ganti
    clientWhatsapp: "",
    vendors: [] as Vendor[],
  });

  const nextStep = () => setStep((s) => Math.min(s + 1, totalSteps));
  const prevStep = () => setStep((s) => Math.max(s - 1, 1));

  // Tambah vendor baru (kosong)
  const addVendor = () => {
    setFormData((prev) => ({
      ...prev,
      vendors: [...prev.vendors, { id: crypto.randomUUID(), name: "", role: "", email: "", whatsapp: "" }],
    }));
  };

  // Hapus vendor berdasarkan id
  const removeVendor = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      vendors: prev.vendors.filter((v) => v.id !== id),
    }));
  };

  // Update satu field dari satu vendor
  const updateVendor = (id: string, field: keyof Vendor, value: string) => {
    setFormData((prev) => ({
      ...prev,
      vendors: prev.vendors.map((v) => (v.id === id ? { ...v, [field]: value } : v)),
    }));
  };

  const handleSubmit = () => {
    // --------------------------------------------------------
    // TODO: Simpan formData ke Supabase setelah setup.
    // Contoh:
    // const { data, error } = await supabase.from("events").insert({
    //   name: formData.eventName,
    //   date: formData.eventDate,
    //   ...
    // });
    // --------------------------------------------------------

    toast.success("Magic links sent to client and vendors!");
    setTimeout(() => setLocation("/"), 2000);
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6" style={{ background: "var(--bg)" }}>
      <div className="max-w-3xl mx-auto">

        {/* Header: Logo + progress bar */}
        <div className="mb-10">
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-2">
              <div
                className="w-8 h-8 rounded flex items-center justify-center"
                style={{ background: "var(--gold-dim)", border: "1px solid rgba(201,168,76,0.3)" }}
              >
                <span className="font-serif font-bold text-xl" style={{ color: "var(--gold)" }}>P</span>
              </div>
              <span className="font-serif font-semibold text-xl text-white">Plenfow</span>
            </div>
            <span className="text-sm" style={{ color: "var(--text-muted)" }}>
              Step {step} of {totalSteps}
            </span>
          </div>

          {/* Progress steps */}
          <div className="relative">
            {/* Garis background */}
            <div className="absolute top-4 left-0 right-0 h-px" style={{ background: "rgba(255,255,255,0.07)" }} />
            {/* Garis progress aktif */}
            <div
              className="absolute top-4 left-0 h-px transition-all duration-500"
              style={{
                background: "var(--gold)",
                width: `${((step - 1) / (totalSteps - 1)) * 100}%`,
              }}
            />
            {/* Step dots */}
            <div className="relative flex justify-between">
              {stepTitles.map((title, i) => {
                const n = i + 1;
                const isActive = n === step;
                const isPassed = n < step;
                return (
                  <div key={title} className="flex flex-col items-center gap-2">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300"
                      style={{
                        background: isActive ? "var(--gold)" : isPassed ? "var(--gold-dim)" : "var(--bg-card)",
                        border: `1px solid ${isActive || isPassed ? "var(--gold)" : "rgba(255,255,255,0.1)"}`,
                        color: isActive ? "#0a0a0a" : isPassed ? "var(--gold)" : "var(--text-muted)",
                      }}
                    >
                      {isPassed ? <CheckCircle2 className="w-4 h-4" /> : n}
                    </div>
                    <span
                      className="text-xs font-medium hidden sm:block"
                      style={{ color: isActive ? "white" : isPassed ? "var(--gold)" : "var(--text-muted)" }}
                    >
                      {title}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Form card */}
        <div className="card relative overflow-hidden" style={{ minHeight: 480 }}>
          <AnimatePresence mode="wait">

            {/* ---- STEP 1: Event Info ---- */}
            {step === 1 && (
              <motion.div key="s1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex flex-col gap-6">
                <div>
                  <h2 className="text-3xl text-white mb-1">Tell us about your event</h2>
                  <p style={{ color: "var(--text-muted)" }}>Let's set up the foundation for your next masterpiece.</p>
                </div>

                <div>
                  <label className="form-label">Project / Event Name</label>
                  <input
                    className="input-field"
                    placeholder="e.g. Smith & Doe Wedding"
                    value={formData.eventName}
                    onChange={(e) => setFormData({ ...formData, eventName: e.target.value })}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Date picker native HTML — lebih simpel, compatible semua browser */}
                  <div>
                    <label className="form-label">Event Date</label>
                    <input
                      type="date"
                      className="input-field"
                      value={formData.eventDate}
                      onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
                      style={{ colorScheme: "dark" }}
                    />
                  </div>

                  {/* Event type dropdown */}
                  <div>
                    <label className="form-label">Event Type</label>
                    <div className="relative">
                      <select
                        className="input-field appearance-none pr-10"
                        value={formData.eventType}
                        onChange={(e) => setFormData({ ...formData, eventType: e.target.value })}
                        style={{ background: "rgba(255,255,255,0.05)" }}
                      >
                        <option value="" disabled>Select type</option>
                        {eventTypes.map((t) => <option key={t} value={t}>{t}</option>)}
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none" style={{ color: "var(--text-muted)" }} />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* ---- STEP 2: Client Details ---- */}
            {step === 2 && (
              <motion.div key="s2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex flex-col gap-6">
                <div>
                  <h2 className="text-3xl text-white mb-1">Who is your client?</h2>
                  <p style={{ color: "var(--text-muted)" }}>We'll use this to set up their dedicated portal.</p>
                </div>

                <div>
                  <label className="form-label">Full Name</label>
                  <input className="input-field" placeholder="Jane Doe" value={formData.clientName} onChange={(e) => setFormData({ ...formData, clientName: e.target.value })} />
                </div>

                <div>
                  <label className="form-label">Email Address</label>
                  <input type="email" className="input-field" placeholder="jane@example.com" value={formData.clientEmail} onChange={(e) => setFormData({ ...formData, clientEmail: e.target.value })} />
                </div>

                {/* WhatsApp dengan country code yang bisa diubah */}
                <div>
                  <label className="form-label">WhatsApp Number</label>
                  <div className="flex gap-2">
                    {/* Input country code - user bisa ketik sendiri */}
                    <input
                      className="input-field w-20 text-center"
                      placeholder="+62"
                      value={formData.clientCountryCode}
                      onChange={(e) => setFormData({ ...formData, clientCountryCode: e.target.value })}
                    />
                    <input
                      className="input-field flex-1"
                      placeholder="812 3456 7890"
                      value={formData.clientWhatsapp}
                      onChange={(e) => setFormData({ ...formData, clientWhatsapp: e.target.value })}
                    />
                  </div>
                  <p className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>Masukkan kode negara dulu, lalu nomor teleponnya</p>
                </div>
              </motion.div>
            )}

            {/* ---- STEP 3: Vendors ---- */}
            {step === 3 && (
              <motion.div key="s3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex flex-col gap-6">
                <div>
                  <h2 className="text-3xl text-white mb-1">Add your vendors</h2>
                  <p style={{ color: "var(--text-muted)" }}>Build your dream team for this event.</p>
                </div>

                <div className="flex flex-col gap-4 max-h-96 overflow-y-auto pr-1">
                  {formData.vendors.map((vendor, index) => (
                    <div key={vendor.id} className="card relative group" style={{ background: "rgba(255,255,255,0.03)" }}>
                      {/* Hapus vendor */}
                      <button
                        onClick={() => removeVendor(vendor.id)}
                        className="absolute top-3 right-3 p-1.5 rounded opacity-0 group-hover:opacity-100 transition-opacity"
                        style={{ color: "var(--text-muted)", background: "transparent" }}
                        onMouseOver={(e) => (e.currentTarget.style.color = "#ef4444")}
                        onMouseOut={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>

                      <span className="text-xs font-semibold uppercase tracking-wider mb-4 block" style={{ color: "var(--gold)" }}>
                        Vendor {index + 1}
                      </span>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="form-label text-xs">Company / Name</label>
                          <input className="input-field" placeholder="e.g. Bloom Florals" value={vendor.name} onChange={(e) => updateVendor(vendor.id, "name", e.target.value)} />
                        </div>
                        <div>
                          <label className="form-label text-xs">Role</label>
                          <div className="relative">
                            <select
                              className="input-field appearance-none pr-8"
                              value={vendor.role}
                              onChange={(e) => updateVendor(vendor.id, "role", e.target.value)}
                              style={{ background: "rgba(255,255,255,0.05)" }}
                            >
                              <option value="" disabled>Select role</option>
                              {vendorRoles.map((r) => <option key={r} value={r}>{r}</option>)}
                            </select>
                            <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none" style={{ color: "var(--text-muted)" }} />
                          </div>
                        </div>
                        <div>
                          <label className="form-label text-xs">Email</label>
                          <input type="email" className="input-field" placeholder="vendor@example.com" value={vendor.email} onChange={(e) => updateVendor(vendor.id, "email", e.target.value)} />
                        </div>
                        <div>
                          <label className="form-label text-xs">WhatsApp</label>
                          <input className="input-field" placeholder="+62 812 xxx" value={vendor.whatsapp} onChange={(e) => updateVendor(vendor.id, "whatsapp", e.target.value)} />
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Tombol tambah vendor */}
                  <button
                    onClick={addVendor}
                    className="w-full py-4 rounded-lg flex items-center justify-center gap-2 text-sm font-medium transition-colors"
                    style={{
                      border: "1px dashed rgba(201,168,76,0.35)",
                      color: "var(--gold)",
                      background: "transparent",
                    }}
                    onMouseOver={(e) => (e.currentTarget.style.background = "var(--gold-dim)")}
                    onMouseOut={(e) => (e.currentTarget.style.background = "transparent")}
                  >
                    <Plus className="w-4 h-4" />
                    Add Another Vendor
                  </button>
                </div>
              </motion.div>
            )}

            {/* ---- STEP 4: Review ---- */}
            {step === 4 && (
              <motion.div key="s4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex flex-col gap-6">
                <div>
                  <h2 className="text-3xl text-white mb-1">Review & Send</h2>
                  <p style={{ color: "var(--text-muted)" }}>Verify details before creating the magic links.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Event summary */}
                  <div className="card" style={{ background: "rgba(255,255,255,0.03)" }}>
                    <h3 className="text-lg text-white mb-4 pb-3" style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}>Event Details</h3>
                    <dl className="flex flex-col gap-3 text-sm">
                      <Row label="Name" value={formData.eventName} />
                      <Row label="Type" value={formData.eventType} />
                      <Row label="Date" value={formData.eventDate ? format(new Date(formData.eventDate), "PPP") : "—"} />
                    </dl>
                  </div>

                  {/* Client summary */}
                  <div className="card" style={{ background: "rgba(255,255,255,0.03)" }}>
                    <h3 className="text-lg text-white mb-4 pb-3" style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}>Client Details</h3>
                    <dl className="flex flex-col gap-3 text-sm">
                      <Row label="Name" value={formData.clientName} />
                      <Row label="Email" value={formData.clientEmail} />
                      <Row label="WhatsApp" value={`${formData.clientCountryCode} ${formData.clientWhatsapp}`} />
                    </dl>
                  </div>
                </div>

                {/* Vendor summary */}
                {formData.vendors.length > 0 && (
                  <div className="card" style={{ background: "rgba(255,255,255,0.03)" }}>
                    <h3 className="text-lg text-white mb-4 pb-3" style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
                      Vendors ({formData.vendors.length})
                    </h3>
                    <div className="flex flex-col gap-3">
                      {formData.vendors.map((v) => (
                        <div key={v.id} className="flex justify-between items-center text-sm p-3 rounded-lg" style={{ background: "rgba(255,255,255,0.04)" }}>
                          <div>
                            <p className="font-medium text-white">{v.name || "Unnamed Vendor"}</p>
                            <p className="text-xs" style={{ color: "var(--gold)" }}>{v.role || "No role"}</p>
                          </div>
                          <div className="text-right text-xs" style={{ color: "var(--text-muted)" }}>
                            <p>{v.email}</p>
                            <p>{v.whatsapp}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Info magic links */}
                <div className="flex items-start gap-4 p-4 rounded-xl" style={{ background: "var(--gold-dim)", border: "1px solid rgba(201,168,76,0.25)" }}>
                  <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" style={{ color: "var(--gold)" }} />
                  <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.85)" }}>
                    Magic links will be generated and sent via <strong className="text-white">Email</strong> and <strong className="text-white">WhatsApp</strong> to your client and all added vendors automatically upon submission.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Navigation buttons */}
        <div className="mt-6 flex justify-between items-center">
          <button
            onClick={prevStep}
            disabled={step === 1}
            className="btn-ghost px-6 py-2.5"
            style={{ opacity: step === 1 ? 0.3 : 1, cursor: step === 1 ? "not-allowed" : "pointer" }}
          >
            Back
          </button>

          {step < totalSteps ? (
            <button onClick={nextStep} className="btn-primary px-8 py-2.5">
              Next Step
            </button>
          ) : (
            <button onClick={handleSubmit} className="btn-primary px-8 py-2.5">
              Send Magic Links ✨
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// Helper komponen kecil untuk baris di review summary
function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between">
      <dt style={{ color: "var(--text-muted)" }}>{label}</dt>
      <dd className="font-medium text-white text-right">{value || "—"}</dd>
    </div>
  );
}

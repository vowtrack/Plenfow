// Halaman 404 - muncul kalau URL tidak ditemukan
import { Link } from "wouter";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ background: "var(--bg)" }}>
      <div className="text-center">
        <h1 className="text-6xl font-bold mb-4" style={{ color: "var(--gold)" }}>404</h1>
        <h2 className="text-2xl text-white mb-3">Page Not Found</h2>
        <p className="mb-8" style={{ color: "var(--text-muted)" }}>Halaman yang kamu cari tidak ada.</p>
        <Link href="/" className="btn-primary inline-flex">Back to Home</Link>
      </div>
    </div>
  );
}

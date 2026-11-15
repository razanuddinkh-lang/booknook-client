import Link from "next/link";
import { BookOpen, Facebook, Instagram, Mail, MapPin, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-24 bg-[#142d27] text-white">
      <div className="page-shell grid gap-12 py-14 md:grid-cols-[1.5fr_1fr_1fr]">
        <div>
          <Link href="/" className="mb-4 inline-flex items-center gap-2.5">
            <span className="grid size-10 place-items-center rounded-2xl bg-[#e8b55d] text-[#142d27]"><BookOpen size={22} /></span>
            <span className="font-display text-2xl font-bold">BookNook<span className="text-[#e8b55d]">.</span></span>
          </Link>
          <p className="max-w-sm text-sm leading-7 text-white/65">A welcoming corner for curious minds. Discover a story, share a book, and keep good ideas moving from reader to reader.</p>
          <div className="mt-5 flex gap-2">
            <a aria-label="Facebook" href="https://facebook.com" target="_blank" rel="noreferrer" className="social-icon"><Facebook size={17} /></a>
            <a aria-label="Instagram" href="https://instagram.com" target="_blank" rel="noreferrer" className="social-icon"><Instagram size={17} /></a>
            <a aria-label="X" href="https://x.com" target="_blank" rel="noreferrer" className="social-icon text-sm font-bold">X</a>
          </div>
        </div>
        <div>
          <h3 className="footer-heading">Explore</h3>
          <div className="flex flex-col gap-3 text-sm text-white/65">
            <Link href="/books" className="hover:text-[#e8b55d]">All Books</Link>
            <Link href="/add-book" className="hover:text-[#e8b55d]">Share a Book</Link>
            <Link href="/my-borrows" className="hover:text-[#e8b55d]">My Borrows</Link>
          </div>
        </div>
        <div>
          <h3 className="footer-heading">Get in touch</h3>
          <div className="flex flex-col gap-3 text-sm text-white/65">
            <p className="flex items-center gap-2"><Mail size={16} className="text-[#e8b55d]" /> hello@booknook.example</p>
            <p className="flex items-center gap-2"><Phone size={16} className="text-[#e8b55d]" /> +1 (555) 013-2026</p>
            <p className="flex items-center gap-2"><MapPin size={16} className="text-[#e8b55d]" /> A friendly corner of the internet</p>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="page-shell flex flex-col justify-between gap-2 py-5 text-xs text-white/45 sm:flex-row">
          <p>© {new Date().getFullYear()} BookNook. Made for readers, by readers.</p>
          <p>Read more. Share more. Grow together.</p>
        </div>
      </div>
    </footer>
  );
}

import Link from "next/link";
import { BookOpen, Home } from "lucide-react";

export default function NotFound() {
  return <section className="page-shell grid min-h-[65vh] place-items-center py-16 text-center"><div><span className="mx-auto mb-6 grid size-20 place-items-center rounded-3xl bg-primary/10 text-primary"><BookOpen size={36} /></span><p className="eyebrow">404 · Page not found</p><h1 className="section-title mt-3">This page wandered off.</h1><p className="mx-auto mt-4 max-w-md leading-7 text-base-content/60">The page you are looking for may have moved, or the link may be out of date.</p><Link href="/" className="btn btn-primary mt-8 rounded-full px-7"><Home size={16} /> Back to Home</Link></div></section>;
}

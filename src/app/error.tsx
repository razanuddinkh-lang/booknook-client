"use client";

import { useEffect } from "react";
import Link from "next/link";
import toast from "react-hot-toast";

export default function ErrorPage({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => { toast.error(error.message || "Something went wrong."); }, [error]);
  return <section className="page-shell py-24 text-center"><p className="eyebrow">A little hiccup</p><h1 className="section-title">We couldn’t load this page.</h1><p className="mt-3 text-base-content/60">Please try again.</p><div className="mt-7 flex justify-center gap-3"><button className="btn btn-primary rounded-full" onClick={reset}>Try again</button><Link href="/" className="btn btn-outline rounded-full">Home</Link></div></section>;
}

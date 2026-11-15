"use client";

import Link from "next/link";
import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { BookOpen, Eye, EyeOff, Mail, Lock } from "lucide-react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const requestedUrl = searchParams.get("callbackUrl") || "/";
  const callbackUrl = requestedUrl.startsWith("/") && !requestedUrl.startsWith("//") ? requestedUrl : "/";
  useEffect(() => { document.title = "BookNook | Login"; }, []);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [busy, setBusy] = useState(false);

  async function handleLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    const result = await authClient.signIn.email({ email, password, callbackURL: callbackUrl });
    setBusy(false);
    if (result.error) return toast.error(result.error.message || "Login failed. Check your credentials.");
    toast.success("Welcome back to BookNook!");
    router.push(callbackUrl);
    router.refresh();
  }

  async function googleLogin() {
    setBusy(true);
    const result = await authClient.signIn.social({ provider: "google", callbackURL: callbackUrl });
    if (result.error) { setBusy(false); toast.error(result.error.message || "Google login failed."); }
  }

  return (
    <div className="form-panel w-full max-w-md">
      <div className="mb-7 text-center"><span className="mx-auto mb-4 grid size-12 place-items-center rounded-2xl bg-primary text-primary-content"><BookOpen size={24} /></span><p className="eyebrow">Your shelf is waiting</p><h1 className="mt-2 font-display text-3xl font-bold">Welcome back</h1><p className="mt-2 text-sm text-base-content/55">Log in to continue your reading journey.</p></div>
      <form onSubmit={handleLogin} className="space-y-4">
        <label className="block"><span className="form-label">Email address</span><span className="relative block"><Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-base-content/35" size={17} /><input className="field-input pl-10" type="email" autoComplete="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" /></span></label>
        <label className="block"><span className="form-label">Password</span><span className="relative block"><Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-base-content/35" size={17} /><input className="field-input pl-10 pr-11" type={showPassword ? "text" : "password"} autoComplete="current-password" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Your password" /><button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-base-content/45">{showPassword ? <EyeOff size={17} /> : <Eye size={17} />}</button></span></label>
        <div className="text-right text-xs text-base-content/50">Forgot password? <span title="Password recovery is disabled in this assignment." className="font-semibold">Not enabled</span></div>
        <button className="btn btn-primary min-h-12 w-full rounded-xl" disabled={busy}>{busy ? <span className="loading loading-spinner loading-sm" /> : "Login"}</button>
      </form>
      <div className="divider my-5 text-xs text-base-content/40">OR CONTINUE WITH</div>
      <button onClick={googleLogin} disabled={busy} className="btn btn-outline min-h-12 w-full rounded-xl"> <span className="text-base font-bold">G</span> Continue with Google</button>
      <p className="mt-6 text-center text-sm text-base-content/60">New to BookNook? <Link href="/register" className="font-bold text-primary hover:underline">Create an account</Link></p>
    </div>
  );
}

export default function LoginPage() {
  return <section className="page-shell grid min-h-[75vh] place-items-center py-14"><Suspense fallback={<div className="loading loading-spinner loading-lg" />}><LoginForm /></Suspense></section>;
}

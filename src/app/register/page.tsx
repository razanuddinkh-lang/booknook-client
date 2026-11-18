"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { BookOpen, Eye, EyeOff, UserRound, Mail, Lock, Image as ImageIcon } from "lucide-react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function RegisterPage() {
  const router = useRouter();
  useEffect(() => { document.title = "BookNook | Register"; }, []);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [busy, setBusy] = useState(false);
  const hasUpper = /[A-Z]/.test(password);
  const hasLower = /[a-z]/.test(password);
  const hasLength = password.length >= 6;
  const passwordValid = hasUpper && hasLower && hasLength;

  async function handleRegister(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!passwordValid) return toast.error("Use 6+ characters with uppercase and lowercase letters.");
    setBusy(true);
    const result = await authClient.signUp.email({ name: name.trim(), email: email.trim(), password, image: image.trim() || undefined });
    setBusy(false);
    if (result.error) return toast.error(result.error.message || "Registration failed.");
    toast.success("Account created! Please log in.");
    router.push("/login");
  }

  async function googleRegister() {
    setBusy(true);
    const result = await authClient.signIn.social({ provider: "google", callbackURL: "/" });
    if (result.error) { setBusy(false); toast.error(result.error.message || "Google sign-up failed."); }
  }

  return (
    <section className="page-shell grid min-h-[78vh] place-items-center py-12">
      <div className="form-panel w-full max-w-lg">
        <div className="mb-7 text-center"><span className="mx-auto mb-4 grid size-12 place-items-center rounded-2xl bg-primary text-primary-content"><BookOpen size={24} /></span><p className="eyebrow">Join the reading circle</p><h1 className="mt-2 font-display text-3xl font-bold">Create your account</h1><p className="mt-2 text-sm text-base-content/55">A few details and you’re ready to explore.</p></div>
        <form onSubmit={handleRegister} className="space-y-4">
          <label className="block"><span className="form-label">Your name</span><span className="relative block"><UserRound className="absolute left-1 top-1/2 -translate-y-1/2 text-base-content/35" size={17} /><input className="field-input pl-10" required minLength={2} value={name} onChange={(e) => setName(e.target.value)} placeholder="Osman Hadi" autoComplete="name" /></span></label>
          <label className="block"><span className="form-label">Email address</span><span className="relative block"><Mail className="absolute left-1 top-1/2 -translate-y-1/2 text-base-content/35" size={17} /><input className="field-input pl-10" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" autoComplete="email" /></span></label>
          <label className="block"><span className="form-label">Profile photo URL <span className="font-normal text-base-content/45">(optional)</span></span><span className="relative block"><ImageIcon className="absolute left-1 top-1/2 -translate-y-1/2 text-base-content/35" size={17} /><input className="field-input pl-10" type="url" value={image} onChange={(e) => setImage(e.target.value)} placeholder="https://example.com/photo.jpg" /></span></label>
          <label className="block"><span className="form-label">Password</span><span className="relative block"><Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-base-content/35" size={17} /><input className="field-input pl-10 pr-11" type={showPassword ? "text" : "password"} required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Create a strong password" autoComplete="new-password" /><button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-base-content/45">{showPassword ? <EyeOff size={17} /> : <Eye size={17} />}</button></span></label>
          <div className="grid grid-cols-3 gap-2 text-[11px] font-semibold">
            <span className={hasUpper ? "text-success" : "text-base-content/45"}>{hasUpper ? "✓" : "○"} Uppercase</span>
            <span className={hasLower ? "text-success" : "text-base-content/45"}>{hasLower ? "✓" : "○"} Lowercase</span>
            <span className={hasLength ? "text-success" : "text-base-content/45"}>{hasLength ? "✓" : "○"} 6+ characters</span>
          </div>
          <button className="btn btn-primary min-h-12 w-full rounded-xl" disabled={busy || !passwordValid}>{busy ? <span className="loading loading-spinner loading-sm" /> : "Register"}</button>
        </form>
        <div className="divider my-5 text-xs text-base-content/40">OR CONTINUE WITH</div>
        <button onClick={googleRegister} disabled={busy} className="btn btn-outline min-h-12 w-full rounded-xl"><span className="text-base font-bold">G</span> Continue with Google</button>
        <p className="mt-6 text-center text-sm text-base-content/60">Already have an account? <Link href="/login" className="font-bold text-primary hover:underline">Login</Link></p>
      </div>
    </section>
  );
}

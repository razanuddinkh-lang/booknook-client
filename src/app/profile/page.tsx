import type { Metadata } from "next";
import { requireSession } from "@/lib/server-auth";

export const metadata: Metadata = { title: "My Profile" };
export default async function ProfilePage() {
  const session = await requireSession("/profile");
  return <section className="page-shell grid min-h-[65vh] place-items-center py-14"><div className="form-panel w-full max-w-lg text-center">{session.user.image ? <img src={session.user.image} alt={session.user.name} className="mx-auto mb-4 size-24 rounded-full object-cover" /> : <div className="mx-auto mb-4 grid size-24 place-items-center rounded-full bg-primary/10 text-3xl font-bold text-primary">{session.user.name.slice(0, 1).toUpperCase()}</div>}<p className="eyebrow">Your BookNook account</p><h1 className="mt-2 font-display text-3xl font-bold">{session.user.name}</h1><p className="mt-2 text-sm text-base-content/60">{session.user.email}</p><p className="mt-6 text-xs text-base-content/45">Profile details are managed by Better Auth for this assignment.</p></div></section>;
}

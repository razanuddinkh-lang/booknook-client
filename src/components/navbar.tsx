"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { BookOpen, ChevronDown, LogOut, Menu, UserRound } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { authClient, useSession } from "@/lib/auth-client";
import ThemeToggle from "@/components/theme-toggle";

const baseLinks = [
  { href: "/", label: "Home" },
  { href: "/books", label: "All Books" },
];
const privateLinks = [
  { href: "/add-book", label: "Add Book" },
  { href: "/my-books", label: "My Books" },
  { href: "/my-borrows", label: "My Borrows" },
];

export default function Navbar() {
  const { data: session, isPending } = useSession();
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const links = session ? [...baseLinks, ...privateLinks] : baseLinks;

  async function logout() {
    await authClient.signOut();
    toast.success("You have logged out.");
    router.push("/");
    router.refresh();
  }

  return (
    <header className="sticky top-0 z-40 border-b border-base-300/70 bg-base-100/90 backdrop-blur-xl">
      <div className="navbar page-shell min-h-[76px] px-0">
        <div className="navbar-start gap-2">
          <button className="btn btn-ghost btn-square lg:hidden" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Open navigation">
            <Menu size={21} />
          </button>
          <Link href="/" className="flex items-center gap-2.5">
            <span className="grid size-10 place-items-center rounded-2xl bg-primary text-primary-content shadow-sm"><BookOpen size={22} /></span>
            <span className="leading-tight">
              <span className="block font-display text-[1.35rem] font-bold tracking-tight">BookNook<span className="text-secondary">.</span></span>
              <span className="hidden text-[10px] font-semibold uppercase tracking-[.2em] text-base-content/50 sm:block">A little space for big ideas</span>
            </span>
          </Link>
        </div>

        <nav className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal items-center gap-1 px-1">
            {links.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className={`nav-link ${pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href)) ? "nav-link-active" : ""}`}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="navbar-end gap-2">
          <ThemeToggle />
          {isPending ? <span className="loading loading-spinner loading-sm text-primary" /> : session ? (
            <div className="dropdown dropdown-end">
              <button tabIndex={0} className="btn btn-ghost gap-2 rounded-full pl-1 pr-2" aria-label="Open profile menu">
                {session.user.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={session.user.image} alt="Profile" className="size-9 rounded-full object-cover ring-2 ring-primary/20" />
                ) : <span className="grid size-9 place-items-center rounded-full bg-primary/10 text-primary"><UserRound size={18} /></span>}
                <span className="hidden max-w-28 truncate text-sm font-semibold sm:block">{session.user.name}</span>
                <ChevronDown size={15} className="text-base-content/60" />
              </button>
              <ul tabIndex={0} className="menu dropdown-content z-[60] mt-3 w-56 rounded-2xl border border-base-300 bg-base-100 p-2 shadow-xl">
                <li className="menu-title px-3 py-2"><span className="truncate normal-case">{session.user.email}</span></li>
                <li><Link href="/profile"><UserRound size={16} /> My Profile</Link></li>
                <li><button onClick={logout} className="text-error"><LogOut size={16} /> Logout</button></li>
              </ul>
            </div>
          ) : (
            <div className="hidden items-center gap-2 sm:flex">
              <Link href={`/login?callbackUrl=${encodeURIComponent(pathname)}`} className="btn btn-ghost btn-sm rounded-full">Login</Link>
              <Link href="/register" className="btn btn-primary btn-sm rounded-full px-5">Register</Link>
            </div>
          )}
        </div>
      </div>
      {mobileOpen && (
        <div className="border-t-2 border-base-400 bg-base-100 px-4 py-3 lg:hidden">
          <nav className="page-shell flex flex-col gap-1">
            {links.map((link) => <Link key={link.href} href={link.href} onClick={() => setMobileOpen(false)} className="rounded-xl px-3 py-2.5 text-sm font-semibold hover:bg-base-200">{link.label}</Link>)}
            {!session && <div className="mt-2 grid grid-cols-2 gap-2"><Link href="/login" className="btn btn-outline btn-sm">Login</Link><Link href="/register" className="btn btn-primary btn-sm">Register</Link></div>}
          </nav>
        </div>
      )}
    </header>
  );
}

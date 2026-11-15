"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowLeft, BookOpen, CalendarDays, UserRound } from "lucide-react";
import toast from "react-hot-toast";
import Loading from "@/components/loading";
import type { Book } from "@/lib/types";
import { apiFetch } from "@/lib/api";

export default function BookDetailsClient({ id }: { id: string }) {
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);
  const [showBorrow, setShowBorrow] = useState(false);
  const [returnDate, setReturnDate] = useState("");
  const [busy, setBusy] = useState(false);
  useEffect(() => { apiFetch<{ book: Book }>(`/books/${id}`).then((data) => setBook(data.book)).catch((error: Error) => toast.error(error.message)).finally(() => setLoading(false)); }, [id]);

  async function borrowBook(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!returnDate) return toast.error("Choose a return date.");
    setBusy(true);
    try {
      await apiFetch("/borrows", { method: "POST", body: JSON.stringify({ bookId: id, returnDate }) }, true);
      toast.success("Book borrowed successfully!");
      setShowBorrow(false);
      setReturnDate("");
      const fresh = await apiFetch<{ book: Book }>(`/books/${id}`);
      setBook(fresh.book);
    } catch (error) { toast.error((error as Error).message); }
    finally { setBusy(false); }
  }

  if (loading) return <Loading label="Loading book details" />;
  if (!book) return <div className="empty-panel">This book could not be found. <Link href="/books" className="link link-primary">Browse books</Link></div>;

  return <>
    <Link href="/books" className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-base-content/55 hover:text-primary"><ArrowLeft size={16} /> Back to all books</Link>
    <div className="grid gap-10 lg:grid-cols-[.82fr_1.18fr] lg:items-start">
      <div className="mx-auto w-full max-w-sm overflow-hidden rounded-[1.5rem] bg-base-200 shadow-xl"><div className="aspect-[4/5.2]"><img src={book.image} alt={book.title} className="h-full w-full object-cover" /></div></div>
      <div className="pt-2"><span className="badge badge-outline rounded-full px-3 py-3 text-xs font-bold">{book.category}</span><h1 className="mt-5 font-display text-4xl font-bold leading-tight sm:text-5xl">{book.title}</h1><p className="mt-3 text-lg text-base-content/60">by <span className="font-semibold text-base-content">{book.author}</span></p>
        <div className="my-7 grid grid-cols-2 gap-3"><div className="rounded-2xl bg-base-200/70 p-4"><p className="text-xs text-base-content/50">Available copies</p><p className="mt-1 text-2xl font-bold">{book.availableCopies} <span className="text-sm font-medium text-base-content/50">/ {book.totalCopies}</span></p></div><div className="rounded-2xl bg-base-200/70 p-4"><p className="text-xs text-base-content/50">Added on</p><p className="mt-2 flex items-center gap-2 font-semibold"><CalendarDays size={16} />{new Date(book.createdAt).toLocaleDateString()}</p></div></div>
        <h2 className="mb-2 font-display text-xl font-bold">About this book</h2><p className="whitespace-pre-line leading-8 text-base-content/65">{book.description}</p>
        <div className="mt-7 flex items-center gap-3 rounded-2xl border border-base-300 p-4"><span className="grid size-10 place-items-center rounded-full bg-primary/10 text-primary"><UserRound size={18} /></span><div><p className="text-[10px] font-bold uppercase tracking-widest text-base-content/45">Shared by</p><p className="font-semibold">{book.addedBy.name}</p><p className="text-xs text-base-content/50">{book.addedBy.email}</p></div></div>
        <button className="btn btn-primary mt-8 min-h-12 w-full rounded-full sm:w-auto sm:px-10" disabled={book.availableCopies < 1} onClick={() => setShowBorrow(true)}>{book.availableCopies < 1 ? "Not Available" : "Borrow This Book"}</button>
      </div>
    </div>
    {showBorrow && <div className="modal modal-open"><div className="modal-box max-w-md"><h3 className="font-display text-2xl font-bold">Borrow this book</h3><p className="mt-2 text-sm text-base-content/60">Choose when you plan to return “{book.title}”.</p><form onSubmit={borrowBook} className="mt-6 space-y-4"><label className="block"><span className="form-label">Return date</span><input className="field-input" type="date" min={new Date(Date.now() + 86400000).toISOString().slice(0, 10)} required value={returnDate} onChange={(e) => setReturnDate(e.target.value)} /></label><p className="text-xs leading-5 text-base-content/50">Your name and email are taken from your signed-in account. A user can have only one active borrow of this title.</p><div className="modal-action"><button type="button" className="btn btn-ghost rounded-full" onClick={() => setShowBorrow(false)}>Cancel</button><button disabled={busy} className="btn btn-primary rounded-full">{busy ? <span className="loading loading-spinner loading-sm" /> : "Confirm Borrow"}</button></div></form></div><button className="modal-backdrop" onClick={() => setShowBorrow(false)} aria-label="Close modal">Close</button></div>}
  </>;
}

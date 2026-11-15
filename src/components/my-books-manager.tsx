"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Pencil, Plus, Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import Loading from "@/components/loading";
import type { Book, BookCategory } from "@/lib/types";
import { apiFetch } from "@/lib/api";

const categories: BookCategory[] = ["Fiction", "Science", "History", "Kids", "Others"];
export default function MyBooksManager() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Book | null>(null);
  const [deleting, setDeleting] = useState<Book | null>(null);
  const [busy, setBusy] = useState(false);
  useEffect(() => { apiFetch<{ books: Book[] }>("/books?mine=true", {}, true).then((data) => setBooks(data.books)).catch((error: Error) => toast.error(error.message)).finally(() => setLoading(false)); }, []);

  async function saveEdit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault(); if (!editing) return; setBusy(true);
    const form = new FormData(event.currentTarget);
    try {
      const patch = { title: String(form.get("title")), author: String(form.get("author")), category: String(form.get("category")), description: String(form.get("description")), totalCopies: Number(form.get("totalCopies")), image: String(form.get("image")) };
      const data = await apiFetch<{ book: Book }>(`/books/${editing._id}`, { method: "PATCH", body: JSON.stringify(patch) }, true);
      setBooks((old) => old.map((book) => book._id === editing._id ? data.book : book)); setEditing(null); toast.success("Book updated successfully.");
    } catch (error) { toast.error((error as Error).message); }
    finally { setBusy(false); }
  }

  async function deleteBook() {
    if (!deleting) return; setBusy(true);
    try { await apiFetch(`/books/${deleting._id}`, { method: "DELETE" }, true); setBooks((old) => old.filter((book) => book._id !== deleting._id)); setDeleting(null); toast.success("Book deleted."); }
    catch (error) { toast.error((error as Error).message); }
    finally { setBusy(false); }
  }

  if (loading) return <Loading />;
  return <>
    <div className="mb-5 flex justify-end"><Link href="/add-book" className="btn btn-primary rounded-full"><Plus size={16} /> Add a book</Link></div>
    {books.length ? <div className="grid gap-4">{books.map((book) => <article key={book._id} className="flex flex-col gap-4 rounded-2xl border border-base-300 bg-base-100 p-4 sm:flex-row sm:items-center"><img src={book.image} alt={book.title} className="h-28 w-20 rounded-xl object-cover" /><div className="min-w-0 flex-1"><span className="badge badge-outline badge-sm">{book.category}</span><h2 className="mt-1 truncate font-display text-xl font-bold">{book.title}</h2><p className="text-sm text-base-content/55">{book.author} · {book.availableCopies}/{book.totalCopies} available</p></div><div className="flex gap-2"><button className="btn btn-outline btn-sm rounded-full" onClick={() => setEditing(book)}><Pencil size={14} /> Edit</button><button className="btn btn-error btn-outline btn-sm rounded-full" onClick={() => setDeleting(book)}><Trash2 size={14} /> Delete</button></div></article>)}</div> : <div className="empty-panel">You have not added any books yet. <Link href="/add-book" className="link link-primary">Add your first book</Link>.</div>}

    {editing && <div className="modal modal-open"><div className="modal-box max-w-2xl"><h3 className="font-display text-2xl font-bold">Edit book</h3><form onSubmit={saveEdit} className="mt-5 grid gap-4 sm:grid-cols-2"><label className="block sm:col-span-2"><span className="form-label">Book title</span><input className="field-input" name="title" required defaultValue={editing.title} /></label><label className="block"><span className="form-label">Author</span><input className="field-input" name="author" required defaultValue={editing.author} /></label><label className="block"><span className="form-label">Category</span><select className="field-input" name="category" defaultValue={editing.category}>{categories.map((item) => <option key={item}>{item}</option>)}</select></label><label className="block"><span className="form-label">Total copies</span><input className="field-input" name="totalCopies" type="number" min="1" defaultValue={editing.totalCopies} required /></label><label className="block"><span className="form-label">Image URL</span><input className="field-input" name="image" type="url" defaultValue={editing.image} required /></label><label className="block sm:col-span-2"><span className="form-label">Description</span><textarea className="field-input min-h-28" name="description" defaultValue={editing.description} required /></label><div className="modal-action sm:col-span-2"><button type="button" className="btn btn-ghost rounded-full" onClick={() => setEditing(null)}>Cancel</button><button disabled={busy} className="btn btn-primary rounded-full">{busy ? "Saving..." : "Save changes"}</button></div></form></div><button className="modal-backdrop" onClick={() => setEditing(null)} aria-label="Close edit dialog">Close</button></div>}
    {deleting && <div className="modal modal-open"><div className="modal-box max-w-sm text-center"><span className="mx-auto mb-4 grid size-12 place-items-center rounded-2xl bg-error/10 text-error"><Trash2 size={22} /></span><h3 className="font-display text-2xl font-bold">Delete this book?</h3><p className="mt-2 text-sm leading-6 text-base-content/60">“{deleting.title}” will be removed from the library. This cannot be undone. Books with active borrows cannot be deleted.</p><div className="modal-action justify-center"><button className="btn btn-ghost rounded-full" onClick={() => setDeleting(null)}>Keep book</button><button className="btn btn-error rounded-full" disabled={busy} onClick={deleteBook}>{busy ? "Deleting..." : "Yes, delete"}</button></div></div><button className="modal-backdrop" onClick={() => setDeleting(null)} aria-label="Close delete dialog">Close</button></div>}
  </>;
}

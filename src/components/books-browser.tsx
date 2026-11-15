"use client";

import { useEffect, useMemo, useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import toast from "react-hot-toast";
import BookCard from "@/components/book-card";
import Loading from "@/components/loading";
import type { Book, BookCategory } from "@/lib/types";
import { apiFetch } from "@/lib/api";

const categories = ["All", "Fiction", "Science", "History", "Kids", "Others"] as const;
export default function BooksBrowser() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState<(typeof categories)[number]>("All");
  const [query, setQuery] = useState("");
  useEffect(() => {
    apiFetch<{ books: Book[] }>("/books")
      .then((data) => setBooks(data.books))
      .catch((error: Error) => toast.error(error.message))
      .finally(() => setLoading(false));
  }, []);
  const visible = useMemo(() => books.filter((book) => (category === "All" || book.category === category) && `${book.title} ${book.author}`.toLowerCase().includes(query.toLowerCase())), [books, category, query]);

  return <>
    <div className="mb-7 flex flex-col gap-4 rounded-2xl border border-base-300 bg-base-200/45 p-4 sm:flex-row sm:items-center sm:justify-between">
      <label className="relative block w-full sm:max-w-sm"><Search className="absolute left-3 top-1/2 -translate-y-1/2 text-base-content/40" size={17} /><input className="field-input bg-base-100 pl-10" placeholder="Search title or author..." value={query} onChange={(e) => setQuery(e.target.value)} /></label>
      <div className="flex flex-wrap items-center gap-2"><SlidersHorizontal size={16} className="mr-1 text-base-content/45" />{categories.map((item) => <button key={item} onClick={() => setCategory(item)} className={`btn btn-xs rounded-full px-3 sm:btn-sm ${category === item ? "btn-primary" : "btn-ghost bg-base-100"}`}>{item}</button>)}</div>
    </div>
    {loading ? <Loading /> : visible.length ? <><p className="mb-4 text-xs font-semibold uppercase tracking-wider text-base-content/45">{visible.length} {visible.length === 1 ? "book" : "books"} found</p><div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{visible.map((book) => <BookCard key={book._id} book={book} />)}</div></> : <div className="empty-panel">No books match your search. Try a different title or category.</div>}
  </>;
}

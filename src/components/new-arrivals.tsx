"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import toast from "react-hot-toast";
import BookCard from "@/components/book-card";
import Loading from "@/components/loading";
import type { Book } from "@/lib/types";
import { apiFetch } from "@/lib/api";

export default function NewArrivals() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    apiFetch<{ books: Book[] }>("/books?limit=6")
      .then((data) => setBooks(data.books))
      .catch((error: Error) => toast.error(error.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="page-shell section-space">
      <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div><p className="eyebrow">Fresh from the shelves</p><h2 className="section-title">New arrivals<span className="text-secondary">.</span></h2><p className="mt-2 text-sm text-base-content/60">The latest stories added by our reading community.</p></div>
        <Link href="/books" className="btn btn-outline rounded-full">Explore all books <ArrowRight size={16} /></Link>
      </div>
      {loading ? <Loading /> : books.length ? <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{books.map((book) => <BookCard key={book._id} book={book} />)}</div> : <div className="empty-panel">No books yet. Be the first to add one!</div>}
      <div className="mt-9 text-center"><Link href="/books" className="btn btn-primary rounded-full px-7">See All Books <ArrowRight size={16} /></Link></div>
    </section>
  );
}

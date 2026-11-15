import Link from "next/link";
import { ArrowUpRight, BookOpen } from "lucide-react";
import type { Book } from "@/lib/types";

export default function BookCard({ book }: { book: Book }) {
  return (
    <article className="book-card group flex h-full flex-col overflow-hidden rounded-[1.35rem] border border-base-300/80 bg-base-100">
      <Link href={`/books/${book._id}`} className="book-cover-wrap relative block aspect-[4/4.8] overflow-hidden bg-base-200">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={book.image} alt={book.title} className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.045]" />
        <span className="absolute left-3 top-3 rounded-full bg-base-100/90 px-3 py-1 text-[10px] font-bold uppercase tracking-[.14em] text-primary shadow-sm">{book.category}</span>
      </Link>
      <div className="flex flex-1 flex-col p-5">
        <p className="mb-2 text-xs font-semibold uppercase tracking-[.12em] text-base-content/45">{book.author}</p>
        <h3 className="line-clamp-2 min-h-[3.25rem] font-display text-xl font-bold leading-snug">{book.title}</h3>
        <div className="mt-auto flex items-center justify-between gap-3 pt-5">
          <span className={`text-xs font-semibold ${book.availableCopies > 0 ? "text-success" : "text-error"}`}><BookOpen size={13} className="mr-1 inline" />{book.availableCopies > 0 ? `${book.availableCopies} available` : "Not available"}</span>
          <Link href={`/books/${book._id}`} className="btn btn-primary btn-sm rounded-full px-4">View Details <ArrowUpRight size={14} /></Link>
        </div>
      </div>
    </article>
  );
}

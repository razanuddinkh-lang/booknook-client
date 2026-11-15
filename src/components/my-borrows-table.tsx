"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { BookOpen, RotateCcw } from "lucide-react";
import toast from "react-hot-toast";
import Loading from "@/components/loading";
import type { Borrow } from "@/lib/types";
import { apiFetch } from "@/lib/api";
import { formatDate } from "@/lib/format";

export default function MyBorrowsTable() {
  const [borrows, setBorrows] = useState<Borrow[]>([]);
  const [loading, setLoading] = useState(true);
  const [returning, setReturning] = useState<string | null>(null);
  useEffect(() => { apiFetch<{ borrows: Borrow[] }>("/borrows", {}, true).then((data) => setBorrows(data.borrows)).catch((error: Error) => toast.error(error.message)).finally(() => setLoading(false)); }, []);

  async function returnBook(id: string) {
    setReturning(id);
    try { await apiFetch(`/borrows/${id}`, { method: "DELETE" }, true); setBorrows((old) => old.filter((borrow) => borrow._id !== id)); toast.success("Book returned. Thank you!"); }
    catch (error) { toast.error((error as Error).message); }
    finally { setReturning(null); }
  }

  if (loading) return <Loading label="Loading your borrowed books" />;
  if (!borrows.length) return <div className="empty-panel"><BookOpen className="mx-auto mb-3" size={28} />You have no active borrows. <Link href="/books" className="link link-primary">Find a book to borrow</Link>.</div>;
  return <div className="table-wrap"><table className="table"><thead><tr><th>Book</th><th>Borrow date</th><th>Return date</th><th>Status</th><th /></tr></thead><tbody>{borrows.map((borrow) => <tr key={borrow._id}><td><div className="flex min-w-48 items-center gap-3"><img src={borrow.bookImage} alt={borrow.bookTitle} className="h-14 w-10 rounded-lg object-cover" /><span className="max-w-48 font-semibold">{borrow.bookTitle}</span></div></td><td className="whitespace-nowrap text-sm">{formatDate(borrow.borrowDate)}</td><td className="whitespace-nowrap text-sm">{formatDate(borrow.returnDate)}</td><td><span className="badge badge-success badge-outline">Borrowed</span></td><td><button onClick={() => returnBook(borrow._id)} disabled={returning === borrow._id} className="btn btn-primary btn-sm whitespace-nowrap rounded-full">{returning === borrow._id ? <span className="loading loading-spinner loading-xs" /> : <><RotateCcw size={14} /> Return Book</>}</button></td></tr>)}</tbody></table></div>;
}

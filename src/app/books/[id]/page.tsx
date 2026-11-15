import type { Metadata } from "next";
import BookDetailsClient from "@/components/book-details-client";
import { requireSession } from "@/lib/server-auth";

export const metadata: Metadata = { title: "Book Details" };
export default async function BookDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await requireSession(`/books/${id}`);
  return <section className="page-shell py-14"><BookDetailsClient id={id} /></section>;
}

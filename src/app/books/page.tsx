import type { Metadata } from "next";
import BooksBrowser from "@/components/books-browser";
import PageHeading from "@/components/page-heading";

export const metadata: Metadata = { title: "All Books" };
export default function BooksPage() {
  return <section className="page-shell py-14"><PageHeading eyebrow="Explore the collection" title="Find a book to love." description="Browse every title shared by the BookNook community. Filter by category or search by title and author." /><BooksBrowser /></section>;
}

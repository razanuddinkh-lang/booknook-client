import type { Metadata } from "next";
import PageHeading from "@/components/page-heading";
import AddBookForm from "@/components/add-book-form";
import { requireSession } from "@/lib/server-auth";

export const metadata: Metadata = { title: "Add a Book" };
export default async function AddBookPage() {
  const session = await requireSession("/add-book");
  return <section className="page-shell py-14"><PageHeading eyebrow="Grow the library" title="Add a book to the shelves." description="Share a title you love and make it available for another reader to discover." /><AddBookForm user={{ name: session.user.name, email: session.user.email }} /></section>;
}

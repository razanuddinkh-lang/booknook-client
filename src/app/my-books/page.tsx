import type { Metadata } from "next";
import PageHeading from "@/components/page-heading";
import MyBooksManager from "@/components/my-books-manager";
import { requireSession } from "@/lib/server-auth";

export const metadata: Metadata = { title: "My Books" };
export default async function MyBooksPage() {
  await requireSession("/my-books");
  return <section className="page-shell py-14"><PageHeading eyebrow="Your contributions" title="Books you’ve shared." description="Keep your shelf up to date. You can edit book details or remove a title you added." /><MyBooksManager /></section>;
}

import type { Metadata } from "next";
import PageHeading from "@/components/page-heading";
import MyBorrowsTable from "@/components/my-borrows-table";
import { requireSession } from "@/lib/server-auth";

export const metadata: Metadata = { title: "My Borrows" };
export default async function MyBorrowsPage() {
  await requireSession("/my-borrows");
  return <section className="page-shell py-14"><PageHeading eyebrow="Your reading list" title="Books you’ve borrowed." description="Keep track of the books with you and return each one when you’re finished." /><MyBorrowsTable /></section>;
}

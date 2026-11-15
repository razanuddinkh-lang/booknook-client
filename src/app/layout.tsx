import type { Metadata } from "next";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Providers from "@/components/providers";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "BookNook | A Small Online Library", template: "BookNook | %s" },
  description: "Discover, share, borrow, and return books with the BookNook reading community.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-theme="light" suppressHydrationWarning>
      <body className="min-h-screen bg-base-100 text-base-content antialiased">
        <Providers>
          <Navbar />
          <main className="min-h-[55vh]">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}

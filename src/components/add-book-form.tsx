"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ImagePlus, UploadCloud } from "lucide-react";
import toast from "react-hot-toast";
import { apiFetch } from "@/lib/api";
import type { BookCategory } from "@/lib/types";

const categories: BookCategory[] = ["Fiction", "Science", "History", "Kids", "Others"];
export default function AddBookForm({ user }: { user: { name: string; email: string } }) {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState<BookCategory>("Fiction");
  const [description, setDescription] = useState("");
  const [totalCopies, setTotalCopies] = useState("1");
  const [image, setImage] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [busy, setBusy] = useState(false);

  async function uploadImage() {
    if (!file) return image;
    const form = new FormData(); form.append("image", file);
    setUploading(true);
    try {
      const response = await fetch("/api/upload", { method: "POST", body: form });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Image upload failed.");
      setImage(data.url); return data.url as string;
    } finally { setUploading(false); }
  }

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!image && !file) return toast.error("Please add a book image.");
    setBusy(true);
    try {
      const imageUrl = await uploadImage();
      await apiFetch("/books", { method: "POST", body: JSON.stringify({ title, author, category, description, totalCopies: Number(totalCopies), image: imageUrl }) }, true);
      toast.success("Your book has been added!");
      router.push("/my-books"); router.refresh();
    } catch (error) { toast.error((error as Error).message); }
    finally { setBusy(false); }
  }

  return <form onSubmit={submit} className="form-panel max-w-3xl space-y-5">
    <div className="grid gap-5 sm:grid-cols-2">
      <label className="block sm:col-span-2"><span className="form-label">Book title</span><input className="field-input" required minLength={2} value={title} onChange={(e) => setTitle(e.target.value)} placeholder="The name of the book" /></label>
      <label className="block"><span className="form-label">Author name</span><input className="field-input" required value={author} onChange={(e) => setAuthor(e.target.value)} placeholder="Author's full name" /></label>
      <label className="block"><span className="form-label">Category</span><select className="field-input" value={category} onChange={(e) => setCategory(e.target.value as BookCategory)}>{categories.map((item) => <option key={item}>{item}</option>)}</select></label>
      <label className="block"><span className="form-label">Total copies</span><input className="field-input" type="number" min="1" max="500" required value={totalCopies} onChange={(e) => setTotalCopies(e.target.value)} /></label>
      <label className="block"><span className="form-label">Added by · Name</span><input className="field-input" value={user.name} readOnly disabled /></label>
      <label className="block"><span className="form-label">Added by · Email</span><input className="field-input" value={user.email} readOnly disabled /></label>
      <div className="sm:col-span-2"><span className="form-label">Book image</span><label className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-base-300 bg-base-200/35 px-4 py-7 text-center transition hover:border-primary/50"><span className="mb-2 grid size-11 place-items-center rounded-xl bg-primary/10 text-primary"><ImagePlus size={22} /></span><span className="text-sm font-bold">{file?.name || "Choose a cover image"}</span><span className="mt-1 text-xs text-base-content/50">JPG, PNG or WebP · max 5 MB · uploads to ImgBB</span><input type="file" accept="image/*" className="hidden" onChange={(e) => setFile(e.target.files?.[0] || null)} /></label>{image && <p className="mt-2 break-all text-xs text-success">Image uploaded: {image}</p>}</div>
      <label className="block sm:col-span-2"><span className="form-label">Short description</span><textarea className="field-input min-h-32 resize-y" required minLength={15} maxLength={2500} value={description} onChange={(e) => setDescription(e.target.value)} placeholder="What is this book about?" /></label>
    </div>
    <div className="flex justify-end"><button disabled={busy || uploading} className="btn btn-primary min-h-12 rounded-full px-8">{busy || uploading ? <><span className="loading loading-spinner loading-sm" /> {uploading ? "Uploading image" : "Adding book"}</> : <><UploadCloud size={17} /> Add Book</>}</button></div>
  </form>;
}

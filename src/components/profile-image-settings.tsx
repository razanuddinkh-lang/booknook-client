
"use client";

import { useEffect, useRef, useState } from "react";
import { ImagePlus, Link2, LoaderCircle, RefreshCw, UploadCloud } from "lucide-react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

type ProfileImageSettingsProps = {
  initialName: string;
  initialEmail: string;
  initialImage?: string | null;
};

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ALLOWED_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
];

const FALLBACK_IMAGE = "/default-avatar.svg";

function normalizeImageUrl(value: string): string {
  const parsed = new URL(value.trim());

  if (
    parsed.protocol !== "https:" &&
    parsed.protocol !== "http:"
  ) {
    throw new Error("Use a valid HTTP or HTTPS image URL.");
  }

  if (parsed.hostname === "drive.google.com") {
    const pathMatch = parsed.pathname.match(/\/file\/d\/([^/]+)/);
    const fileId = pathMatch?.[1] || parsed.searchParams.get("id");

    if (fileId) {
      return `https://drive.google.com/uc?export=view&id=${encodeURIComponent(fileId)}`;
    }
  }

  return parsed.href;
}

export default function ProfileImageSettings({
  initialName,
  initialEmail,
  initialImage,
}: ProfileImageSettingsProps) {
  const [currentImage, setCurrentImage] = useState(initialImage || "");
  const [imageUrl, setImageUrl] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [localPreview, setLocalPreview] = useState("");
  const [savingUrl, setSavingUrl] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [previewFailed, setPreviewFailed] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!selectedFile) {
      setLocalPreview("");
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setLocalPreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  const previewSource =
    localPreview ||
    imageUrl.trim() ||
    currentImage ||
    FALLBACK_IMAGE;

  function selectFile(file: File | null) {
    setPreviewFailed(false);

    if (!file) {
      setSelectedFile(null);
      return;
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
      toast.error("Choose a JPG, PNG, or WebP image.");

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      toast.error("The image must be 5 MB or smaller.");

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      return;
    }

    setSelectedFile(file);
  }

  async function saveImageUrl(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    let normalizedUrl: string;
    
    // Continue with your existing saveImageUrl code here.
  }
}

"use client";
import { useState, useRef } from "react";
import { Upload, Loader2, ImageIcon, X } from "lucide-react";

interface ImageUploaderProps {
  currentUrl?: string;
  onUpload: (url: string) => void;
  folder?: string;
  label?: string;
}

export default function ImageUploader({ currentUrl, onUpload, folder = "uploads", label = "Image" }: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [preview, setPreview] = useState(currentUrl || "");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setError("");
    setUploading(true);

    // Show local preview immediately
    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);

    try {
      const form = new FormData();
      form.append("file", file);
      form.append("folder", folder);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: form,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Upload failed");

      setPreview(data.url);
      onUpload(data.url);
    } catch (err: any) {
      setError(err.message || "Upload failed");
      setPreview(currentUrl || "");
    } finally {
      setUploading(false);
    }
  };

  const handleClear = () => {
    setPreview("");
    onUpload("");
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <div className="space-y-2">
      <label className="block text-xs font-mono text-gray-400 uppercase tracking-wider">{label}</label>

      {preview ? (
        <div className="relative w-full h-48 rounded-xl overflow-hidden border border-white/10 group">
          <img src={preview} alt="Preview" className="w-full h-full object-cover" />
          <button
            type="button"
            onClick={handleClear}
            className="absolute top-2 right-2 w-8 h-8 bg-black/80 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500"
          >
            <X size={14} />
          </button>
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="absolute bottom-2 right-2 px-3 py-1.5 bg-black/80 text-primary text-xs font-mono rounded-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-primary hover:text-black border border-primary/40"
          >
            Change
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="w-full h-32 border border-dashed border-white/20 rounded-xl flex flex-col items-center justify-center gap-2 hover:border-primary/40 hover:bg-primary/5 transition-all text-gray-500 hover:text-primary cursor-pointer disabled:opacity-50"
        >
          {uploading ? (
            <><Loader2 size={20} className="animate-spin text-primary" /><span className="text-xs font-mono">Uploading...</span></>
          ) : (
            <><ImageIcon size={20} /><span className="text-xs font-mono">Click to upload image</span><span className="text-2xs text-gray-600">PNG, JPG, WebP up to 5MB</span></>
          )}
        </button>
      )}

      {error && <p className="text-red-400 text-xs font-mono">{error}</p>}

      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/jpg,image/png,image/webp,image/gif"
        onChange={handleFileChange}
        className="hidden"
      />

      {/* Also allow manual URL entry */}
      <input
        type="text"
        value={preview}
        onChange={(e) => { setPreview(e.target.value); onUpload(e.target.value); }}
        placeholder="Or paste an image URL..."
        className="w-full px-3 py-2 bg-black border border-white/10 rounded-lg text-xs text-gray-300 focus:outline-none focus:border-primary transition-all placeholder-gray-600"
      />
    </div>
  );
}

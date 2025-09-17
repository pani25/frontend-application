// src/components/EventForm.tsx
import { createPhoto } from "@/services/photo";
import React, { useState } from "react";

type Props = {
  initial?: { title?: string; description?: string; imageUrl?: string };
  onSubmit: (data: { title: string; description: string; image?: File | null }) => Promise<void>;
  submitLabel?: string;
};

export default function EventForm({ initial = {}, onSubmit, submitLabel = "Save" }: Props) {
  const [title, setTitle] = useState(initial.title ?? "");
  const [description, setDescription] = useState(initial.description ?? "");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onSubmit({ title, description, image: file });
    } finally {
      setLoading(false);
    }
  };
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium">Title</label>
        <input value={title} onChange={(e) => setTitle(e.target.value)} required className="mt-1 block w-full border rounded px-3 py-2" />
      </div>

      <div>
        <label className="block text-sm font-medium">Description</label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} required className="mt-1 block w-full border rounded px-3 py-2" />
      </div>

      <div>
        <label className="block text-sm font-medium">Image</label>
        <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files?.[0] ?? null)} className="mt-1 block" />
        {initial.imageUrl && !file && (
          <div className="mt-2">
            <img src={initial.imageUrl} alt="current" className="w-48 h-32 object-cover rounded" />
          </div>
        )}
      </div>

      <div>
        <button type="submit" disabled={loading} className="px-4 py-2 bg-blue-600 text-white rounded">
          {loading ? "Processing..." : submitLabel}
        </button>
      </div>
    </form>
  );
}

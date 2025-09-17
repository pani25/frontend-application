// src/pages/dashboard/events/[id].tsx
import React, { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import { useRouter } from "next/router";
import Head from "next/head";
import { getPhoto, Photo, updatePhoto, deletePhoto } from "@/services/photo";
import EventForm from "@/components/EventForm";
import { useAuth } from "@/context/AuthContext";

export default function EventDetailPage() {
  const router = useRouter();
  const { id } = router.query;
  const { user, loading } = useAuth();
  const [photo, setPhoto] = useState<Photo | null>(null);
  const [loadingData, setLoadingData] = useState(true);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    if (!loading && !user) router.push("/auth/login");
  }, [loading, user, router]);

  useEffect(() => {
    if (!id) return;
    const load = async () => {
      setLoadingData(true);
      try {
        const d = await getPhoto(String(id));
        setPhoto(d);
      } catch (err) {
        console.error(err);
      } finally {
        setLoadingData(false);
      }
    };
    load();
  }, [id]);

  if (loading || !user) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (loadingData) return <div className="min-h-screen flex items-center justify-center">Loading detail...</div>;
  if (!photo) return <div className="min-h-screen flex items-center justify-center">Not found</div>;

  const handleUpdate = async (data: { title: string; description: string; image?: File | null }) => {
    const updated = await updatePhoto(photo._id, data);
    setPhoto(updated);
    setEditing(false);
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure delete this event?")) return;
    await deletePhoto(photo._id);
    router.push("/dashboard/events");
  };

  return (
    <>
      <Head><title>{photo.title}</title></Head>
      <Layout>
        <div className="max-w-3xl mx-auto">
          {!editing ? (
            <>
              <div className="mb-4">
                <img src={photo.imageUrl} alt={photo.title} className="w-full h-64 object-cover rounded" />
              </div>
              <h1 className="text-2xl font-semibold">{photo.title}</h1>
              <p className="mt-2 text-gray-700">{photo.description}</p>

              <div className="mt-6 space-x-2">
                <button onClick={() => setEditing(true)} className="px-4 py-2 bg-blue-600 text-white rounded">Edit</button>
                <button onClick={handleDelete} className="px-4 py-2 bg-red-600 text-white rounded">Delete</button>
                <button onClick={() => router.push("/dashboard/events")} className="px-4 py-2 border rounded">Back</button>
              </div>
            </>
          ) : (
            <>
              <h2 className="text-xl font-semibold mb-4">Edit Event</h2>
              <EventForm initial={{ title: photo.title, description: photo.description, imageUrl: photo.imageUrl }} onSubmit={handleUpdate} submitLabel="Update" />
              <div className="mt-4">
                <button onClick={() => setEditing(false)} className="px-4 py-2 border rounded">Cancel</button>
              </div>
            </>
          )}
        </div>
      </Layout>
    </>
  );
}

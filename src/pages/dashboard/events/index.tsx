// src/pages/dashboard/events/index.tsx
import React, { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import Head from "next/head";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/router";
import { getPhotos, Photo } from "@/services/photo";
import EventCard from "@/components/EventCard";
import Link from "next/link";

export default function EventsListPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loadingList, setLoadingList] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!loading && !user) router.push("/auth/login");
  }, [loading, user, router]);

  useEffect(() => {
    const load = async () => {
      setLoadingList(true);
      setError(null);
      try {
        const data = await getPhotos();
        setPhotos(data);
      } catch (err) {
        setError("Gagal mengambil data");
      } finally {
        setLoadingList(false);
      }
    };
    load();
  }, []);

  if (loading || !user) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  return (
    <>
      <Head>
        <title>Events</title>
      </Head>
      <Layout>
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold">Events</h1>
          <Link href="/dashboard/events/create" className="px-4 py-2 bg-green-600 text-white rounded">Create Event</Link>
        </div>

        {loadingList ? (
          <div>Loading list...</div>
        ) : error ? (
          <div className="text-red-500">{error}</div>
        ) : photos.length === 0 ? (
          <div className="text-gray-500">No events yet. Click Create Event to add.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {photos.map((p) => (
              <EventCard key={p._id} photo={p} />
            ))}
          </div>
        )}
      </Layout>
    </>
  );
}

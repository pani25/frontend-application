// src/pages/dashboard/events/create.tsx
import React from "react";
import Layout from "@/components/Layout";
import Head from "next/head";
import { useRouter } from "next/router";
import { useAuth } from "@/context/AuthContext";
import EventForm from "@/components/EventForm";
import { createPhoto } from "@/services/photo";

export default function EventCreatePage() {
  const router = useRouter();
  const { user, loading } = useAuth();

  React.useEffect(() => {
    if (!loading && !user) router.push("/auth/login");
  }, [loading, user, router]);

  if (loading || !user) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  const handleSubmit = async (data: { title: string; description: string; image?: File | null }) => {
    await createPhoto(data);
    router.push("/dashboard/events");
  };

  return (
    <>
      <Head><title>Create Event</title></Head>
      <Layout>
        <div className="max-w-2xl mx-auto">
          <h2 className="text-xl font-semibold mb-4">Create Event</h2>
          <EventForm onSubmit={handleSubmit} />
        </div>
      </Layout>
    </>
  );
}

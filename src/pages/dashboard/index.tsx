import React, { useEffect } from "react";
import Layout from "../../components/Layout";
import Head from "next/head";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/router";

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/auth/login");
    }
  }, [loading, user, router]);

  if (loading || !user) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <>
      <Head><title>Dashboard</title></Head>
      <Layout>
        <div className="rounded border-dashed border-2 border-gray-200 p-6 text-center">
          <h2 className="text-2xl font-semibold">Welcome, {user.fullName || user.username}</h2>
          <p className="text-sm text-gray-500 mt-2">This dashboard is now connected to your backend.</p>
        </div>
      </Layout>
    </>
  );
}
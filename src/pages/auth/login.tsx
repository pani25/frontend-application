import React, { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

export default function LoginPage() {
  const [form, setForm] = useState({ identifier: "", password: "" });
  const { login, loading } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(form.identifier, form.password);
      // login() sudah redirect
    } catch (err) {
      console.error(err);
      alert("Login gagal. Periksa kredensial.");
    }
  };

  return (
    <>
      <Head><title>Login</title></Head>
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded shadow p-6">
          <h2 className="text-2xl font-semibold mb-4">Sign in</h2>
          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <label className="block text-sm">Email or Username</label>
              <input name="identifier" value={form.identifier} onChange={handleChange} className="w-full mt-1 px-3 py-2 border rounded" />
            </div>
            <div>
              <label className="block text-sm">Password</label>
              <input name="password" value={form.password} onChange={handleChange} type="password" className="w-full mt-1 px-3 py-2 border rounded" />
            </div>
            <button type="submit" className="w-full py-2 bg-blue-600 text-white rounded" disabled={loading}>
              {loading ? "Processing..." : "Login"}
            </button>
          </form>
          <p className="text-sm mt-4">Dont have account? <Link href="/auth/register" className="text-blue-600">Register</Link></p>
        </div>
      </div>
    </>
  );
}
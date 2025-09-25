// import React, { useState } from "react";
// import Head from "next/head";
// import Link from "next/link";
// import { useAuth } from "@/context/AuthContext";

// export default function LoginPage() {
//   const [form, setForm] = useState({ identifier: "", password: "" });
//   const { login, loading } = useAuth();

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       await login(form.identifier, form.password);
//       // login() sudah redirect
//     } catch (err) {
//       console.error(err);
//       alert("Login gagal. Periksa kredensial.");
//     }
//   };

//   return (
//     <>
//       <Head><title>Login</title></Head>
//       <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
//         <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded shadow p-6">
//           <h2 className="text-2xl font-semibold mb-4">Sign in</h2>
//           <form onSubmit={handleSubmit} className="space-y-3">
//             <div>
//               <label className="block text-sm">Email or Username</label>
//               <input name="identifier" value={form.identifier} onChange={handleChange} className="w-full mt-1 px-3 py-2 border rounded" />
//             </div>
//             <div>
//               <label className="block text-sm">Password</label>
//               <input name="password" value={form.password} onChange={handleChange} type="password" className="w-full mt-1 px-3 py-2 border rounded" />
//             </div>
//             <button type="submit" className="w-full py-2 bg-blue-600 text-white rounded" disabled={loading}>
//               {loading ? "Processing..." : "Login"}
//             </button>
//           </form>
//           <p className="text-sm mt-4">Dont have account? <Link href="/auth/register" className="text-blue-600">Register</Link></p>
//         </div>
//       </div>
//     </>
//   );
// }


import React from "react";
import Head from "next/head";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

type LoginForm = {
  identifier: string;
  password: string;
};

const schema = Yup.object({
  identifier: Yup.string().required("Email atau username wajib diisi"),
  password: Yup.string().required("Password wajib diisi"),
});

export default function LoginPage() {
  const { login, loading } = useAuth();

  const { register, handleSubmit, formState: { errors } } = useForm<LoginForm>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: LoginForm) => {
    try {
      await login(data.identifier, data.password);
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
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
            <div>
              <label className="block text-sm">Email or Username</label>
              <input {...register("identifier")} className="w-full mt-1 px-3 py-2 border rounded" />
              <p className="text-red-500 text-sm">{errors.identifier?.message}</p>
            </div>
            <div>
              <label className="block text-sm">Password</label>
              <input {...register("password")} type="password" className="w-full mt-1 px-3 py-2 border rounded" />
              <p className="text-red-500 text-sm">{errors.password?.message}</p>
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

// import Head from 'next/head';
// import Link from 'next/link';
// import React, { useState } from 'react';
// import { useAuth } from '@/context/AuthContext';

// export default function RegisterPage() {
//     const [form, setForm] = useState({
//         fullName: "",
//         username: "",
//         email: "",
//         password: "",
//         confirmPassword: "",
//     });

//     const {register, loading} = useAuth()

//     const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         setForm({...form, [e.target.name]: e.target.value});
//     };

//     const handleSubmit = async (e: React.FormEvent) => {
//         e.preventDefault();
//         if (form.password !== form.confirmPassword) {
//             alert("Password tidak sama");
//             return;
//         }
//         try{
//             await register({
//                 fullName: form.fullName,
//                 username: form.username,
//                 email: form.email,
//                 password: form.password,
//                 confirmPassword: form.confirmPassword,
//             })
//             alert("Register sukses!");
//         } catch (err) {
//             console.error(err);
//             alert("Register gagal")
//         }
        
//     };
//     return(
//     <>
//       <Head>
//         <title>Register</title>
//       </Head>
//       <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
//         <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded shadow p-6">
//           <h2 className="text-2xl font-semibold mb-4">Create account</h2>
//           <form onSubmit={handleSubmit} className="space-y-3">
//             <input name="fullName" placeholder="Fullname" onChange={handleChange} className="w-full px-3 py-2 border rounded" />
//             <input name="username" placeholder="Username" onChange={handleChange} className="w-full px-3 py-2 border rounded" />
//             <input name="email" placeholder="Email" onChange={handleChange} className="w-full px-3 py-2 border rounded" />
//             <input name="password" placeholder="Password" type="password" onChange={handleChange} className="w-full px-3 py-2 border rounded" />
//             <input name="confirmPassword" placeholder="Confirm Password" type="password" onChange={handleChange} className="w-full px-3 py-2 border rounded" />
//             <button
//              type="submit" 
//              disabled={loading}
//              className="w-full py-2 bg-blue-600 text-white rounded">
//                 {loading? "Loading..." : "Register"}
//             </button>
//           </form>
//           <p className="text-sm mt-4">
//             Already have account? <Link href="/auth/login" className="text-blue-600">Login</Link>
//           </p>
//         </div>
//       </div>
//     </>
//     );
// }

import Head from 'next/head';
import Link from 'next/link';
import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

type RegisterForm = {
  fullName: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const schema = Yup.object({
  fullName: Yup.string().required("Fullname wajib diisi"),
  username: Yup.string().required("Username wajib diisi"),
  email: Yup.string().email("Format email salah").required("Email wajib diisi"),
  password: Yup.string().min(6, "Password minimal 6 karakter").required("Password wajib diisi"),
  confirmPassword: Yup.string().oneOf([Yup.ref("password")], "Password tidak sama").required("Konfirmasi password wajib diisi"),
});

export default function RegisterPage() {
  const { register: registerUser, loading } = useAuth();

  const { register, handleSubmit, formState: { errors } } = useForm<RegisterForm>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: RegisterForm) => {
    try {
      await registerUser(data);
      alert("Register sukses!");
    } catch (err) {
      console.error(err);
      alert("Register gagal");
    }
  };

  return (
    <>
      <Head><title>Register</title></Head>
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded shadow p-6">
          <h2 className="text-2xl font-semibold mb-4">Create account</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
            <div>
              <input {...register("fullName")} placeholder="Fullname" className="w-full px-3 py-2 border rounded" />
              <p className="text-red-500 text-sm">{errors.fullName?.message}</p>
            </div>
            <div>
              <input {...register("username")} placeholder="Username" className="w-full px-3 py-2 border rounded" />
              <p className="text-red-500 text-sm">{errors.username?.message}</p>
            </div>
            <div>
              <input {...register("email")} placeholder="Email" className="w-full px-3 py-2 border rounded" />
              <p className="text-red-500 text-sm">{errors.email?.message}</p>
            </div>
            <div>
              <input {...register("password")} type="password" placeholder="Password" className="w-full px-3 py-2 border rounded" />
              <p className="text-red-500 text-sm">{errors.password?.message}</p>
            </div>
            <div>
              <input {...register("confirmPassword")} type="password" placeholder="Confirm Password" className="w-full px-3 py-2 border rounded" />
              <p className="text-red-500 text-sm">{errors.confirmPassword?.message}</p>
            </div>
            <button type="submit" disabled={loading} className="w-full py-2 bg-blue-600 text-white rounded">
              {loading ? "Loading..." : "Register"}
            </button>
          </form>
          <p className="text-sm mt-4">Already have account? <Link href="/auth/login" className="text-blue-600">Login</Link></p>
        </div>
      </div>
    </>
  );
}

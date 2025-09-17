import React from "react";
import { useAuth } from "@/context/AuthContext";

export default function AppBar({ title = "Dashboard" }: { title?: string }) {
  const { user, logout } = useAuth();

  return (
    <header className="bg-white dark:bg-gray-900 shadow px-4 py-3 flex items-center justify-between">
      <h1 className="text-lg font-semibold">{title}</h1>
      <div className="flex items-center gap-3">
        {user ? (
          <>
            <div className="text-sm">
              <div className="font-medium">{user.fullName || user.username}</div>
              <div className="text-xs text-gray-500">{user.email}</div>
            </div>
            <button onClick={logout} className="px-3 py-1 rounded bg-red-500 text-white">Logout</button>
          </>
        ) : (
          <button className="px-3 py-1 rounded bg-blue-500 text-white">Login</button>
        )}
      </div>
    </header>
  );
}
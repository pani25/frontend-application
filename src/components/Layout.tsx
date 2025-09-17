import React from "react";
import AppBar from "./AppBar";
import Sidebar from "./Sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="flex">
        <Sidebar />
        <div className="flex-1">
          <AppBar title="Dashboard" />
          <main className="p-6">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}

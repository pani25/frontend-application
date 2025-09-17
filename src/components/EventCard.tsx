// src/components/EventCard.tsx
import React from "react";
import Link from "next/link";
import { Photo } from "@/services/photo";

export default function EventCard({ photo }: { photo: Photo }) {
  return (
    <Link href={`/dashboard/events/${photo._id}`} className="block rounded overflow-hidden shadow hover:shadow-md transition">
      <div className="bg-white dark:bg-gray-800">
        <div className="h-48 bg-gray-100 flex items-center justify-center overflow-hidden">
          <img src={photo.imageUrl} alt={photo.title} className="object-cover w-full h-full" />
        </div>
        <div className="p-4">
          <h3 className="font-semibold text-lg">{photo.title}</h3>
          <p className="text-sm text-gray-500 mt-1 line-clamp-2">{photo.description}</p>
        </div>
      </div>
    </Link>
  );
}

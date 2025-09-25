// src/components/EventCard.tsx
import React from "react";
import Link from "next/link";
import { Photo } from "@/services/photo";
import { useAuth } from "@/context/AuthContext";

export default function EventCard({ photo }: { photo: Photo }) {

  const { user } = useAuth();

  // const isOwner = photo.createdBy === user?._id;

  const isOwner = photo.createdBy?._id === user?._id;
  
  return (
    // <Link href={`/dashboard/events/${photo._id}`} className="block rounded overflow-hidden shadow hover:shadow-md transition">
    //   <div className="bg-white dark:bg-gray-800">
    //     <div className="h-48 bg-gray-100 flex items-center justify-center overflow-hidden">
    //       <img src={photo.imageUrl} alt={photo.title} className="object-cover w-full h-full" />
    //     </div>
    //     <div className="p-4">
    //       <h3 className="font-semibold text-lg">{photo.title}</h3>
    //       <p className="text-sm text-gray-500 mt-1 line-clamp-2">{photo.description}</p>
    //     </div>
    //   </div>
    // </Link>
    <Link
      href={`/dashboard/events/${photo._id}`}
      className="block rounded overflow-hidden shadow hover:shadow-md transition"
    >
      <div className="bg-white dark:bg-gray-800">
        <div className="h-48 bg-gray-100 flex items-center justify-center overflow-hidden">
          <img src={photo.imageUrl} alt={photo.title} className="object-cover w-full h-full" />
        </div>
        <div className="p-4">
          <h3 className="font-semibold text-lg flex items-center justify-between">
            {photo.title}
            {isOwner && (
              <span className="ml-2 text-xs bg-blue-100 text-blue-600 px-2 py-0.5 rounded">
                by You
              </span>
            )}
          </h3>
          <p className="text-sm text-gray-500 mt-1 line-clamp-2">
            {photo.description}
          </p>
        </div>
      </div>
    </Link>
  );
}

// src/services/photo.ts
import api from "@/lib/api"; // pastikan lib/api mengekspor default 'api' (axios instance)

/**
 * Model Photo sesuai response backend
 */
export type Photo = {
  _id: string;
  title: string;
  description: string;
  imageUrl: string;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
};

/**
 * Struktur respons API: { message: string, data: T }
 */
type ApiResponse<T> = {
  message: string;
  data: T;
};

/** Ambil semua photo */
export const getPhotos = async (): Promise<Photo[]> => {
  const res = await api.get<ApiResponse<Photo[]>>("/photos");
  return res.data?.data ?? [];
};

/** Ambil photo per id */
export const getPhoto = async (id: string): Promise<Photo> => {
  const res = await api.get<ApiResponse<Photo>>(`/photos/${id}`);
  return res.data.data;
};

export const createPhoto = async (payload: { title: string; description: string; image?: File | null }): Promise<Photo> => {
  console.log("createPhoto payload:", payload); // Debug payload
  
  const form = new FormData();
  form.append("title", payload.title);
  form.append("description", payload.description);
  if (payload.image) {
    console.log("Appending image file:", payload.image.name, payload.image.size);
    form.append("image", payload.image);
  }

//   const res = await api.post<ApiResponse<Photo>>("/photos", form);
const res = await api.post<ApiResponse<Photo>>("/photos", form, {
  headers: {
    "Content-Type": "multipart/form-data",
  },
});
  return res.data.data;
};

/** Update photo */
export const updatePhoto = async (
  id: string,
  payload: { title?: string; description?: string; image?: File | null }
): Promise<Photo> => {
  const form = new FormData();
  if (payload.title !== undefined) form.append("title", payload.title);
  if (payload.description !== undefined) form.append("description", payload.description);
  if (payload.image) form.append("image", payload.image);

  const res = await api.put<ApiResponse<Photo>>(`/photos/${id}`, form, {
  headers: {
    "Content-Type": "multipart/form-data",
  },
});
  return res.data.data;
};

/** Delete photo */
export const deletePhoto = async (id: string): Promise<ApiResponse<null>> => {
  const res = await api.delete<ApiResponse<null>>(`/photos/${id}`);
  return res.data;
};
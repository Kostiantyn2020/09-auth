import axios from "axios";
import type { Note } from "@/types/note";
import type { User } from "@/types/user";
import { cookies } from "next/headers";
import type { AxiosResponse } from "axios";

const serverApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL + "/api",
  withCredentials: true,
});

const getCookieHeader = async () => {
  const cookieStore = await cookies();
  return cookieStore
    .getAll()
    .map((c) => `${c.name}=${c.value}`)
    .join("; ");
};

export const fetchNotes = async (): Promise<Note[]> => {
  const cookieHeader = await getCookieHeader();

  const { data } = await serverApi.get("/notes", {
    headers: {
      Cookie: cookieHeader,
    },
  });

  return data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const cookieHeader = await getCookieHeader();

  const { data } = await serverApi.get(`/notes/${id}`, {
    headers: {
      Cookie: cookieHeader,
    },
  });

  return data;
};

export const getMe = async (): Promise<User> => {
  const cookieHeader = await getCookieHeader();

  const { data } = await serverApi.get("/users/me", {
    headers: {
      Cookie: cookieHeader,
    },
  });

  return data;
};

export const checkSession = async (): Promise<
  AxiosResponse<{ authenticated: boolean }>
> => {
  const cookieHeader = await getCookieHeader();

  return serverApi.get("/auth/session", {
    headers: {
      Cookie: cookieHeader,
    },
  });
};

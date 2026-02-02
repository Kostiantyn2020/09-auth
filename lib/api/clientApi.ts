import { api } from "./api";
import type { User, Note, NoteTag } from "@/types/note";

export interface NewNote {
  title: string;
  content: string;
  tag: NoteTag;
}

interface UpdateMeRequest {
  username?: string;
}

interface RegisterRequest {
  email: string;
  password: string;
}

interface LoginRequest {
  email: string;
  password: string;
}

interface AuthResponse {
  user: User;
}

export const fetchNotes = async (
  page?: number,
  search?: string,
  tag?: string,
): Promise<{ notes: Note[]; totalPages: number }> => {
  const res = await api.get("/notes", { params: { page, search, tag } });
  return res.data;
};

export const fetchNoteById = async (id: Note["id"]): Promise<Note> => {
  const res = await api.get(`/notes/${id}`);
  return res.data;
};

export const createNote = async (data: NewNote): Promise<Note> => {
  const res = await api.post("/notes", data);
  return res.data;
};

export const deleteNote = async (id: Note["id"]): Promise<void> => {
  await api.delete(`/notes/${id}`);
};

export const register = async (
  data: RegisterRequest,
): Promise<AuthResponse> => {
  const res = await api.post("/auth/register", data);
  return res.data;
};

export const login = async (data: LoginRequest): Promise<AuthResponse> => {
  const res = await api.post("/auth/login", data);
  return res.data;
};

export const logout = async (): Promise<void> => {
  await api.post("/auth/logout");
};

export const checkSession = async (): Promise<{ authenticated: boolean }> => {
  const res = await api.get("/auth/session");
  return res.data;
};

export const getMe = async (): Promise<User> => {
  const res = await api.get("/users/me");
  return res.data;
};

export const updateMe = async (data: UpdateMeRequest): Promise<User> => {
  const res = await api.patch("/users/me", data);
  return res.data;
};

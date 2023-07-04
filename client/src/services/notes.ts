import {
  CreateNoteInterface,
  NoteInterface,
  UpdateNoteInterface,
} from '@/types/notes.interface';
import { add } from 'date-fns';

const API_URL = 'http://localhost:3300';

const userHeaders = {
  'x-notion-userid': '',
};

export const setUserId = (userId: string) => {
  userHeaders['x-notion-userid'] = userId;
};

export const getUserHeaders = () => userHeaders;

export const getNotes = async () => {
  const response = await fetch(`${API_URL}/notes/getNotes`, {
    headers: {
      'Content-Type': 'application/json',
      ...getUserHeaders(),
    },
  });
  const { data } = await response.json();
  return data as NoteInterface[];
};

export const getNote = async (id: number) => {
  const response = await fetch(`${API_URL}/notes/getNote/${id}`, {
    headers: {
      'Content-Type': 'application/json',
      ...getUserHeaders(),
    },
  });
  const { data } = await response.json();
  return data as NoteInterface;
};

export const createNote = async (
  note: CreateNoteInterface,
): Promise<NoteInterface> => {
  const response = await fetch(`${API_URL}/notes/createNote`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...getUserHeaders(),
    },
    body: JSON.stringify(note),
  });
  const { data } = await response.json();
  return data;
};

export const updateNote = async (id: number, note: UpdateNoteInterface) => {
  const response = await fetch(`${API_URL}/notes/updateNote/${id}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...getUserHeaders(),
    },
    body: JSON.stringify(note),
  });
  const { data } = await response.json();
  return data;
};

export const deleteNote = async (id: number) => {
  const response = await fetch(`${API_URL}/notes/deleteNote/${id}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...getUserHeaders(),
    },
  });
  const { data } = await response.json();
  return data;
};

export const addNoteToFavorite = async (id: number): Promise<NoteInterface> => {
  const response = await fetch(`${API_URL}/notes/addNoteToFavorites`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...getUserHeaders(),
    },
    body: JSON.stringify({
      noteId: id,
    }),
  });
  const { data } = await response.json();
  return data;
};

export const removeNoteFromFavorite = async (
  id: number,
): Promise<NoteInterface> => {
  const response = await fetch(`${API_URL}/notes/removeNoteFromFavorites`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...getUserHeaders(),
    },
    body: JSON.stringify({
      noteId: id,
    }),
  });
  const { data } = await response.json();
  return data;
};

const NotesService = {
  getNotes,
  getNote,
  createNote,
  updateNote,
  deleteNote,
  addNoteToFavorite,
  removeNoteFromFavorite,
};

export default NotesService;

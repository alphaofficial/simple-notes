import {
  CreateNoteInterface,
  NoteInterface,
  UpdateNoteInterface,
} from '@/types/notes.interface';

const API_URL = 'http://localhost:3300';

export const getNotes = async () => {
  const response = await fetch(`${API_URL}/notes/getNotes`);
  const { data } = await response.json();
  return data;
};

export const createNote = async (
  note: CreateNoteInterface,
): Promise<NoteInterface> => {
  const response = await fetch(`${API_URL}/notes/createNote`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
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
    },
    body: JSON.stringify(note),
  });
  const { data } = await response.json();
  return data;
};

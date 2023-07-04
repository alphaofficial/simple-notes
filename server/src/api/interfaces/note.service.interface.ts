import { CreateNoteDto } from '../notes/dto/createNote.dto';
import { NoteEntity } from '@/core/notes/note.entity';

export interface NoteServiceInterface {
  createNote: (
    userId: string,
    createNoteDto: CreateNoteDto,
  ) => Promise<NoteEntity>;
  getNotes: (userId: string) => Promise<NoteEntity[]>;
  getNote: (userId: string, noteId: number) => Promise<NoteEntity>;
  updateNote: (
    userId: string,
    noteId: number,
    updateNoteDto: Partial<NoteEntity>,
  ) => Promise<NoteEntity>;
  deleteNote: (userId: string, noteId: number) => Promise<void>;
  addNoteToFavorite: (userId: string, noteId: number) => Promise<NoteEntity>;
  removeNoteFromFavorite: (
    userId: string,
    noteId: number,
  ) => Promise<NoteEntity>;
}

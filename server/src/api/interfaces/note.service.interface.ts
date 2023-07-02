import { CreateNoteDto } from '../notes/dto/createNote.dto';
import { NoteEntity } from '@/core/notes/note.entity';

export interface NoteServiceInterface {
  createNote: (
    userId: string,
    createNoteDto: CreateNoteDto,
  ) => Promise<NoteEntity>;
  getNotes: (userId: string) => Promise<NoteEntity[]>;
  getNote: (userId: string, id: number) => Promise<NoteEntity>;
  updateNote: (
    userId: string,
    id: number,
    updateNoteDto: Partial<NoteEntity>,
  ) => Promise<NoteEntity>;
  deleteNote: (userId: string, id: number) => Promise<void>;
}

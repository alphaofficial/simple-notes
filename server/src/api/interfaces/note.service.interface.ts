import { CreateNoteDto } from '../notes/dto/createNote.dto';
import { NoteEntity } from '@/core/notes/note.entity';

export interface NoteServiceInterface {
  createNote: (createNoteDto: CreateNoteDto) => Promise<NoteEntity>;
  getNotes: () => Promise<NoteEntity[]>;
  getNote: (id: number) => Promise<NoteEntity>;
  updateNote: (
    id: number,
    updateNoteDto: Partial<NoteEntity>,
  ) => Promise<NoteEntity>;
  deleteNote: (id: number) => Promise<void>;
}

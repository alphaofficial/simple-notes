import { CreateNoteDto } from '../dto/createNote.dto';
import { NoteEntity } from '@/core/notes/note.entity';

export interface NoteServiceInterface {
	createNote: (createNoteDto: CreateNoteDto) => Promise<NoteEntity>;
	getNotes: () => Promise<NoteEntity[]>;
}

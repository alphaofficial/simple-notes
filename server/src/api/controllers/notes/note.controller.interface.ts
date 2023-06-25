import {
	Either,
	ErrorResponse,
	SuccessResponse,
} from '../base/base.controller.interface';
import { NoteEntity } from '@/core/notes/note.entity';

export type CreateNoteReturnType = Either<
	SuccessResponse<NoteEntity>,
	ErrorResponse
>;

export type GetNotesReturnTypw = Either<
	SuccessResponse<NoteEntity[]>,
	ErrorResponse
>;

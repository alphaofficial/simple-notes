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

export type GetNotesReturnType = Either<
  SuccessResponse<NoteEntity[]>,
  ErrorResponse
>;

export type GetNoteReturnType = Either<
  SuccessResponse<NoteEntity>,
  ErrorResponse
>;

export type UpdateNoteReturnType = Either<
  SuccessResponse<NoteEntity>,
  ErrorResponse
>;

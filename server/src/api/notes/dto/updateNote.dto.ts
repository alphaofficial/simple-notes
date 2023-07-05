import {
  IsArray,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
} from 'class-validator';
import { Block } from '../../interfaces/note.interface';

export class UpdateNoteDto {
  @IsNumber()
  noteId: number;

  @IsString()
  @IsOptional()
  title?: string;

  @IsArray()
  @IsOptional()
  blocks?: Block[];

  @IsObject()
  @IsOptional()
  meta?: Record<string, unknown>;
}

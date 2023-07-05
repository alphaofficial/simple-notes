import { IsArray, IsObject, IsOptional, IsString } from 'class-validator';
import { Block } from '../../interfaces/note.interface';

export class CreateNoteDto {
  @IsString()
  title: string;

  @IsArray()
  blocks: Block[];

  @IsObject()
  @IsOptional()
  meta?: Record<string, unknown>;
}

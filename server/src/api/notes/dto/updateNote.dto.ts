import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsObject, IsOptional, IsString } from 'class-validator';
import { Block } from '../../interfaces/note.interface';

export class UpdateNoteDto {
  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  title?: string;

  @IsArray()
  @IsOptional()
  @ApiPropertyOptional()
  blocks?: Block[];

  @IsObject()
  @IsOptional()
  @ApiPropertyOptional()
  meta?: Record<string, unknown>;
}

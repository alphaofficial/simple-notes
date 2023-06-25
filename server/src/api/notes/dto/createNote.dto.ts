import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsObject, IsOptional, IsString } from 'class-validator';
import { Block } from '../../interfaces/note.interface';

export class CreateNoteDto {
  @IsString()
  @ApiProperty()
  title: string;

  @IsArray()
  @ApiProperty()
  blocks: Block[];

  @IsObject()
  @IsOptional()
  @ApiProperty()
  meta?: Record<string, unknown>;
}

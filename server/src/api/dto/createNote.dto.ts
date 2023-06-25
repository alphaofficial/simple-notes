import { IsObject, IsOptional, IsString } from 'class-validator';

export class CreateNoteDto {
	@IsString()
	title: string;

	@IsObject()
	content: Record<string, unknown>;

	@IsObject()
	@IsOptional()
	meta?: Record<string, unknown>;
}

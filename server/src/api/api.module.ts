import { Module } from '@nestjs/common';
import { NoteModule } from './notes/notes.module';

@Module({
	imports: [NoteModule],
})
export class ApiModule {}

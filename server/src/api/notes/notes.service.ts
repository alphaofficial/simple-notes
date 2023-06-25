import { EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Inject, Injectable } from '@nestjs/common';
import { CreateNoteDto } from '../dto/createNote.dto';
import { DatabaseAdapterInterface } from '../interfaces/database.interface';
import { NoteServiceInterface } from '../interfaces/note.service.interface';
import { NoteEntity } from '@/core/notes/note.entity';

@Injectable()
export class NoteService implements NoteServiceInterface {
	constructor(
		@Inject('DatabaseAdapterInterface')
		protected readonly databaseAdapter: DatabaseAdapterInterface,
		@InjectRepository(NoteEntity)
		private readonly noteRepository: EntityRepository<NoteEntity>,
	) {}

	async createNote({
		title,
		content,
		meta,
	}: CreateNoteDto): Promise<NoteEntity> {
		const note = new NoteEntity({ title, content, meta });
		this.noteRepository.create(note);
		await this.databaseAdapter.em.persistAndFlush(note);
		return note;
	}

	async getNotes(): Promise<NoteEntity[]> {
		const notes = await this.noteRepository.findAll({
			offset: 0,
			limit: 10,
		});
		return notes;
	}
}

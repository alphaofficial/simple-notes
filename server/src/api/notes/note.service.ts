import { EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Inject, Injectable } from '@nestjs/common';
import { CreateNoteDto } from './dto/createNote.dto';
import { UpdateNoteDto } from './dto/updateNote.dto';
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
    blocks,
    meta,
  }: CreateNoteDto): Promise<NoteEntity> {
    const note = new NoteEntity({ title, blocks, meta });
    this.noteRepository.create(note);
    await this.databaseAdapter.em.persistAndFlush(note);
    return note;
  }

  async getNotes(): Promise<NoteEntity[]> {
    const notes = await this.noteRepository.findAll({
      offset: 0,
      limit: 100,
    });
    return notes;
  }

  async getNote(id: number): Promise<NoteEntity> {
    const note = await this.noteRepository.findOne({ id });
    return note;
  }

  async updateNote(id: number, updateDto: UpdateNoteDto): Promise<NoteEntity> {
    const note = await this.noteRepository.findOne({ id });
    note.updateNote(updateDto);
    await this.databaseAdapter.em.persistAndFlush(note);
    return note;
  }

  async deleteNote(id: number): Promise<void> {
    const note = await this.noteRepository.findOne({ id });
    if (!note) return;
    await this.databaseAdapter.em.removeAndFlush(note);
  }
}

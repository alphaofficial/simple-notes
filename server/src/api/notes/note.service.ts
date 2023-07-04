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

  async createNote(
    userId: string,
    { title, blocks, meta }: CreateNoteDto,
  ): Promise<NoteEntity> {
    const note = new NoteEntity({ title, blocks, meta });
    note.setOwner(userId);
    this.noteRepository.create(note);
    await this.databaseAdapter.em.persistAndFlush(note);
    return note;
  }

  async getNotes(userId: string): Promise<NoteEntity[]> {
    const notes = await this.noteRepository.find(
      {
        ownerId: userId,
      },
      {
        offset: 0,
        limit: 100,
      },
    );
    return notes;
  }

  async getNote(userId: string, noteId: number): Promise<NoteEntity> {
    const note = await this.noteRepository.findOne({
      id: noteId,
      ownerId: userId,
    });
    return note;
  }

  async updateNote(
    userId: string,
    noteId: number,
    updateDto: UpdateNoteDto,
  ): Promise<NoteEntity> {
    const note = await this.noteRepository.findOne({
      id: noteId,
      ownerId: userId,
    });
    note.updateNote(updateDto);
    await this.databaseAdapter.em.persistAndFlush(note);
    return note;
  }

  async deleteNote(userId: string, noteId: number): Promise<void> {
    const note = await this.noteRepository.findOne({
      id: noteId,
      ownerId: userId,
    });
    if (!note) return;
    await this.databaseAdapter.em.removeAndFlush(note);
  }

  async addNoteToFavorite(userId: string, noteId: number): Promise<NoteEntity> {
    const note = await this.noteRepository.findOne({
      id: noteId,
      ownerId: userId,
    });
    if (note.isFavorite) return note;
    note.addToFavorites();
    await this.databaseAdapter.em.persistAndFlush(note);
    return note;
  }

  async removeNoteFromFavorite(
    userId: string,
    noteId: number,
  ): Promise<NoteEntity> {
    const note = await this.noteRepository.findOne({
      id: noteId,
      ownerId: userId,
    });
    if (!note.isFavorite) return note;
    note.removeFromFavorites();
    await this.databaseAdapter.em.persistAndFlush(note);
    return note;
  }
}

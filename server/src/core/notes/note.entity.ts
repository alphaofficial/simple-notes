import { BaseEntity } from '../abstract/base.entity';
import { Block } from '@/api/interfaces/note.interface';

type NoteMeta = Record<string, unknown>;
export class NoteEntity extends BaseEntity {
  public title: string;
  public blocks: Block[];
  public meta?: NoteMeta;
  public ownerId: string;
  public isFavorite: boolean;

  constructor({ title, blocks, meta }) {
    super();
    this.title = title;
    this.blocks = blocks;
    this.meta = meta;
    this.isFavorite = false;
  }

  public updateNote(update: Partial<NoteEntity>) {
    Object.assign(this, update);
  }

  public setOwner(ownerId: string) {
    this.ownerId = ownerId;
  }

  public addToFavorites() {
    this.isFavorite = true;
  }

  public removeFromFavorites() {
    this.isFavorite = false;
  }
}

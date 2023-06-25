import { BaseEntity } from '../abstract/base.entity';
import { Block } from '@/api/interfaces/note.interface';

type NoteMeta = Record<string, unknown>;
export class NoteEntity extends BaseEntity {
  public title: string;
  public blocks: Block[];
  public meta?: NoteMeta;

  constructor({ title, blocks, meta }) {
    super();
    this.title = title;
    this.blocks = blocks;
    this.meta = meta;
  }

  public updateNote(update: Partial<NoteEntity>) {
    Object.assign(this, update);
  }
}

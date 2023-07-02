import { EntitySchema } from '@mikro-orm/core';
import { NoteEntity } from '@/core/notes/note.entity';

export const NoteSchema = new EntitySchema<NoteEntity>({
  class: NoteEntity,
  tableName: 'notes',
  extends: 'BaseSchema',
  properties: {
    title: {
      type: 'string',
      nullable: false,
    },
    blocks: {
      type: 'json',
      nullable: false,
    },
    meta: {
      type: 'json',
      nullable: true,
    },
    ownerId: {
      type: 'string',
      nullable: true,
    },
    isFavorite: {
      type: 'boolean',
      nullable: true,
      default: false,
    },
  },
});

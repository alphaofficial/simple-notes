export type Block = {
  id: string;
  type: string;
  content: string;
};

export type NoteMeta =
  | (Record<string, unknown> & {
      banner: {
        type: 'image' | 'solid-color' | 'gradient-color';
        value: string;
      };
      emoji: string;
    })
  | null;

export type NoteInterface = {
  id: number;
  createdAt: string;
  updatedAt?: string | null;
  title: string;
  blocks: Block[];
  meta?: NoteMeta;
  ownerId: string;
  isFavorite: boolean;
};

export type CreateNoteInterface = {
  title: string;
  blocks: Block[];
  meta?: NoteMeta;
};

export type UpdateNoteInterface = Partial<CreateNoteInterface>;

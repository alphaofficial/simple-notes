export type Block = {
  id: string;
  type: string;
  content: string;
};

export type NoteInterface = {
  id: number;
  createdAt: string;
  updatedAt?: string | null;
  title: string;
  blocks: Block[];
  meta?:
    | (Record<string, unknown> & {
        banner: {
          type: 'image' | 'solid-color' | 'gradient-color';
          value: string;
        };
      })
    | null;
};

export type CreateNoteInterface = {
  title: string;
  blocks: Block[];
  meta?: {
    banner: {
      type: 'image' | 'solid-color' | 'gradient-color';
      value: string;
    };
  };
};

export type UpdateNoteInterface = Partial<CreateNoteInterface>;

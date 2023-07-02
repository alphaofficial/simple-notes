export interface Block {
  id: string;
  type: string;
  content: string;
}
export interface NoteInterface {
  id: string;
  title: string;
  blocks: Block[];
  meta?: Record<string, unknown>;
  createdAt: Date;
  updatedAt: Date;
  ownerId: string;
}

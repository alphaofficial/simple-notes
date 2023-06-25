import { NoteInterface } from '@/types/notes.interface';
import * as store from 'zustand';

export interface Block {
  id: string;
  type: string;
  content: string;
}

export type BlockType = 'text' | 'heading' | 'code' | 'title' | 'link';

interface NoteStore {
  notes: NoteInterface[];
  currentNote: NoteInterface | null;
  blocks: Block[];
  addNote: (note: NoteInterface) => void;
  addBlock: (id: string, previousId: string, blockType?: BlockType) => void;
  removeBlock: (id: string) => void;
  updateBlock: (id: string, content: string, blockType?: BlockType) => void;
  setNotes: (notes: NoteInterface[]) => void;
  setCurrentNote: (note: NoteInterface) => void;
}

export const useNoteStore = store.create<NoteStore>((set) => ({
  notes: [],
  currentNote: null,
  blocks: [],
  addNote: (note: NoteInterface) => {
    set((state) => ({
      notes: [...state.notes, note],
    }));
  },
  addBlock: (id: string, previousId: string, blockType?: BlockType) =>
    set((state) => {
      // push new block next to previous block
      const currentIndex = state.blocks.findIndex(
        (block) => block.id === previousId,
      );
      const newBlock = {
        id,
        type: blockType ?? 'text',
        content: '',
      };
      if (currentIndex > -1) {
        state.blocks.splice(currentIndex + 1, 0, newBlock);
      }
      return {
        blocks: [...state.blocks],
      };
    }),
  updateBlock(id, content, blockType) {
    set((state) => ({
      // TODO: use proper types
      blocks: state.blocks.map((block: any) => {
        if (block.id === id) {
          block.type = blockType ?? block.type;
          block.content = content;
        }
        return block;
      }),
    }));
  },
  removeBlock: (id: string) => {
    set((state) => ({
      // TODO: use proper types
      blocks: state.blocks.filter((block: any) => block.id !== id),
    }));
  },
  setNotes: (notes: NoteInterface[]) => {
    set(() => ({ notes }));
  },
  setCurrentNote: (note: NoteInterface) => {
    sessionStorage.setItem('lastNoteId', String(note.id));
    set(() => ({ currentNote: note, blocks: note.blocks }));
  },
}));

"use client";
import React, { useEffect, useState } from "react";
import { v4 } from "uuid";
import * as store from "zustand";

const initialId = v4();
interface Content {
  id: string;
  type: string;
  content: string;
}
interface NoteStore {
  blocks: Content[];
  addBlock: (id: string) => void;
  removeBlock: (id: string) => void;
  updateBlock: (id: string, content: string) => void;
}
const useNoteStore = store.create<NoteStore>((set) => ({
  blocks: [
    {
      id: initialId,
      type: "heading",
      content: "This is my title",
    },
  ],
  addBlock: (id: string) =>
    set((state) => ({
      blocks: [
        ...state.blocks,
        {
          id,
          type: "text",
          content: "",
        },
      ],
    })),
  updateBlock(id, content) {
    set((state) => ({
      blocks: state.blocks.map((block: any) => {
        if (block.id === id) {
          block.content = content;
        }
        return block;
      }),
    }));
  },
  removeBlock: (id: string) => {
    set((state) => ({
      blocks: state.blocks.filter((block: any) => block.id !== id),
    }));
  },
}));

const Editor = () => {
  const { blocks, addBlock, updateBlock } = useNoteStore();
  const [selectedId, setSelectedId] = useState(initialId);
  const editorRef = React.useRef<HTMLDivElement>(null);

  const handleContentChange = (e: any, id: string) => {
    const content = e.target.innerText;
    updateBlock(id, content);
    setCaretToEnd(id);
  };

  const handleKeyPress = (e: any) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addNewBlock();
    }
  };

  const setCaretToEnd = (id: string) => {
    setSelectedId(id);
    const el = editorRef.current!;
    const selectedBlock = el.querySelector(`[id="${id}"]`);
    console.log({ selectedBlock });
    if (selectedBlock) {
      const range = document.createRange();
      const selection = window.getSelection();
      range.selectNodeContents(selectedBlock);
      range.collapse(false);
      selection?.removeAllRanges();
      selection?.addRange(range);
      console.log("cursor set", { range, selection });
    }
  };

  const addNewBlock = () => {
    const id = v4();
    addBlock(id);
    setSelectedId(id);
    setCaretToEnd(id);
  };

  useEffect(() => {
    setCaretToEnd(selectedId);
  }, [selectedId, blocks]);

  return (
    <div className="editor" ref={editorRef}>
      {blocks.map((block) => (
        <div key={block.id} className={`w-full block`}>
          <div className="">
            {block.type === "text" && (
              <div
                id={block.id}
                onClick={() => setSelectedId(block.id)}
                contentEditable={selectedId === block.id}
                onInput={(e) => handleContentChange(e, block.id)}
                onKeyDown={handleKeyPress}
                data-blockid={block.id}
                onFocus={() => setSelectedId(block.id)}
                placeholder="Enter text..."
                suppressContentEditableWarning={true}
                className="focus:outline-none"
              >
                {block.content}
              </div>
            )}
            {block.type === "heading" && (
              <div
                className="text-4xl font-bold focus:outline-none mb-2"
                style={{
                  color: "rgb(55, 53, 47)",
                }}
                id={block.id}
                onClick={() => setSelectedId(block.id)}
                contentEditable={selectedId === block.id}
                onInput={(e) => handleContentChange(e, block.id)}
                onKeyDown={handleKeyPress}
                data-blockid={block.id}
              >
                {block.content}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Editor;

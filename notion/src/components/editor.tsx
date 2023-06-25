'use client';
import React, { useEffect, useState } from 'react';
import { v4 } from 'uuid';
import { useNoteStore } from '@/store/noteStore';
import useUpdateNoteMutation from '@/hooks/useUpdateNoteMutation';
import EmojiPicker, { Emoji, EmojiClickData } from 'emoji-picker-react';
import { queryClient } from '@/lib/queryClient';
import { QUERY_KEYS } from '@/hooks/queryKeys';

const initialId = v4();

const Editor = () => {
  const { currentNote, blocks, addBlock, updateBlock } = useNoteStore();
  const mutation = useUpdateNoteMutation();
  const [selectedId, setSelectedId] = useState(initialId);
  const editorRef = React.useRef<HTMLDivElement>(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [emoji, setEmoji] = useState(currentNote?.meta?.emoji ?? '1f423');

  const handleContentChange = (e: any, id: string) => {
    const content = e.target.innerText;
    updateBlock(id, content);
    const titleBlock = blocks.find((block) => block.type === 'title');
    mutation.mutate({
      id: currentNote?.id!,
      data: {
        title: titleBlock?.content ?? 'Untitled',
        blocks,
      },
    });
    setCaretToEnd(id);
  };

  const handleKeyPress = (e: any) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addNewBlock();
    }

    if (e.key === '#') {
      e.preventDefault();
      const currentBlock = blocks.find((block) => block.id === selectedId);
      if (currentBlock) {
        updateBlock(selectedId, `${currentBlock.content}`, 'heading');
      }
    }

    if (e.key === '`') {
      e.preventDefault();
      const currentBlock = blocks.find((block) => block.id === selectedId);
      if (currentBlock) {
        updateBlock(selectedId, `${currentBlock.content}`, 'code');
      }
    }

    if (e.key === 'Backspace') {
      const currentBlock = blocks.find((block) => block.id === selectedId);
      if (currentBlock && currentBlock.content === '') {
        e.preventDefault();
        const currentIndex = blocks.findIndex(
          (block) => block.id === selectedId,
        );
        if (currentIndex > 0) {
          setSelectedId(blocks[currentIndex - 1].id);
        }
      }
    }
    if (e.key === '>') {
      e.preventDefault();
      const currentBlock = blocks.find((block) => block.id === selectedId);
      if (currentBlock) {
        updateBlock(selectedId, `${currentBlock.content}`, 'link');
      }
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
      console.log('cursor set', { range, selection });
    }
  };

  const addNewBlock = () => {
    const id = v4();
    addBlock(id, selectedId);
    setSelectedId(id);
    setCaretToEnd(id);
  };

  useEffect(() => {
    setCaretToEnd(selectedId);
  }, [selectedId, blocks]);

  const onEmojiClick = (
    data: EmojiClickData,
    event: React.MouseEvent<Element, MouseEvent>,
  ) => {
    console.log(data);
  };

  const defaultBackground =
    'linear-gradient(to right, rgb(29, 78, 216), rgb(30, 64, 175), rgb(17, 24, 39))';

  return (
    <div>
      <div
        className={`h-60 w-full`}
        style={{
          background: currentNote?.meta?.banner?.value ?? defaultBackground,
        }}
      ></div>
      <div
        className="p-2"
        style={{
          position: 'absolute',
          top: '15.3rem',
          left: '27rem',
        }}
      >
        <div
          className="cursor-pointer"
          onClick={() => setShowEmojiPicker(!showEmojiPicker)}
        >
          <Emoji unified={emoji} size={50} />
        </div>
      </div>
      <div>
        {showEmojiPicker && (
          <div style={{ position: 'absolute', top: '19rem', left: '18rem' }}>
            <EmojiPicker
              onEmojiClick={async (data, ev) => {
                setEmoji(data.unified);
                const response = await mutation.mutateAsync({
                  id: currentNote?.id!,
                  data: {
                    ...currentNote,
                    // @ts-ignore
                    meta: {
                      ...(currentNote?.meta ?? {}),
                      emoji: data.unified,
                    },
                  },
                });
                console.log({ response, data });
                queryClient.invalidateQueries([QUERY_KEYS.notes]);
              }}
            />
          </div>
        )}
      </div>

      <div className="flex flex-row justify-center mt-24">
        <div className="w-2/3">
          <div className="editor" ref={editorRef}>
            {blocks.map((block) => (
              <div key={block.id} className={`w-full block`}>
                <div className="">
                  {block.type === 'title' && (
                    <div
                      className="text-5xl font-bold focus:outline-none mb-4"
                      style={{
                        color: 'rgb(55, 53, 47)',
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
                  {block.type === 'text' && (
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
                      className="focus:outline-none mb-2"
                    >
                      {block.content}
                    </div>
                  )}
                  {block.type === 'heading' && (
                    <div
                      className="text-3xl font-bold focus:outline-none mb-2"
                      style={{
                        color: 'rgb(55, 53, 47)',
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
                  {block.type === 'code' && (
                    <div
                      className="focus:outline-none mb-2 font-mono"
                      style={{
                        color: 'rgb(55, 53, 47)',
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
        </div>
      </div>
    </div>
  );
};

export default Editor;

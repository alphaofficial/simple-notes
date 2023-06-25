'use client';
import { useNoteStore } from '@/store/noteStore';
import { Emoji } from 'emoji-picker-react';
import React from 'react';

export type TopBarProps = {
  title: string;
  icon?: string;
};

export default function TopBar() {
  const { currentNote } = useNoteStore();
  const titleBlock = currentNote?.blocks.find(
    (block) => block.type === 'title',
  );
  return (
    <div className="h-10 flex flex-row items-center px-2">
      <div className="flex flex-row items-center space-x-2">
        <div>
          <Emoji unified={currentNote?.meta?.emoji! ?? '1f423'} size={15} />
        </div>
        <p className="text-sm">{titleBlock?.content ?? currentNote?.title}</p>
      </div>
    </div>
  );
}

'use client';
import { useNoteStore } from '@/store/noteStore';
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
      <div>
        <p className="text-sm">{titleBlock?.content ?? currentNote?.title}</p>
      </div>
    </div>
  );
}

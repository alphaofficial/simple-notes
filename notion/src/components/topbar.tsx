'use client';
import { useNoteStore } from '@/store/noteStore';
import { formatDate } from '@/utilities/date-formatter';
import { Emoji } from 'emoji-picker-react';
import React from 'react';
import { LiaCommentSolid } from 'react-icons/lia';
import { AiOutlineClockCircle, AiOutlineStar } from 'react-icons/ai';

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
    <div className="h-10 flex flex-row justify-between items-center px-2">
      <div className="flex flex-row items-center space-x-2">
        <div>
          <Emoji unified={currentNote?.meta?.emoji! ?? '1f423'} size={15} />
        </div>
        <p className="text-sm">{titleBlock?.content ?? currentNote?.title}</p>
      </div>
      <div className="flex flex-row items-center space-x-3 text-sm">
        <div className="text-gray-600">
          {`${formatDate(currentNote?.updatedAt! ?? currentNote?.createdAt!)}`}
        </div>
        <div>
          <button>Share</button>
        </div>
        <button>
          <LiaCommentSolid size={20} />
        </button>
        <button>
          <AiOutlineClockCircle size={20} />
        </button>
        <button>
          <AiOutlineStar size={20} />
        </button>
      </div>
    </div>
  );
}

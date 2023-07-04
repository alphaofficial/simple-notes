import { useNoteStore } from '@/store/noteStore';
import { formatDate } from '@/utilities/date-formatter';
import { Emoji } from 'emoji-picker-react';
import React from 'react';
import { LiaCommentSolid } from 'react-icons/lia';
import {
  AiOutlineClockCircle,
  AiOutlineStar,
  AiFillStar,
} from 'react-icons/ai';
import { BsThreeDots } from 'react-icons/bs';
import NotesService from '@/services/notes';
import useNotes from '@/hooks/useNotes';

export type TopBarProps = {
  title: string;
  icon?: string;
};

export default function TopBar() {
  const { currentNote, toggleNoteFavorite, setCurrentNote } = useNoteStore();
  const { refetch } = useNotes();
  const titleBlock = currentNote?.blocks.find(
    (block) => block.type === 'title',
  );

  async function toggleNoteFavoriteHandler() {
    console.log({ called: 'toggleNoteFavoriteHandler', currentNote });
    const beforeToggle = currentNote?.isFavorite;
    toggleNoteFavorite(currentNote?.id!);
    setCurrentNote({ ...currentNote!, isFavorite: !currentNote!.isFavorite });
    const executeTogle = beforeToggle
      ? NotesService.removeNoteFromFavorite
      : NotesService.addNoteToFavorite;
    const note = await executeTogle(currentNote?.id!);
    setCurrentNote(note);
    await refetch();
  }

  if (!currentNote) return;

  return (
    <div className="h-10 flex flex-row justify-between items-center px-2">
      <div className="flex flex-row items-center space-x-2">
        <div>
          <Emoji
            unified={(currentNote?.meta?.emoji as string) ?? '1f423'}
            size={15}
          />
        </div>
        <p className="text-sm">{titleBlock?.content ?? currentNote?.title}</p>
      </div>
      <div className="flex flex-row items-center space-x-3 text-sm">
        <div className="text-gray-600">
          {currentNote
            ? `Edited ${formatDate(
                (currentNote?.updatedAt as string) ?? currentNote?.createdAt,
              )}`
            : ''}
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
        <button onClick={toggleNoteFavoriteHandler}>
          {currentNote.isFavorite ? (
            <AiFillStar size={20} className="text-yellow-500" />
          ) : (
            <AiOutlineStar size={20} />
          )}
        </button>
        <button>
          <BsThreeDots size={20} />
        </button>
      </div>
    </div>
  );
}

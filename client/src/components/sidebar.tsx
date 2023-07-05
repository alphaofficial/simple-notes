import React from 'react';
import { IconType } from 'react-icons';
import { IoSearchSharp } from 'react-icons/io5';
import { RxCaretRight } from 'react-icons/rx';
import { AiOutlineClockCircle, AiFillPlusCircle } from 'react-icons/ai';
import { BiSolidCog } from 'react-icons/bi';
import { useNoteStore } from '@/store/noteStore';
import { CreateNoteInterface, NoteInterface } from '@/types/notes.interface';
import { v4 } from 'uuid';
import { truncate } from '@/utilities/truncate';
import { Emoji } from 'emoji-picker-react';
import { slugify } from '@/utilities/slugify';
import { useRouter } from 'next/router';
import { MdMoreHoriz, MdDelete } from 'react-icons/md';
import useNotes from '@/hooks/useNotes';
import NotesService from '@/services/notes';
import { UserButton, useUser } from '@clerk/nextjs';

type NoteListItemProps = {
  note: NoteInterface;
};

type ActionListItemProps = {
  title: string;
  icon: IconType;
  onClickAction: () => void;
};

type UserIdItemProps = {
  username: string;
  avatar: string;
};

const NoteListItem: React.FC<NoteListItemProps> = ({ note }) => {
  const { deleteNote, setCurrentNote } = useNoteStore();
  const { refetch } = useNotes();
  const router = useRouter();

  async function deleteNoteHandler(e: any) {
    e.stopPropagation();
    e.preventDefault();
    deleteNote(note.id);
    await NotesService.deleteNote(note.id);
    await refetch();
  }

  function onClickNote() {
    setCurrentNote(note);
    router.push(`/notes/${slugify(note.title)}:${note.id}`);
  }

  return (
    <div
      onClick={onClickNote}
      className="flex flex-row items-center justify-between space-x-1 px-2 hover:bg-gray-200 py-1 cursor-pointer group"
    >
      <div className="flex flex-row items-center">
        <div className="text-gray-500">
          <RxCaretRight size={20} className="text-gray-500" />
        </div>
        <div className="font-semibold text-gray-500 flex flex-row items-center space-x-2">
          <div>
            <Emoji unified={note.meta?.emoji! ?? '1f423'} size={15} />
          </div>
          <div>{truncate(note.title, 30)}</div>
        </div>
      </div>
      <div className="hidden group-hover:block">
        <div className="flex flex-row items-center space-x-2">
          <div>
            <MdMoreHoriz size={20} className="text-gray-500" />
          </div>
          <div onClick={deleteNoteHandler}>
            <MdDelete size={20} className="text-gray-500" />
          </div>
        </div>
      </div>
    </div>
  );
};

const ActionListItem: React.FC<ActionListItemProps> = ({
  title,
  icon,
  onClickAction,
}) => {
  return (
    <div
      onClick={onClickAction}
      className="flex flex-row items-center space-x-2 cursor-pointer px-4 hover:bg-gray-200 py-1"
    >
      <div>{icon({ size: 15, className: 'text-gray-500' })}</div>
      <div className="font-semibold text-gray-500">{title}</div>
    </div>
  );
};

const UserIdItem = () => {
  const { user } = useUser();
  return (
    <div>
      <div className="flex flex-row space-x-2 items-center">
        <div>
          <UserButton afterSignOutUrl="/" />
        </div>
        <div>
          <p className="text-md font-semibold">
            {user?.fullName ?? user?.username}
          </p>
        </div>
      </div>
    </div>
  );
};

export default function Sidebar() {
  const { notes, favorites, refetch, update: updateNote } = useNotes();
  const { setCurrentNote } = useNoteStore();
  const router = useRouter();
  const ACTION_LIST = [
    {
      title: 'Search',
      key: 'search',
      icon: IoSearchSharp,
      onclick: () => {},
    },
    {
      title: 'Updates',
      key: 'updates',
      icon: AiOutlineClockCircle,
      onClick: () => {},
    },
    {
      title: 'Settings and Members',
      key: 'settings-and-members',
      icon: BiSolidCog,
      onClick: () => {},
    },
    {
      title: 'New Page',
      key: 'new-page',
      icon: AiFillPlusCircle,
      onClick: async () => {
        const payload = {
          title: 'Untitled',
          blocks: [
            {
              id: v4(),
              type: 'title',
              content: 'Untitled',
            },
          ],
          meta: {
            banner: {
              type: 'gradient-color',
              value:
                'linear-gradient(to right, rgb(236, 72, 153), rgb(239, 68, 68), rgb(234, 179, 8))',
            },
            emoji: '1f4d3',
          },
        } as CreateNoteInterface;
        await updateNote(
          [
            ...(notes?.length ? notes : []),
            // using id zero for optimistic update.
            // it will be updated after cache invalidation
            { ...payload, id: 0 } as NoteInterface,
          ],
          {
            rollbackOnError: true,
            populateCache: true,
            revalidate: false,
          },
        );
        const response = await NotesService.createNote(payload);
        setCurrentNote(response);
        await refetch();
        router.push(`/notes/${slugify(response.title)}:${response.id}`);
      },
    },
  ];

  return (
    <div className="h-screen relative">
      <div className="h-10 px-4 flex flex-row items-center">
        <UserIdItem />
      </div>
      <div className="text-sm">
        <div className="space-y-2">
          {ACTION_LIST.map(({ title, icon, key, onClick }) => (
            <ActionListItem
              key={key}
              onClickAction={onClick!}
              title={title}
              icon={icon}
            />
          ))}
        </div>
        {!!favorites?.length && (
          <div
            className="mt-8 overflow-scroll"
            style={{
              maxHeight: 'calc(100vh - 250px)',
            }}
          >
            <div className="px-4 py-1 font-semibold text-gray-500 uppercase text-xs">
              Favorites
            </div>
            {favorites?.map((note) => (
              <div key={note.id} className="my-2">
                <NoteListItem note={note} />
              </div>
            ))}
          </div>
        )}
        <div
          className="mt-4 overflow-scroll"
          style={{
            maxHeight: 'calc(100vh - 250px)',
          }}
        >
          <div className="px-4 py-1 font-bold text-gray-500 uppercase text-xs">
            Notes
          </div>
          {notes?.map((note) => (
            <div key={note.id} className="my-2 transition ease-in">
              <NoteListItem note={note} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

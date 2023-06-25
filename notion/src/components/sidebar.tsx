'use client';
import React from 'react';
import { IconType } from 'react-icons';
import { IoSearchSharp } from 'react-icons/io5';
import { RxCaretRight } from 'react-icons/rx';
import { AiOutlineClockCircle, AiFillPlusCircle } from 'react-icons/ai';
import { BiSolidCog } from 'react-icons/bi';
import { useNoteStore } from '@/store/noteStore';
import { NoteInterface } from '@/types/notes.interface';
import useNotesQuery from '@/hooks/useNotesQuery';
import useCreateNoteMutation from '@/hooks/useCreateNoteMutation';
import { queryClient } from '@/lib/queryClient';
import { v4 } from 'uuid';
import { truncate } from '@/utilities/truncate';

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
  const { setCurrentNote } = useNoteStore();
  return (
    <div
      onClick={() => setCurrentNote(note)}
      className="flex flex-row items-center space-x-1 px-2 hover:bg-gray-200 py-1 cursor-pointer"
    >
      <div className="text-gray-500">
        <RxCaretRight size={20} className="text-gray-500" />
      </div>
      <div className="font-semibold text-gray-500">
        {truncate(note.title, 30)}
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

const UserIdItem: React.FC<UserIdItemProps> = () => {
  return (
    <div>
      <div className="flex flex-row space-x-2 text-md font-semibold">
        <div>Username</div>
      </div>
    </div>
  );
};

export default function Sidebar() {
  const { notes } = useNotesQuery();
  const mutation = useCreateNoteMutation();
  const { setCurrentNote } = useNoteStore();
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
        const response = await mutation.mutateAsync({
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
        });
        // setCurrentNote to the newly created note
        setCurrentNote(response);
        queryClient.invalidateQueries(['notes']);
      },
    },
  ];

  return (
    <div className="h-screen">
      <div className="h-10 px-4 flex flex-row items-center">
        <UserIdItem username="Albert" avatar="" />
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
        <div
          className="mt-8 overflow-scroll"
          style={{
            maxHeight: 'calc(100vh - 250px)',
          }}
        >
          <div className="px-4 py-1 font-semibold text-gray-500">Notes</div>
          {notes?.map((note) => (
            <div key={note.id} className="my-2">
              <NoteListItem note={note} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

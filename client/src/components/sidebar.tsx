"use client";
import React from "react";
import { IconType } from "react-icons";
import { IoSearchSharp } from "react-icons/io5";
import { RxCaretRight } from "react-icons/rx";
import { AiOutlineClockCircle, AiFillPlusCircle } from "react-icons/ai";
import { BiSolidCog } from "react-icons/bi";

const ACTION_LIST = [
  {
    title: "Search",
    icon: IoSearchSharp,
  },
  {
    title: "Updates",
    icon: AiOutlineClockCircle,
  },
  {
    title: "Settings and Members",
    icon: BiSolidCog,
  },
  {
    title: "New Page",
    icon: AiFillPlusCircle,
  },
];

type NoteListItemProps = {
  title: string;
};

type ActionListItemProps = {
  title: string;
  icon: IconType;
};

type UserIdItemProps = {
  username: string;
  avatar: string;
};

const NoteListItem: React.FC<NoteListItemProps> = ({ title }) => {
  return (
    <div className="flex flex-row items-center space-x-2 px-4 hover:bg-gray-200 py-1">
      <div>
        <RxCaretRight size={20} />
      </div>
      <div>{title}</div>
    </div>
  );
};

const ActionListItem: React.FC<ActionListItemProps> = ({ title, icon }) => {
  return (
    <div className="flex flex-row items-center space-x-2 cursor-pointer px-4 hover:bg-gray-200 py-1">
      <div>{icon({ size: 15 })}</div>
      <div>{title}</div>
    </div>
  );
};

const UserIdItem: React.FC<UserIdItemProps> = () => {
  return (
    <div>
      <div className="flex flex-row space-x-2 text-md font-semibold">
        <div>avatar</div>
        <div>username</div>
      </div>
    </div>
  );
};

export default function Sidebar() {
  return (
    <div className="h-screen">
      <div className="h-10 px-4 flex flex-row items-center">
        <UserIdItem username="Albert" avatar="" />
      </div>
      <div className="text-sm">
        <div className="space-y-2">
          {ACTION_LIST.map(({ title, icon }) => (
            <ActionListItem key={title} title={title} icon={icon} />
          ))}
        </div>
        <div
          className="mt-8 overflow-scroll"
          style={{
            maxHeight: "calc(100vh - 250px)",
          }}
        >
          <div className="px-4 py-1 font-semibold">Notes</div>
          {Array.from({ length: 50 }).map((_, i) => (
            <div key={`page-${i}`} className="my-2">
              <NoteListItem title={`page-${i}`} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

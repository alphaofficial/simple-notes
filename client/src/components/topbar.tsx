import React from "react";

export type TopBarProps = {
  title: string;
  icon?: string;
};

export default function TopBar({ title }: TopBarProps) {
  return (
    <div className="h-10 flex flex-row items-center px-2">
      <div>
        <p className="text-sm">{title}</p>
      </div>
    </div>
  );
}

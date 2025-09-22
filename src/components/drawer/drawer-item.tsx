import React from "react";

interface DrawerItem {
  id: string;
  title: string;
  onClick: () => void;
  children: React.ReactNode;
}

function DrawerItem({ id, title, onClick, children }: DrawerItem) {
  return (
    <li>
      <button
        className="flex w-full items-center justify-between text-left"
        onClick={onClick}>
        <div className="flex-1">
          <span className="font-bold">{id}:&nbsp;</span>
          <span>{title}</span>
        </div>
        {children}
      </button>
    </li>
  );
}

export default DrawerItem;
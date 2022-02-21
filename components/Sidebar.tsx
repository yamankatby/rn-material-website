import Link from "next/link";
import React from "react";

interface ISidebarItem {
  path: string;
}

type ISidebarGroup = ISidebarItem[];

export type ISidebar = Array<ISidebarItem | ISidebarGroup>;

interface IProps {
  sidebar: ISidebar;
}

const Sidebar: React.FC<IProps> = ({ sidebar }) => {
  const getItem = (item: ISidebarItem) => (
    <li>
      <Link href={item.path}>
        <a>{item.path}</a>
      </Link>
    </li>
  )

  const getGroup = (group: ISidebarGroup) => (
    <li>
      <ul>
        {group.map(getItem)}
      </ul>
    </li>
  )

  return (
    <ul>
      {sidebar.map(item => Array.isArray(item) ? getGroup(item) : getItem(item))}
    </ul>
  );
}

export default Sidebar;

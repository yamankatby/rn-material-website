import Link from "next/link";
import React from "react";

interface ISidebarItem {
  path: string;
  sidebar_position?: number;
}

interface ISidebarGroup {
  title: string;
  sidebar_position?: number;
  items: ISidebarItem[];
}

export type ISidebar = Array<ISidebarItem | ISidebarGroup>;

interface IProps {
  sidebar: ISidebar;
}

const Sidebar: React.FC<IProps> = ({ sidebar }) => {
  const getItem = (item: ISidebarItem) => (
    <li key={item.path}>
      <Link href={item.path}>
        <a>{item.path}</a>
      </Link>
    </li>
  );

  const getGroup = (group: ISidebarGroup) => (
    <li key={group.title}>
      <ul>{group.items.sort((a, b) => (a.sidebar_position || 0) - (b.sidebar_position || 0)).map(getItem)}</ul>
    </li>
  );

  return (
    <ul>
      {sidebar
        .sort((a, b) => (a.sidebar_position || 0) - (b.sidebar_position || 0))
        .map((item) => ("items" in item ? getGroup(item) : getItem(item)))}
    </ul>
  );
};

export default Sidebar;

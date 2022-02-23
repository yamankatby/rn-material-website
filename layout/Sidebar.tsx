import React from "react";
import Link from "next/link";
import cx from 'classnames';

export interface ISidebarGroupCategory {
  title: string;
  sidebar_position?: number;
}

export interface ISidebarItem {
  title?: string;
  description?: string;
  path: string;
  sidebar_position?: number;
  breadcrumbs: ISidebarGroupCategory[];
}

interface ISidebarGroup extends ISidebarGroupCategory {
  items: ISidebarItem[];
}

export type ISidebar = Array<ISidebarItem | ISidebarGroup>;

interface IProps {
  sidebar: ISidebar;
  current: ISidebarItem;
}

const Sidebar: React.FC<IProps> = ({ sidebar, current }) => {
  const getItem = (item: ISidebarItem) => (
    <li key={item.path}>
      <Link href={item.path}>
        <a
          className={cx(
            "mt-0.5 px-3 py-2 flex justify-between items-center rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 hover:underline",
            { "bg-primary-500 bg-opacity-10 hover:bg-primary-500 hover:bg-opacity-20 text-primary-500": item.path === current.path },
          )}>
          {item.title || item.path}
        </a>
      </Link>
    </li>
  );

  const getGroup = (group: ISidebarGroup) => (
    <li key={group.title}>
      <span className="mt-6 mb-3 block uppercase text-xs text-gray-500">{group.title}</span>
      <ul className="pl-3 border-l dark:border-gray-700">{group.items.map(getItem)}</ul>
    </li>
  );

  return (
    <ul className="m-4">
      {sidebar.map((item) => ("items" in item ? getGroup(item) : getItem(item)))}
    </ul>
  );
};

export default Sidebar;

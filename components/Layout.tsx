import React, { useEffect } from "react";
import Sidebar, { ISidebar, ISidebarItem } from "./Sidebar";

interface IProps {
  sidebar: ISidebar;
  current: ISidebarItem;
  prev: ISidebarItem | null;
  next: ISidebarItem | null;
}

const Layout: React.FC<IProps> = ({ sidebar, children, ...rest }) => {
  useEffect(() => {
    console.log(rest)
  }, [rest])
  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      <Sidebar sidebar={sidebar} />
      <div className="prose max-w-3xl mx-auto">
        {children}
      </div>
    </div>
  )
}

export default Layout;

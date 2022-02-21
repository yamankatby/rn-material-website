import React from "react";
import Sidebar, { ISidebar } from "./Sidebar";

interface IProps {
  sidebar: ISidebar;
}

const Layout: React.FC<IProps> = ({ sidebar, children }) => {
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

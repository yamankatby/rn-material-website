import React, { PropsWithChildren } from "react";
import Head from "next/head";
import Sidebar, { ISidebar, ISidebarItem } from "./Sidebar";

interface IProps {
  sidebar: ISidebar;
  current: ISidebarItem;
  prev: ISidebarItem | null;
  next: ISidebarItem | null;
}

const Layout: React.FC<IProps> = ({ sidebar, current, children }) => {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      <Head>
        <title>{current.title} | React Native Material</title>
        <meta name="description" content={current.description} />
      </Head>

      <Sidebar sidebar={sidebar} />
      <div className="prose max-w-3xl mx-auto">{children}</div>
    </div>
  );
};

export const withLayout = (props: PropsWithChildren<IProps>) => <Layout {...props} />;

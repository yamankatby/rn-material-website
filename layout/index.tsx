import React, { PropsWithChildren, useState } from "react";
import Head from "next/head";
import Script from "next/script";
import { ThemeProvider } from "next-themes";
import cx from "classnames";
import Sidebar, { ISidebar, ISidebarItem } from "./Sidebar";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
import Footer from "./Footer";
import Nav from "./Nav";
import Pager from "./Pager";
import Breadcrumbs from "./Breadcrumbs";
import SearchBox from "./SearchBox";

interface IProps {
  sidebar: ISidebar;
  current: ISidebarItem;
  prev: ISidebarItem | null;
  next: ISidebarItem | null;
}

const Layout: React.FC<IProps> = ({ sidebar, current, prev, next, children }) => {
  const [sidebarVisible, setSidebarVisible] = useState(false);
  return (
    <ThemeProvider defaultTheme="light">
      <Head>
        <title>{current.title} | React Native Material</title>
        <meta name="description" content={current.description} />
      </Head>

      <Script src="https://www.googletagmanager.com/gtag/js?id=G-RJL6PXS3XY" strategy="afterInteractive" />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-RJL6PXS3XY');
        `}
      </Script>

      <div className="min-h-screen flex flex-col lg:flex-row">
        <div
          className="fixed w-full lg:w-80 max-h-full lg:h-screen bg-white dark:bg-gray-900 lg:border-r dark:border-gray-800 overflow-y-scroll">
          <Nav />
          <aside className={cx("border-b lg:border-b-0 dark:border-gray-800", { "hidden lg:block": !sidebarVisible })}>
            <SearchBox />
            <Sidebar sidebar={sidebar} current={current} />
          </aside>
        </div>

        <main className="w-full pt-28 sm:pt-20 lg:pt-0 lg:ml-80 2xl:mr-80">
          <div className="max-w-3xl min-h-screen mx-auto flex flex-col px-4">
            <Breadcrumbs breadcrumbs={current.breadcrumbs} />
            <article className="flex-1 prose dark:prose-invert max-w-none">{children}</article>
            <Pager prev={prev} next={next} />
            <Footer />
          </div>
        </main>

        <button
          className="w-12 h-12 lg:hidden fixed bottom-4 left-4 bg-gray-300 dark:bg-gray-600 rounded-full"
          onClick={() => setSidebarVisible((prevState) => !prevState)}
        >
          {sidebarVisible ? <XIcon className="w-6 h-6 m-auto" /> : <MenuIcon className="w-6 h-6 m-auto" />}
        </button>
      </div>
    </ThemeProvider>
  );
};

export const withLayout = (props: PropsWithChildren<IProps>) => <Layout {...props} />;

import React, { PropsWithChildren } from "react";
import Script from "next/script";
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
      <Script src="https://www.googletagmanager.com/gtag/js?id=G-PTGCSNV1RJ" strategy="afterInteractive" />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-PTGCSNV1RJ');
        `}
      </Script>

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

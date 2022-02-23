import React, { useMemo } from "react"
import { useRouter } from "next/router";
import Link from "next/link";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/outline";
import { ISidebarItem } from "./Sidebar";

interface IProps {
  prev: ISidebarItem | null;
  next: ISidebarItem | null;
}

const Pager: React.FC<IProps> = ({prev, next}) => {
  return (
    <nav className="my-12 py-12 flex border-y dark:border-gray-800">
      <div className="flex-1">
        {prev && (
          <Link href={prev.path}>
            <a className="h-24 p-4 flex-1 flex items-center rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 group">
              <ChevronLeftIcon className="w-5 text-gray-500" />
              <div className="ml-6 flex flex-col">
                <div className="text-gray-500 text-sm">PREVIOUS</div>
                <div className="mt-0.5 text-primary font-bold group-hover:underline">
                  {prev.title || prev.path}
                </div>
              </div>
            </a>
          </Link>
        )}
      </div>
      <div className="flex-1">
        {next && (
          <Link href={next.path}>
            <a className="h-24 p-4 flex-1 flex justify-end items-center rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 group">
              <div className="mr-6 flex flex-col items-end">
                <div className="text-gray-500 text-sm">NEXT</div>
                <div className="mt-0.5 text-primary font-bold group-hover:underline">
                  {next.title || next.path}
                </div>
              </div>
              <ChevronRightIcon className="w-5 text-gray-500" />
            </a>
          </Link>
        )}
      </div>
    </nav>
  )
}

export default Pager

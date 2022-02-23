import React from "react"
import Logo from "./Logo";
import { ChevronRightIcon } from "@heroicons/react/outline";
import Link from "next/link";
import { ISidebarGroupCategory } from "./Sidebar";

interface IProps {
  breadcrumbs: ISidebarGroupCategory[];
}

const Breadcrumbs: React.FC<IProps> = ({ breadcrumbs }) => {
  return (
    <nav className="my-6 flex items-center">
      <Link href="/">
        <a>
          <Logo className="w-6" />
        </a>
      </Link>
      <ChevronRightIcon className="mx-4 w-5" />
      {breadcrumbs.map((breadcrumb, index) => (
        <React.Fragment key={index}>
          <a className="text-gray-700">{breadcrumb.title}</a>
          <ChevronRightIcon className="mx-4 w-5" />
        </React.Fragment>
      ))}
    </nav>
  )
}

export default Breadcrumbs

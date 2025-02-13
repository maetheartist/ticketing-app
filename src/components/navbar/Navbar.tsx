"use client";

import { usePathname } from "next/navigation"; 
import Link from "next/link";
import { ABOUT_PAGE, EVENTS_PAGE, TICKET_PAGE } from "../../config/routes";
import Logo from "../common/logo";
import { ArrowRightIcon } from "../icons";
import { Button } from "antd";

const navList = [
  { label: "Events", href: EVENTS_PAGE },
  { label: "My Tickets", href: TICKET_PAGE },
  { label: "About", href: ABOUT_PAGE },
];

const Navbar = () => {
  const pathname = usePathname();

  return (
    <div className="w-[inherit] [backdrop-filter:blur(4px)] rounded-3xl bg-gray-200/[0.4] border-teal border flex items-center justify-between py-3 px-4 text-lg text-darkgray fixed top-10 z-50">
      <Logo />
      <div className="items-center gap-9 hidden md:flex">
        {navList.map((nav, i) => (
          <Link key={i} href={nav.href}>
            <span className={nav.href === pathname ? "text-white" : "text-darkgray"}>
              {nav.label}
            </span>
          </Link>
        ))}
      </div>
      <Button type="default" size="large" className="flex gap-2 items-center justify-start text-base text-gray-700">
        <p className="uppercase font-jeju">My Tickets</p>
        <ArrowRightIcon className="text-base" />
      </Button>
    </div>
  );
};

export default Navbar;

"use client";

import {
  UserGroupIcon,
  HomeIcon,
  DocumentDuplicateIcon,
  HashtagIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const links = [
  { name: "Home", href: "/app", icon: HomeIcon, hideOnMobile: false },
  {
    name: "Invoices",
    href: "/app/invoices",
    icon: HashtagIcon,
    hideOnMobile: true,
  },
  {
    name: "Customers",
    href: "/app/customers",
    icon: HashtagIcon,
    hideOnMobile: true,
  },
];

export default function NavLinks() {
  const pathname = usePathname();
  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              "h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium md:flex hover:bg-primary-foreground md:flex-none md:justify-start md:p-2 md:px-3",
              {
                "bg-primary-foreground text-secondary": pathname === link.href,
                hidden: link.hideOnMobile,
                flex: !link.hideOnMobile,
              }
            )}
          >
            <LinkIcon className="w-6" />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}

"use client";

import { ListBulletIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

type Props = {
  name: string;
  href: string;
};

export default function NavLink({ name, href }: Props) {
  const pathname = usePathname();
  return (
    <Link
      key={name}
      href={href}
      className={clsx(
        "flex md:hidden h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-primary-foreground md:flex-none md:justify-start md:p-2 md:px-3",
        {
          "bg-primary-foreground text-secondary": pathname === href,
        }
      )}
    >
      <ListBulletIcon className="w-6" />
      <p className="md:block">{name}</p>
    </Link>
  );
}

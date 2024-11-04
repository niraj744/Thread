"use client";

import { navigation } from "@/Constants/Constants";
import { cn } from "@/lib/utils";
import { useClerk } from "@clerk/nextjs";
import { LogOut } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function MobileNav() {
  const pathname = usePathname();
  const { signOut } = useClerk();
  return (
    <>
      <aside className="md:hidden md:sticky bg-secondary p-4 capitalize sm:w-[5rem] sm:static w-full fixed bottom-0 z-10 backdrop-blur-xl">
        <ul className="flex flex-row sm:flex-col justify-between h-fit sm:justify-center flex-1 gap-2 sm:h-[75vh]">
          {navigation.map((link) => (
            <li key={link.name}>
              <Link
                href={link.link}
                className={cn(
                  "flex gap-3 items-center p-3 rounded-md text-gray-300",
                  pathname === link.link
                    ? "bg-primary font-bold text-white"
                    : ""
                )}
              >
                {link.icon}
              </Link>
            </li>
          ))}
        </ul>
        <div
          className="hidden sm:flex gap-3 items-center p-3 rounded-md text-gray-300 cursor-pointer"
          role="button"
          onClick={() => signOut({ redirectUrl: "/auth/sign-in" })}
        >
          <LogOut />
        </div>
      </aside>
    </>
  );
}

"use client";

import { navigation } from "@/Constants/Constants";
import { cn } from "@/lib/utils";
import { useClerk } from "@clerk/nextjs";
import { LogOut } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navigation() {
  const { signOut } = useClerk();
  const pathname = usePathname();
  return (
    <>
      <aside className="sticky hidden md:block bg-secondary p-4 capitalize w-[15rem] h-[90vh]">
        <ul className="flex flex-col justify-center flex-1 gap-2 h-[75vh]">
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
                <span>{link.name}</span>
              </Link>
            </li>
          ))}
        </ul>
        <div
          className="flex gap-3 items-center p-3 rounded-md text-gray-300 cursor-pointer"
          role="button"
          onClick={() => signOut({ redirectUrl: "/auth/sign-in" })}
        >
          <LogOut />
          <span>logout</span>
        </div>
      </aside>
    </>
  );
}

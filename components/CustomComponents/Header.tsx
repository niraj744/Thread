"use client";

import { OrganizationSwitcher, useClerk } from "@clerk/nextjs";
import Logo from "./Logo";
import { LogOut } from "lucide-react";

export default function Header() {
  const { signOut } = useClerk();
  return (
    <>
      <header className="bg-secondary p-4 flex justify-between sticky top-0 z-30">
        <Logo />
        <div className="flex">
          <div
            className="sm:hidden flex gap-3 items-center p-3 rounded-md text-gray-300"
            role="button"
            onClick={() => signOut({ redirectUrl: "/auth/sign-in" })}
          >
            <LogOut />
          </div>
          <OrganizationSwitcher />
        </div>
      </header>
    </>
  );
}

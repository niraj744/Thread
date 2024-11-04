import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Logo() {
  return (
    <>
      <Link href={"/"} className="flex items-center gap-2 capitalize">
        <Image src={"/logo.svg"} alt="logo image" width={30} height={30} />
        <h1 className="font-bold text-xl">threads</h1>
      </Link>
    </>
  );
}

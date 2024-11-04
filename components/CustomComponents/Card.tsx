import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";

export default function Card() {
  return (
    <>
      <div className="flex mt-5 justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="img relative w-[3rem] h-[3rem]">
            <Image
              src={"/profile.jpg"}
              alt="profile image"
              fill
              className="rounded-full"
            />
          </div>
          <div className="detail">
            <h1 className="font-bold text-lg">faizan</h1>
            <p className="text-gray-500">jsm mastery</p>
          </div>
        </div>
        <Link href={"/"}>
          <Button>view</Button>
        </Link>
      </div>
    </>
  );
}

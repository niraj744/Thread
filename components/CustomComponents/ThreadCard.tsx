import { Forward, Heart, MessageCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function ThreadCard() {
  return (
    <>
      <article className="p-6 rounded-md bg-secondary text-gray-300">
        <div className="flex gap-4">
          <div className="img w-[3rem] h-[3rem] relative">
            <Image
              src={"/profile.jpg"}
              alt="user profile image"
              fill
              className="rounded-full"
            />
            <div className="absolute inset-0 w-[2px] h-[3rem] bg-gray-800 z-0 left-[50%] top-[100%]"></div>
          </div>
          <div className="detail capitalize">
            <Link href={"/"} className="hover:underline underline-offset-4">
              <h1 className="font-bold text-lg">faizan</h1>
            </Link>
            <p>what is react js in one word</p>
            <div className="flex gap-5 items-center mt-5">
              <button>
                <Heart className="text-gray-500" size={20} />
              </button>
              <button>
                <MessageCircle className="text-gray-500" size={20} />
              </button>
              <button>
                <Forward className="text-gray-500" size={20} />
              </button>
            </div>
          </div>
        </div>
        <div className="replies flex items-center mt-5">
          <div className="flex">
            <img
              src="/profile.jpg"
              alt="user profile image"
              className="w-[2rem] h-[2rem] rounded-full"
            />
            <img
              src="/profile.jpg"
              alt="user profile image"
              className="w-[2rem] h-[2rem] rounded-full relative right-4"
            />
          </div>
          <Link
            href={"/"}
            className="text-gray-500 hover:underline underline-offset-4"
          >
            3 replies
          </Link>
        </div>
        <div className="flex items-center gap-2 mt-5 text-gray-500">
          <span>hello</span>
          {" - "}
          <span>world</span>
          {" - "}
          <Link
            href={"/"}
            className="flex gap-1 items-center hover:underline underline-offset-4"
          >
            <span>jsm mastery</span>
            <img
              src="/profile.jpg"
              alt="community profile image"
              className="w-[1rem] h-[1rem] rounded-full"
            />
          </Link>
        </div>
      </article>
    </>
  );
}

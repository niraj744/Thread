import ThreadCard from "@/components/CustomComponents/ThreadCard";
import React from "react";

const HomePage = () => {
  return (
    <>
      <section>
        <h1 className="heading">home</h1>
        <ul className="mt-5 flex flex-col gap-8">
          <li>
            <ThreadCard />
          </li>
          <li>
            <ThreadCard />
          </li>
          <li>
            <ThreadCard />
          </li>
          <li>
            <ThreadCard />
          </li>
          <li>
            <ThreadCard />
          </li>
          <li>
            <ThreadCard />
          </li>
          <li>
            <ThreadCard />
          </li>
        </ul>
      </section>
    </>
  );
};

export default HomePage;

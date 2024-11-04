"use client";

import { AppProgressBar as ProgressBar } from "next-nprogress-bar";
import { ReactNode } from "react";

const NextLoader = ({ children }: { children: ReactNode }) => {
  return (
    <>
      {children}
      <ProgressBar
        height="4px"
        color="#6d28d9"
        options={{ showSpinner: false }}
        shallowRouting
      />
    </>
  );
};

export default NextLoader;

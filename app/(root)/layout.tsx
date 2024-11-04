import Navigation from "@/components/CustomComponents/Navigation";
import { ReactNode } from "react";
import Header from "@/components/CustomComponents/Header";
import MobileNav from "@/components/CustomComponents/MobileNav";
import RightsideBar from "@/components/CustomComponents/RightsideBar";
import { getUserById } from "@/Actions/User.action";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const DashboardLayout = async ({ children }: { children: ReactNode }) => {
  const user = await currentUser();
  if (!user) return null;
  const getuser = await getUserById(user.id);
  if (getuser.onboarded === false) return redirect("/auth/onboard");
  return (
    <>
      <Header />
      <div className="flex">
        <Navigation />
        <MobileNav />
        <div className="flex-1 p-4 h-[75vh] sm:h-[90vh] overflow-auto">
          {children}
        </div>
        <RightsideBar />
      </div>
    </>
  );
};

export default DashboardLayout;

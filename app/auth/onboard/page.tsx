import { CreateUser, getUserById } from "@/Actions/User.action";
import OnboardForm from "@/components/CustomComponents/OnboardForm";
import { ClerkUser } from "@/Types";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const Onboardpage = async () => {
  const user = await currentUser();
  if (!user) return redirect("/auth/sign-in");
  const getUser = await getUserById(user?.id);
  if (getUser?.onboarded) return redirect("/");
  if (!getUser) {
    const obj: ClerkUser = {
      firstName: user.firstName!,
      lastName: user.lastName!,
      email: user.emailAddresses[0].emailAddress,
      imageUrl: user.imageUrl,
      kindeID: user.id,
    };
    await CreateUser(obj);
  }
  return (
    <>
      <OnboardForm />
    </>
  );
};

export default Onboardpage;

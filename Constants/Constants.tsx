import { House, Image, Search, User, Users } from "lucide-react";

export const navigation = [
  {
    name: "home",
    icon: <House />,
    link: "/",
  },
  {
    name: "search",
    icon: <Search />,
    link: "/search",
  },
  {
    name: "create thread",
    icon: <Image />,
    link: "/create-thread",
  },
  {
    name: "community",
    icon: <Users />,
    link: "/community",
  },
  {
    name: "profile",
    icon: <User />,
    link: "/profile",
  },
];

import * as yup from "yup";
import schema from "@/Schema/onBoards";
import { HandleError } from "@/lib/Error";
import content from "@/Schema/Thread";

export type FormData = yup.InferType<typeof schema>;
export type ContentFormData = yup.InferType<typeof content>;

export interface ClerkUser {
  kindeID: string;
  firstName: string;
  lastName: string;
  email: string;
  imageUrl: string;
}
export interface updateUser {
  username: string;
  imageUrl: string;
  bio: string;
  onboarded?: boolean;
}
export interface DbUser {
  _id: string;
  kindeID: string;
  firstName: string;
  lastName: string;
  email: string;
  username?: string;
  imageUrl: string;
  bio?: string;
  onboarded: boolean;
  threads: string[];
  communities: string[];
}
export interface ThreadData {
  content: string;
  authorID: string;
  community: null | string;
}
export interface CreateCommunity {
  id: string;
  name: string;
  image: string;
  slug: string;
  createdById: string;
}

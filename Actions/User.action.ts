"use server";

import { connectToDatabase } from "@/DB/Connection";
import User from "@/DB/Model/User";
import { HandleError } from "@/lib/Error";
import { ClerkUser, updateUser, DbUser } from "@/Types";

export const CreateUser = async (data: ClerkUser) => {
  try {
    await connectToDatabase();
    await User.create(data);
  } catch (error) {
    HandleError(error);
  }
};

export const getUserById = async (id: string): Promise<DbUser> => {
  try {
    await connectToDatabase();
    const user = await User.findOne({ kindeID: id });
    return JSON.parse(JSON.stringify(user));
  } catch (error) {
    HandleError(error);
    return {
      _id: "",
      kindeID: "",
      firstName: "",
      lastName: "",
      email: "",
      username: "",
      imageUrl: "",
      bio: "",
      onboarded: false,
      threads: [],
      communities: [],
    };
  }
};

export const UpdateUser = async (
  id: string,
  data: updateUser
): Promise<{ status: number }> => {
  try {
    await connectToDatabase();
    const UpdateData: updateUser = {
      ...data,
      onboarded: true,
    };
    await User.findByIdAndUpdate(id, UpdateData);
    return {
      status: 200,
    };
  } catch (error) {
    HandleError(error);
    return {
      status: 404,
    };
  }
};

"use server";

import { connectToDatabase } from "@/DB/Connection";
import Thread from "@/DB/Model/Thread";
import { HandleError } from "@/lib/Error";
import { ThreadData } from "@/Types";
import { revalidatePath } from "next/cache";

export const CreateThread = async (
  data: ThreadData
): Promise<{ status: number }> => {
  try {
    await connectToDatabase();
    await Thread.create(data);
    revalidatePath("/");
    return {
      status: 200,
    };
  } catch (error) {
    HandleError(error);
    return {
      status: 400,
    };
  }
};

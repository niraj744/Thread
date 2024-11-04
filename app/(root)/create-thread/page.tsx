"use client";

import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import content from "@/Schema/Thread";
import { ContentFormData, ThreadData } from "@/Types";
import { LoaderCircle } from "lucide-react";
import { HandleError } from "@/lib/Error";
import { getUserById } from "@/Actions/User.action";
import { useRouter } from "next/navigation";
import { CreateThread } from "@/Actions/Thread.action";
import { useUser } from "@clerk/nextjs";

export default function CreatePage() {
  const router = useRouter();
  const { user } = useUser();
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm<ContentFormData>({
    resolver: yupResolver(content),
  });
  const onSubmit = async (data: ContentFormData) => {
    try {
      if (user) {
        const dbUser = await getUserById(user.id);
        const datatoPost: ThreadData = {
          content: data.content!,
          authorID: dbUser._id,
          community: null,
        };
        const result = await CreateThread(datatoPost);
        if (result.status === 200) {
          router.push("/");
        }
      }
    } catch (error) {
      HandleError(error);
    }
  };
  return (
    <>
      <section>
        <h1 className="heading">create thread</h1>
        <form
          className="mt-5 capitalize flex flex-col gap-3"
          onSubmit={handleSubmit(onSubmit)}
        >
          <label htmlFor="content" className="w-fit">
            content
          </label>
          <textarea
            id="content"
            cols={50}
            rows={18}
            className="bg-secondary p-2 rounded-md outline-none border-2 border-transparent focus-visible:border-primary resize-none"
            {...register("content")}
          />
          {errors.content && (
            <p className="text-red-500">{errors.content.message}</p>
          )}
          <Button disabled={isSubmitting} type="submit">
            {isSubmitting ? (
              <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              "post thread"
            )}
          </Button>
        </form>
      </section>
    </>
  );
}

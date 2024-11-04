"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import schema from "@/Schema/onBoards";
import { FormData } from "@/Types";
import { Controller, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { ChangeEvent, useEffect, useState } from "react";
import { LoaderCircle } from "lucide-react";
import { HandleError } from "@/lib/Error";
import { getUserById, UpdateUser } from "@/Actions/User.action";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";

export default function OnboardForm() {
  const router = useRouter();
  const [imgPreview, setImgPreview] = useState<string | null>(null);
  const { user } = useUser();
  const {
    control,
    setValue,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });
  useEffect(() => {
    if (user) {
      setImgPreview(user.imageUrl!);
      setValue("imageUrl", user.imageUrl!);
    }
  }, [user]);
  const fileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      const reader = new FileReader();
      reader.readAsDataURL(files[0]);
      reader.onload = () => {
        setImgPreview(reader.result as string);
        setValue("imageUrl", reader.result as string);
      };
      reader.onerror = () => {
        console.log(reader.error);
      };
    }
  };
  const onSubmit = async (data: FormData) => {
    try {
      if (user) {
        const dbUser = await getUserById(user.id);
        const result = await UpdateUser(dbUser._id, data);
        if (result.status === 200) {
          router.push("/");
        }
      }
    } catch (error) {
      HandleError(error);
    }
  };
  return (
    <section className="flex flex-col justify-center items-center min-h-screen">
      <div className="flex flex-col gap-1 w-full max-w-[600px]">
        <h1 className="font-bold capitalize text-3xl">onboarding</h1>
        <p className="text-gray-300">
          Complete your profile now, to use Threads.
        </p>
        <form
          className="bg-secondary rounded-md mt-5 p-4 flex flex-col gap-4 capitalize"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex gap-3 items-center">
            {imgPreview ? (
              <>
                <img
                  src={imgPreview}
                  alt="profile image"
                  className="w-[5rem] h-[5rem] rounded-full"
                />
                <Controller
                  control={control}
                  name="imageUrl"
                  render={() => (
                    <input
                      type="file"
                      onChange={fileChange}
                      className="text-blue-500"
                      accept="image/jpg, image/png, image/jpeg"
                    />
                  )}
                  rules={{ required: true }}
                />
              </>
            ) : (
              <LoaderCircle className="animate-spin" />
            )}
          </div>
          {errors.imageUrl && (
            <p className="text-red-500">{errors.imageUrl.message}</p>
          )}
          <div className="flex flex-col gap-3">
            <label htmlFor="username">username</label>
            <input
              type="text"
              id="username"
              {...register("username")}
              className="bg-black p-2 rounded-md outline-none border-2 border-transparent focus-visible:border-primary"
            />
            {errors.username && (
              <p className="text-red-500">{errors.username.message}</p>
            )}
          </div>
          <div className="flex flex-col gap-3">
            <label htmlFor="bio">bio</label>
            <textarea
              rows={10}
              cols={10}
              id="bio"
              {...register("bio")}
              className="bg-black p-2 rounded-md outline-none border-2 border-transparent focus-visible:border-primary resize-none"
            />{" "}
            {errors.bio && <p className="text-red-500">{errors.bio.message}</p>}
          </div>
          <Button disabled={isSubmitting} type="submit">
            {isSubmitting ? (
              <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              "Update"
            )}
          </Button>
        </form>
      </div>
    </section>
  );
}

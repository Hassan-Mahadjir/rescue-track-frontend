// pages/login.tsx

"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { IoMdMail } from "react-icons/io";
import { TbLockPassword } from "react-icons/tb";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import FormInput from "@/components/FormInput";

const formSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters." }),
});

type FormSchema = z.infer<typeof formSchema>;

const Login = () => {
  const t = useTranslations("Auth");

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: FormSchema) => {
    console.log(values);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 min-h-screen">
      {/* Sign up section */}
      <div className="flex flex-col items-center mt-[100px]">
        <h1 className="font-bold text-3xl">Sign Up</h1>
        <p className="text-sm text-center my-[25px]">
          Create an account to start managing your operation and teams
          <br /> with RescueTrucker
        </p>
        <button className="flex items-center justify-center gap-x-4 border-2 border-[var(--main)] rounded-lg w-3/5 px-[5px] py-[5px] hover:text-white hover:bg-main transition-colors duration-150">
          <Image
            src="/auth/microsoft.png"
            width={20}
            height={20}
            alt="Microsoft logo"
          />
          Sign up with Microsoft
        </button>

        {/* Divider */}
        <div className="relative flex py-5 items-center w-full">
          <div className="flex-grow border-t border-gray-400"></div>
          <span className="flex-shrink mx-4 text-gray-400">
            or continue with
          </span>
          <div className="flex-grow border-t border-gray-400"></div>
        </div>

        {/* Form */}
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col w-3/5 space-y-4"
          >
            <FormInput
              form={form}
              name="email"
              placeholder="example@gmail.com"
              type="email"
              icon={<IoMdMail />}
            />
            <FormInput
              form={form}
              name="password"
              placeholder="Enter your password"
              type="password"
              icon={<TbLockPassword />}
            />
            <Button type="submit" className="bg-main mt-4 hover:bg-brown">
              Submit
            </Button>
          </form>
        </Form>
      </div>

      {/* Image section */}
      <div className="hidden md:block relative w-full h-full">
        <Image
          src="/auth/login-plant.jpg"
          alt="Login photo"
          layout="fill"
          objectFit="cover" // Adjusts how the image fits within the container
          className="w-full h-full"
        />
      </div>
    </div>
  );
};

export default Login;

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
import { useLogin } from "@/services/api/auth";
import { Ellipsis } from "lucide-react";
import LoadingIndicator from "@/components/Loading-Indicator";

const formSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters." }),
});

type FormSchema = z.infer<typeof formSchema>;

const Login = () => {
  const t = useTranslations("Auth");
  const { mutateLogin, isPending } = useLogin();

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: FormSchema) => {
    console.log(values);
    mutateLogin(values);
  };

  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      {/* Sign up section */}
      <div className="flex flex-col gap-3 items-center justify-center p-6 md:p-10 items-center">
        <div className="text-center max-w-xs">
          <h1 className="font-bold text-3xl mb-2">{t("welcome")}</h1>
          <p className="text-sm text-muted-foreground xs:text-sx">
            {t("loginDetails")}
          </p>
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

            <Button
              type="submit"
              className="bg-main mt-4 hover:bg-second-main"
              disabled={isPending}
            >
              {isPending ? <LoadingIndicator /> : t("login")}
            </Button>
          </form>
        </Form>

        {/* Divider */}
        <div className="relative flex py-2 items-center w-3/5">
          <div className="flex-grow border-t border-gray-400"></div>
          <span className="flex-shrink mx-4 text-gray-400">
            {t("continueWith")}
          </span>
          <div className="flex-grow border-t border-gray-400"></div>
        </div>

        {/* other account Signin */}
        <button className="flex items-center justify-center gap-x-2 border-2 border-[var(--main)] rounded-lg w-3/5 px-3 py-2 hover:text-white hover:bg-second-main transition-colors duration-150">
          <Image
            src="/auth/microsoft.png"
            width={24}
            height={24}
            alt="Microsoft logo"
            className="h-5 w-5"
          />
          <span className="text-sm font-medium xs:inline">
            {t("loginWithMicrosoft")}
          </span>
        </button>

        <button className="flex items-center justify-center gap-x-2 border-2 border-[var(--main)] rounded-lg w-3/5 px-3 py-2 hover:text-white hover:bg-second-main transition-colors duration-150">
          <Image
            src="/auth/GoogleGlogo.svg.webp"
            width={24}
            height={24}
            alt="Google logo"
            className="h-5 w-5"
          />
          <span className="text-sm font-medium xs:inline">
            {t("loginWithGoogle")}
          </span>
        </button>
        <p className="text-sm font-semibold">
          {t("noAccount")}
          <a href="#" className="underline underline-offset-4">
            {t("register")}
          </a>
        </p>
        <a
          href="#"
          className="text-end inline-block text-sm underline-offset-4 hover:underline"
        >
          {t("forgetPassword")}
        </a>
      </div>

      {/* Image section */}
      <div className="relative hidden bg-muted lg:block">
        <Image
          src="/auth/login-plant.jpg"
          alt="Login photo"
          layout="fill"
          objectFit="cover" // Adjusts how the image fits within the container
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>
    </div>
  );
};

export default Login;

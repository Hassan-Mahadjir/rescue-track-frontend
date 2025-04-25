"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import React from "react";
import { useForm } from "react-hook-form";
import FormInput from "@/components/FormInput";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useNewUserFormContext } from "@/hooks/userFormContext";
import { useRouter } from "next/navigation";
import { setItem } from "@/utils/storage";
import { handleGoogleLogin, handleMicrosoftLogin } from "../../login/page";

const formSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
});

type FormSchema = z.infer<typeof formSchema>;

const StepOneForm = () => {
  const formContext = useNewUserFormContext();
  const router = useRouter();

  const t = useTranslations("Auth");
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: formContext.propertyForm?.email || "",
    },
  });

  const onSubmit = async (values: FormSchema) => {
    formContext.updatePropertyForm(values);
    router.push("/signup/step-two");
  };

  return (
    <div>
      {/* Form Input */}
      <div className="flex-col gap-4 w-3/4 justify-self-center">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormInput
              form={form}
              name="email"
              label={t("yourEmail")}
              type="email"
              placeholder="Enter your email address"
              className=""
            />
            <Button
              type="submit"
              className="bg-dark-gray mt-4 hover:bg-second-main w-full rounded-2xl"
            >
              {t("continue")}
            </Button>
          </form>
        </Form>

        {/* Divider */}
        <div className="relative flex py-2 items-center w-full">
          <div className="flex-grow border-t border-gray-400"></div>
          <span className="flex-shrink mx-4 text-gray-400">
            {t("continueWith")}
          </span>
          <div className="flex-grow border-t border-gray-400"></div>
        </div>

        {/* other accounts */}
        <div className="flex flex-col items-center justify-center gap-4 w-full md:flex-row">
          <button
            onClick={handleMicrosoftLogin}
            className="flex items-center justify-center gap-x-2 w-full px-8 py-3 border-2 border-[var(--main)] rounded-3xl hover:text-white hover:bg-second-main transition-colors duration-150"
          >
            <Image
              src="/auth/microsoft.png"
              width={24}
              height={24}
              alt="Microsoft logo"
              className="h-5 w-5"
            />
            <span className="text-sm whitespace-nowrap font-medium ">
              {t("loginWithMicrosoft")}
            </span>
          </button>

          <button
            onClick={handleGoogleLogin}
            className="flex items-center justify-center gap-x-2 w-full px-8 py-3 border-2 border-[var(--main)] rounded-3xl hover:text-white hover:bg-second-main transition-colors duration-150"
          >
            <Image
              src="/auth/GoogleGlogo.svg.webp"
              width={24}
              height={24}
              alt="Google logo"
              className="h-5 w-5"
            />
            <span className="text-sm whitespace-nowrap font-medium">
              {t("loginWithGoogle")}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default StepOneForm;

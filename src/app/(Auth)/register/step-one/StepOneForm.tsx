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

const formSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
});

type FormSchema = z.infer<typeof formSchema>;

export default function StepOneForm() {
  const t = useTranslations("Auth");
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (values: FormSchema) => {
    console.log(values);
  };

  return (
    <div className="flex flex-1 flex-col items-center bg-white mt-14 w-3/4 h-[500px] justify-self-center rounded-3xl">
      <div className="mt-16 text-center mb-8">
        <h1 className=" text-2xl font-semibold mb-1">Create an account</h1>
        <p className="text-xs">
          Already have an ccount?{" "}
          <a href="#" className="underline underline-offset-4">
            login
          </a>
        </p>
      </div>
      {/* Navigation */}
      <div className="">
        <div className="flex justify-center items-center mb-3">
          {/* First step */}
          <div className="flex flex-col items-center justify-center">
            <div className=" w-5 h-5 rounded-full text-white bg-dark-gray text-center">
              <span>1</span>
            </div>
          </div>
          <div className="flex-grow border-t border-gray-400 w-48 mx-3"></div>
          {/* second step  */}
          <div className="flex flex-col items-center justify-center">
            <div className=" w-5 h-5 rounded-full text-white bg-dark-gray text-center">
              <span>2</span>
            </div>
          </div>
          <div className="flex-grow border-t border-gray-400 w-48 mx-3"></div>
          {/* Third step  */}
          <div className="flex flex-col items-center justify-center">
            <div className=" w-5 h-5 rounded-full text-white bg-dark-gray text-center">
              <span>3</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-3xl max-auto">
        <div className="flex justify-center items-center mb-3">
          {/* First step */}
          <div className="flex flex-col items-center justify-center">
            <p>Enter your email</p>
          </div>
          <div className="flex-grow w-24 mx-3"></div>
          {/* second step  */}
          <div className="flex flex-col items-center justify-center">
            <p>Provide basic info</p>
          </div>
          <div className="flex-grow w-24 mx-3"></div>
          {/* Third step  */}
          <div className="flex flex-col items-center justify-center">
            <p>Create password</p>
          </div>
        </div>
      </div>

      <div className="flex-col gap-4 w-4/6">
        <Form {...form}>
          <form>
            <FormInput
              form={form}
              name="email"
              label="What's your email?"
              type="email"
              placeholder="Enter your email address"
              className=""
            />
            <Button
              type="submit"
              className="bg-dark-gray mt-4 hover:bg-second-main w-full rounded-2xl"
            >
              Next
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
          <button className="flex items-center justify-center gap-x-2 w-full xs:w-1/2 px-8 py-3 border-2 border-[var(--main)] rounded-3xl hover:text-white hover:bg-second-main transition-colors duration-150">
            <Image
              src="/auth/microsoft.png"
              width={24}
              height={24}
              alt="Microsoft logo"
              className="h-5 w-5"
            />
            <span className="text-sm font-medium">
              {t("loginWithMicrosoft")}
            </span>
          </button>

          <button className="flex items-center justify-center gap-x-2 w-full xs:w-1/2 px-8 py-3 border-2 border-[var(--main)] rounded-3xl hover:text-white hover:bg-second-main transition-colors duration-150">
            <Image
              src="/auth/GoogleGlogo.svg.webp"
              width={24}
              height={24}
              alt="Google logo"
              className="h-5 w-5"
            />
            <span className="text-sm font-medium">{t("loginWithGoogle")}</span>
          </button>
        </div>
      </div>
    </div>
  );
}

"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import React from "react";
import { useForm } from "react-hook-form";
import FormInput from "@/components/FormInput";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";

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
      <div className="mt-24 text-center">
        <h1 className=" text-2xl font-semibold mb-1">Create an account</h1>
        <p className="text-xs">
          Already have an ccount?{" "}
          <a href="#" className="underline underline-offset-4">
            login
          </a>
        </p>
      </div>

      <div className="flex w-full flex-col gap-8 w-2/3">
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
      </div>
    </div>
  );
}

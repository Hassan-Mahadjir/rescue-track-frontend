"use client";

import FormInput from "@/components/FormInput";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { TbPasswordFingerprint } from "react-icons/tb";
import { useChangePassword } from "@/services/api/auth";

const formSchema = z
  .object({
    password: z.string().min(6),
    confirm: z.string().min(6),
  })
  .refine((data) => data.password === data.confirm, {
    message: "Passwords do not match",
    path: ["confirm"],
  });

type FormSchema = z.infer<typeof formSchema>;

const ResetPasswordPage = () => {
  const { mutateChangePassword } = useChangePassword();

  const t = useTranslations("Auth");
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      confirm: "",
    },
  });

  const onSubmit = async (values: FormSchema) => {
    console.log("Password reset values:", values);
    const newPassword = {
      oldPassword: values.password,
      newPassword: values.confirm,
    };
    try {
      await mutateChangePassword(newPassword);
      // Handle success (e.g., show a success message, redirect, etc.)
      console.log("Password reset successful");
    } catch (error) {
      // Handle error (e.g., show an error message)
      console.error("Error resetting password:", error);
    }
  };

  return (
    <div>
      {/* Header: Icon & description */}
      <div className="text-center justify-center items-center">
        <div className="bg-second-green w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-2">
          <TbPasswordFingerprint className="text-4xl text-white" />
        </div>
        <h1 className=" text-md font-semibold mb-1 sm:text-xl">
          Create new password
        </h1>
      </div>

      {/* Form Input */}
      <div className="flex-col gap-4 w-3/4 justify-self-center">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormInput
              form={form}
              name="password"
              label={t("password")}
              type="password"
              placeholder="Enter your password"
            />
            <FormInput
              form={form}
              name="confirm"
              label={t("confirmPassword")}
              type="password"
              placeholder="Confirm your password"
            />
            <Button
              type="submit"
              className="bg-dark-gray mt-4 hover:bg-second-main w-full rounded-2xl"
            >
              {"Reset Password"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default ResetPasswordPage;

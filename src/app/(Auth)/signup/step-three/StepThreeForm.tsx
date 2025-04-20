"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import React from "react";
import { useForm } from "react-hook-form";
import FormInput from "@/components/FormInput";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import { useNewUserFormContext } from "@/hooks/userFormContext";
import { useRouter } from "next/navigation";
import { useSignup } from "@/services/api/auth";
import { SignupFormValues } from "@/types/signup.type";

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

const StepThreeForm = () => {
  const formContext = useNewUserFormContext();
  const router = useRouter();

  const { mutateSingup, isPending } = useSignup();

  const t = useTranslations("Auth");
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: formContext.propertyForm?.password,
      confirm: formContext.propertyForm?.confirm,
    },
  });

  const onSubmit = async (values: FormSchema) => {
    formContext.updatePropertyForm({
      password: values.password,
      confirm: values.confirm,
    });

    const fullFormData: SignupFormValues = {
      firstName: formContext.propertyForm?.firstName || "",
      lastName: formContext.propertyForm?.lastName || "",
      email: formContext.propertyForm?.email || "",
      phone: formContext.propertyForm?.phone || "",
      role: formContext.propertyForm?.role || "",
      password: values.confirm || "",
    };

    mutateSingup(fullFormData);
  };

  return (
    <div>
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
              {t("signup")}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default StepThreeForm;

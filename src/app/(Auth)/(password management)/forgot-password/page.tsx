"use client";

import FormInput from "@/components/FormInput";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useResendEmail, useVerifyEmail } from "@/services/api/auth";
import { setItem } from "@/utils/storage";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { MdMarkEmailUnread } from "react-icons/md";
import { z } from "zod";

const formSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
});

type FormSchema = z.infer<typeof formSchema>;

const ForgetPasswordpage = () => {
  const router = useRouter();
  const [email, setEmail] = React.useState<string>("");
  const { resendVerificationEmail } = useResendEmail(email);

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (values: FormSchema) => {
    setItem("validation-email", values.email);
    setItem("Is-forget-password", true);

    setEmail(values.email);
    resendVerificationEmail();

    router.push("/validation");
  };

  return (
    <div>
      {/* Header: Icon & description */}
      <div className="text-center justify-center items-center">
        <div className="bg-second-green w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-2">
          <MdMarkEmailUnread className="text-4xl text-white" />
        </div>
        <h1 className=" text-md font-semibold mb-1 sm:text-xl">
          Enter your email to reset password
        </h1>
      </div>

      {/* Input email */}
      <div className="flex-col gap-4 w-3/4 justify-self-center mx-auto">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormInput
              form={form}
              name="email"
              label={"Email address"}
              type="email"
              placeholder="Enter your email address"
              className=""
            />
            <Button
              type="submit"
              className="bg-dark-gray mt-4 hover:bg-second-main w-full rounded-2xl"
            >
              {"Submit"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default ForgetPasswordpage;

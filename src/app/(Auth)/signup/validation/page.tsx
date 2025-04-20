"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import React, { useEffect, useState } from "react";
import { Mo } from "react-flags-select";
import { useForm } from "react-hook-form";
import { MdMarkEmailUnread } from "react-icons/md";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { getItem } from "@/utils/storage";
import { useResendEmail } from "@/services/api/auth";

const FormSchema = z.object({
  pin: z.string().min(6, {
    message: "Your one-time password must be 6 characters.",
  }),
});

const validation = () => {
  const [email, setEmail] = useState<string>("");
  const { resendVerificationEmail, isPending } = useResendEmail(email);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      pin: "",
    },
  });

  useEffect(() => {
    const fetchEmail = async () => {
      const storedEmail = await getItem("validation-email");
      if (typeof storedEmail === "string") setEmail(storedEmail);
    };
    fetchEmail();
  }, []);

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    console.log(values);
  };

  return (
    <div className="flex flex-col justify-center items-center">
      {/* Header: Icon & description */}
      <div className="text-center justify-center items-center">
        <div className="bg-second-green w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-2">
          <MdMarkEmailUnread className="text-4xl text-white" />
        </div>
        <h1 className=" text-2xl font-semibold mb-1">Check your email</h1>
        <p className="text-xs text-dark-gray">
          We sent a 4-digit code to{" "}
          <span className="text-second-green font-semibold">
            {email}
            <br />
          </span>{" "}
          Please enter it below. Can’t find it? Check your spam folder.
        </p>
      </div>

      {/* Input of validation */}
      <div className="justify-center my-3 text-center">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FormField
              control={form.control}
              name="pin"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <InputOTP maxLength={6} {...field}>
                      <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                      </InputOTPGroup>
                    </InputOTP>
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="bg-dark-gray mt-4 hover:bg-second-main w-full rounded-2xl"
            >
              Submit
            </Button>
          </form>
        </Form>

        <div className="mt-4">
          <Button
            variant="link"
            className="text-xs underline font-semibold hover:text-main p-0 h-auto"
            onClick={() => resendVerificationEmail()}
            disabled={isPending}
          >
            {isPending ? "Resending..." : "Click to send a new code"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default validation;

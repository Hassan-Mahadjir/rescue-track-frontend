"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import React from "react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import { isValidPhoneNumber } from "react-phone-number-input";
import { PhoneInput } from "@/components/ui/phone-input";
import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { useNewUserFormContext } from "@/hooks/userFormContext";
import { useRouter } from "next/navigation";
import FormInput from "@/components/FormInput";

const formSchema = z.object({
  firstName: z.string().nonempty("Please enter your first name"),
  lastName: z.string().nonempty("Please enter your last name"),
  phone: z
    .string()
    .refine(isValidPhoneNumber, { message: "Invalid phone number." }),
  role: z
    .string({ required_error: "Please select a role" })
    .nonempty("Please select a role"),
});

const staff_roles = [
  { value: "ADMIN", label: "Admin" },
  { value: "EMPLOYEE", label: "Employee" },
] as const;

type FormSchema = z.infer<typeof formSchema>;

const StepTwoForm = () => {
  const [open, setOpen] = React.useState(false);

  const formContext = useNewUserFormContext();
  const router = useRouter();

  const t = useTranslations("Auth");
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: formContext.propertyForm?.firstName,
      lastName: formContext.propertyForm?.lastName,
      phone: formContext.propertyForm?.phone,
      role: formContext.propertyForm?.role,
    },
  });

  const onSubmit = async (values: FormSchema) => {
    formContext.updatePropertyForm(values);
    router.push("/signup/step-three");
  };

  return (
    <div>
      {/* Form Input */}
      <div className="flex-col w-3/4 justify-self-center">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormInput
              form={form}
              name="firstName"
              label="What's your first Name?"
              placeholder="Enter your first Name."
              className="mb-4"
            />

            <FormInput
              form={form}
              name="lastName"
              label="What's your last Name?"
              placeholder="Enter your last Name."
              className="mb-4"
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem className="flex flex-col items-start">
                  <FormLabel>{t("yourPhone")}</FormLabel>
                  <FormControl className="w-full">
                    <PhoneInput
                      placeholder="Enter a phone number"
                      {...field}
                      defaultCountry="SA"
                      className="rounded-2xl"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem className="flex flex-col my-4">
                  <FormLabel>{t("yourRole")}</FormLabel>
                  <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn(
                            "w-full justify-between",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value
                            ? staff_roles.find(
                                (role) => role.value === field.value
                              )?.label
                            : "Select a role"}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-1">
                      <Command>
                        <CommandInput placeholder="Search role..." />
                        <CommandList>
                          <CommandEmpty>No role found.</CommandEmpty>
                          <CommandGroup>
                            {staff_roles.map((role) => (
                              <CommandItem
                                key={role.value}
                                value={role.label}
                                onSelect={() => {
                                  form.setValue("role", role.value);
                                  setOpen(false);
                                }}
                              >
                                {role.label}
                                <Check
                                  className={cn(
                                    "ml-auto",
                                    role.value === field.value
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="bg-dark-gray mt-4 hover:bg-second-main w-full rounded-2xl"
            >
              {t("continue")}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default StepTwoForm;

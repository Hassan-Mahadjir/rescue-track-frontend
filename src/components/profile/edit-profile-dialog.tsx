"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "../ui/form";

import { UserFormValues, userSchema } from "@/types/schema/profileFormSchema";
import { UserProfile } from "@/types/profile.type";
import { formatDateOnly } from "@/utils/extra";
import FormInput from "@/components/FormInput";
import FormSelect from "../FormSelect";
import { useUpdateProfile } from "@/services/api/profile";
import LoadingIndicator from "../Loading-Indicator";

interface EditProfileDialogProps {
  profile: UserProfile;
}

export const EditProfileDialog = ({ profile }: EditProfileDialogProps) => {
  const [isOpen, setOpen] = useState(false);
  const { mutateUpdate, isPending } = useUpdateProfile();

  const form = useForm<UserFormValues>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      firstName: profile.firstName,
      lastName: profile.lastName,
      phone: profile.phone,
      nationality: profile.nationality ?? "",
      gender:
        profile.gender === "male" || profile.gender === "female"
          ? profile.gender
          : undefined,
      dateofBirth: formatDateOnly(profile.dateofBirth ?? undefined),
    },
  });

  const onSubmit = (data: UserFormValues) => {
    mutateUpdate(data, {
      onSuccess: () => {
        setOpen(false);
      },
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button variant="outline" size="icon">
          <Edit className="h-4 w-4" />
          <span className="sr-only">Edit Profile</span>
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile information here.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <FormInput form={form} name="firstName" label="First Name" />
              <FormInput form={form} name="lastName" label="Last Name" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <FormSelect
                form={form}
                name="gender"
                label="Gender"
                placeholder="Select gender"
                options={[
                  { label: "Male", value: "male" },
                  { label: "Female", value: "female" },
                ]}
              />
              <FormInput form={form} name="nationality" label="Nationality" />
            </div>
            <FormInput form={form} name="phone" label="Phone" />
            <FormInput
              form={form}
              name="dateofBirth"
              label="Date of Birth"
              type="date"
            />

            <DialogFooter>
              <Button type="submit" disabled={isPending} className="bg-main">
                {isPending ? <LoadingIndicator /> : "Save Changes"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";

const formSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  middleName: z.string().optional(),
  lastName: z.string().min(1, "Last name is required"),
  dob: z.date(),
  gender: z.enum(["male", "female"]),
  email: z.string().email("Invalid email"),
  phoneNumber: z.string().optional(),
  nationality: z.string().min(1, "Nationality is required"),
  passportNumber: z.string().optional(),
  identityNumber: z.string().optional(),
});

export default function PatientForm() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const { register, handleSubmit, setValue, watch } = useForm<
    z.infer<typeof formSchema>
  >({
    resolver: zodResolver(formSchema),
    defaultValues: {
      dob: new Date(),
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => console.log(data);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold text-green-800">
        Modify Patient Information
      </h2>
      <div className="flex flex-col items-center my-4">
        <label className="cursor-pointer relative">
          {selectedImage ? (
            <Image
              src={selectedImage}
              alt="Profile Preview"
              width={80}
              height={80}
              className="rounded-full"
            />
          ) : (
            <div className="w-20 h-20 bg-green-700 rounded-full flex items-center justify-center text-white">
              +
            </div>
          )}
          <input type="file" className="hidden" onChange={handleImageUpload} />
        </label>
        <span className="text-sm text-gray-600">Add photo</span>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-3 gap-2">
          <Input {...register("firstName")} placeholder="First Name" />
          <Input {...register("middleName")} placeholder="Middle Name" />
          <Input {...register("lastName")} placeholder="Last Name" />
        </div>
        <div className="flex items-center gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <button
                type="button"
                className="border p-2 rounded-md flex items-center gap-2"
              >
                <CalendarIcon size={16} />
                {format(watch("dob") ?? new Date(), "PPP")}
              </button>
            </PopoverTrigger>
            <PopoverContent>
              <Calendar
                selected={watch("dob") ?? undefined}
                onSelect={(date: Date | undefined) =>
                  date && setValue("dob", date)
                }
              />
            </PopoverContent>
          </Popover>
          <div className="flex gap-4">
            <Label>
              <input type="radio" value="male" {...register("gender")} /> Male
            </Label>
            <Label>
              <input type="radio" value="female" {...register("gender")} />{" "}
              Female
            </Label>
          </div>
        </div>
        <Input {...register("email")} placeholder="E-mail Address" />
        <Input {...register("phoneNumber")} placeholder="Phone Number" />
        <Input {...register("nationality")} placeholder="Nationality" />
        <Input {...register("passportNumber")} placeholder="Passport Number" />
        <Input {...register("identityNumber")} placeholder="Identity Number" />
        <div className="flex justify-between mt-4">
          <Button type="button" className="bg-gray-200 text-black">
            Cancel
          </Button>
          <Button type="submit" className="bg-green-700 text-white">
            Save
          </Button>
        </div>
      </form>
    </div>
  );
}

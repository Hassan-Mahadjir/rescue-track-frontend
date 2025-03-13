"use client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "../ui/form";
import FormInput from "../FormInput";
import { useState } from "react";
import Image from "next/image";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "../ui/calendar";
import { format } from "date-fns";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";

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

type FormSchema = z.infer<typeof formSchema>;

const PersonalInfoDialog = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [gender, setGender] = useState<string>("male");

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      dob: new Date(),
    },
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
    }
  };

  const onSubmit = async (values: FormSchema) => {
    console.log(values);
  };

  return (
    <div>
      {/* Upload Image section */}
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

      {/* patient personal Infomation */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid grid-cols-3 gap-2">
            <FormInput
              form={form}
              name="firstName"
              placeholder="First Name"
              label="First Name"
            />

            <FormInput
              form={form}
              name="middleName"
              placeholder="Middle Name"
              label="Middle Name"
            />

            <FormInput
              form={form}
              name="lastName"
              placeholder="Last Name"
              label="Last Name"
            />
            <div className="col-span-2">
              <label className="text-sm">Date of birth</label>
              <Popover>
                <PopoverTrigger asChild>
                  <button
                    type="button"
                    className="border p-2 rounded-md flex items-center gap-2 w-full justify-between"
                  >
                    {date ? format(date, "dd-MM-yyyy") : "Select Date"}
                    <CalendarIcon size={16} />
                  </button>
                </PopoverTrigger>
                <PopoverContent>
                  <Calendar selected={date} onSelect={setDate} mode="single" />
                </PopoverContent>
              </Popover>
            </div>
            <div className="">
              <label htmlFor="" className="text-sm">
                Gender
              </label>
              <RadioGroup
                className="grid grid-col-2 flex gap-8 mt-3"
                value={form.watch("gender")}
                defaultValue={gender}
                onValueChange={(value) =>
                  form.setValue("gender", value as "male" | "female", {
                    shouldValidate: true,
                  })
                }
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem id="male" value="male" />
                  <Label htmlFor="male">Male</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem id="female" value="female" />
                  <Label htmlFor="female">Female</Label>
                </div>
              </RadioGroup>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default PersonalInfoDialog;

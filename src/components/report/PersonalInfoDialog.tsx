"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "../ui/form";
import FormInput from "../FormInput";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "../ui/calendar";
import { format } from "date-fns";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import ReactFlagsSelect from "react-flags-select";
import countryNames from "@/providers/countries";
import { useGetPatient } from "@/services/api/patient";

// ✅ Define validation schema
const formSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  middleName: z.string().optional(),
  lastName: z.string().min(1, "Last name is required"),
  dateofBirth: z.date(),
  gender: z.enum(["male", "female"], { message: "Gender is required" }),
  email: z.string().email("Invalid email"),
  phoneNumber: z.string().optional(),
  nationality: z.string().min(1, "Nationality is required"),
  passportNumber: z.string().optional(),
  nationalID: z.string().optional(),
});

const eligibilities = [
  { value: "student", label: "Student" },
  { value: "employee", label: "Employee" },
  { value: "eligible", label: "Eligible" },
  { value: "not eligible", label: "Not Eligible" },
];
type FormSchema = z.infer<typeof formSchema>;

const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString("en-US");
};

const PersonalInfoDialog = ({ id }: { id: number }) => {
  // 📌 Get Patient information
  const { patientData, isPending } = useGetPatient(id);

  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [selectedNationality, setSelectedNationality] = useState<string>("");

  // ✅ Initialize form with default values
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      middleName: "",
      lastName: "",
      dateofBirth: new Date(),
      gender: "male",
      email: "",
      phoneNumber: "",
      nationality: "",
      nationalID: "",
    },
  });

  useEffect(() => {
    if (patientData) {
      const patientInfo = patientData.data.data;
      form.reset({
        firstName: patientInfo.firstName || "",
        middleName: "",
        lastName: patientInfo.lastName || "",
        dateofBirth: patientInfo.dateofBirth
          ? new Date(patientInfo.dateofBirth)
          : new Date(),
        gender: patientInfo.gender || "male",
        email: patientInfo.email || "",
        phoneNumber: patientInfo.phone || "",
        nationality: patientInfo.nationality || "",
        nationalID: patientInfo.nationalID,
      });

      if (patientInfo.dateofBirth) {
        setDate(new Date(patientInfo.dateofBirth));
      }
      if (patientInfo.nationality) {
        setSelectedNationality(patientInfo.nationality);
      }
    }
  }, [patientData, form]);

  // ✅ Handle image upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
    }
  };

  // ✅ Form submission
  const onSubmit = async (values: FormSchema) => {
    console.log("Form submitted with values:", values);
    console.log(selectedImage);
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
        {/* <span className="text-sm text-gray-600">Add photo</span> */}
      </div>

      {/* Patient Personal Information Form */}
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

            {/* Date of Birth */}
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
                  <Calendar
                    selected={date}
                    onSelect={(selectedDate) => {
                      setDate(selectedDate);
                      if (selectedDate) {
                        form.setValue("dateofBirth", selectedDate, {
                          shouldValidate: true,
                        });
                      }
                    }}
                    mode="single"
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* Gender Selection */}
            <div>
              <label className="text-sm">Gender</label>
              <RadioGroup
                className="grid grid-cols-2 flex gap-8 mt-3"
                value={form.watch("gender")}
                onValueChange={(value) => {
                  form.setValue("gender", value as "male" | "female", {
                    shouldValidate: true,
                  });
                }}
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
              {form.formState.errors.gender && (
                <p className="text-red-500 text-xs">
                  {form.formState.errors.gender.message}
                </p>
              )}
            </div>

            {/* Email Input */}
            <div className="col-span-2">
              <FormInput
                form={form}
                name="email"
                placeholder="Email"
                label="Email"
              />
            </div>

            <FormInput
              form={form}
              name="phoneNumber"
              placeholder="+05334829810"
              label="Phone number"
            />
            <FormInput form={form} name="nationalID" label="Identity number" />
            <FormInput form={form} name="passportNumber" label="Eligibility" />

            {/* Nationality Selection */}
            <div>
              <label className="text-sm">Nationality</label>
              <ReactFlagsSelect
                searchable
                searchPlaceholder="Search countries"
                selected={form.watch("nationality")}
                onSelect={(code) => {
                  const countryName = countryNames[code] || code;
                  form.setValue("nationality", code, {
                    shouldValidate: true,
                  });
                }}
              />

              {form.formState.errors.nationality && (
                <p className="text-red-500 text-xs">
                  {form.formState.errors.nationality.message}
                </p>
              )}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-center gap-5 mt-5">
            <Button className="px-7" type="button">
              Cancel
            </Button>
            <Button className="px-7" type="submit">
              Save
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default PersonalInfoDialog;

"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import FormInput from "../FormInput";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import ReactFlagsSelect from "react-flags-select";
import { useGetPatient, useUpdatePatient } from "@/services/api/patient";
import { cn } from "@/lib/utils";
import { CustomCalendar } from "@/components/Custom-calendar";

import { EligibilitySelect } from "./EligibilitySelect";

const eligibilities = [
  { value: "student", label: "Student" },
  { value: "employee", label: "Employee" },
  { value: "eligible", label: "Eligible" },
  { value: "not eligible", label: "Not Eligible" },
  { value: "other", label: "Other" },
] as const;

const formSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  middleName: z.string().optional(),
  lastName: z.string().min(1, "Last name is required"),
  dateofBirth: z.date({ required_error: "Date of birth is required" }),
  gender: z.enum(["male", "female"], { message: "Gender is required" }),
  email: z.string().email("Invalid email"),
  phone: z.string().optional(),
  nationality: z.string().min(1, "Nationality is required"),
  passportNumber: z.string().optional(),
  nationalID: z.string().optional(),
  eligibility: z.enum(
    eligibilities.map((item) => item.value) as [string, ...string[]],
    { message: "Eligibility is required" }
  ),
  weight: z.string().optional(),
  height: z.string().optional(),
  bloodType: z.string().optional(),
});

type FormSchema = z.infer<typeof formSchema>;

const PersonalInfoDialog = ({ id }: { id: number }) => {
  const { patientData } = useGetPatient(id);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedNationality, setSelectedNationality] = useState<string>("");
  const [month, setMonth] = useState<number>(new Date().getMonth());
  const [year, setYear] = useState<number>(new Date().getFullYear());
  const [open, setOpen] = useState(false);

  const { mutateUpdatePatient } = useUpdatePatient(id);

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      middleName: "",
      lastName: "",
      dateofBirth: undefined,
      gender: "male",
      email: "",
      phone: "",
      nationality: "",
      nationalID: "",
    },
  });

  useEffect(() => {
    if (patientData) {
      const patientInfo = patientData.data.data;
      const dob = patientInfo.dateofBirth
        ? new Date(patientInfo.dateofBirth)
        : undefined;
      form.reset({
        firstName: patientInfo.firstName || "",
        middleName: "",
        lastName: patientInfo.lastName || "",
        dateofBirth: dob,
        gender:
          patientInfo.gender === "male" || patientInfo.gender === "female"
            ? patientInfo.gender
            : "male",
        email: patientInfo.email || "",
        phone: patientInfo.phone || "",
        nationality: patientInfo.nationality || "",
        nationalID: patientInfo.nationalID,
        weight: patientInfo.weight || 0,
        height: patientInfo.height || 0,
        eligibility: patientInfo.eligibility || "other",
        bloodType: "O+",
      });
      if (dob) {
        setMonth(dob.getMonth());
        setYear(dob.getFullYear());
      }
      setSelectedNationality(patientInfo.nationality || "");
    }
  }, [patientData, form]);

  const onSubmit = async (values: FormSchema) => {
    const formattedDateOfBirth = values.dateofBirth
      ? values.dateofBirth.toISOString().split("T")[0]
      : null;

    console.log("Form submitted with values:", formattedDateOfBirth);
    mutateUpdatePatient({
      ...values,
      dateofBirth: formattedDateOfBirth,
      status: "active",
      weight: Number(values.weight),
      height: Number(values.height),
    });
  };

  return (
    <div>
      <div className="flex flex-col items-center my-4">
        {/* Photo area */}
        {/* <PhotoUpload
        
          onImageSelect={(file) => {
            setSelectedImage(URL.createObjectURL(file));
          }}
          initialImage={selectedImage || undefined}
          size="lg"
          shape="square"
          className="rounded-full"
        /> */}
        <div className="w-20 h-20 bg-main rounded-full flex items-center justify-center border border-gray-300">
          <Image
            src={
              "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
            }
            alt="bland-profile"
            className="object-cover rounded-full w-full h-full"
            width={50}
            height={50}
          />
        </div>
      </div>

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
              <FormField
                control={form.control}
                name="dateofBirth"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Date of Birth</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent
                        className="w-auto p-0"
                        align="start"
                        side="bottom"
                      >
                        <CustomCalendar
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date > new Date() || date < new Date("1900-01-01")
                          }
                          month={new Date(year, month, 1)}
                          onMonthChange={(date) => {
                            setMonth(date.getMonth());
                            setYear(date.getFullYear());
                          }}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

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
              name="phone"
              placeholder="+05334829810"
              label="Phone number"
            />
            <FormInput
              form={form}
              name="weight"
              placeholder="Weight"
              label="Weight"
            />
            <FormInput
              form={form}
              name="bloodType"
              placeholder="Blood Type"
              label="Blood Type"
            />

            <FormInput
              form={form}
              name="height"
              placeholder="Height"
              label="Height"
            />
            <FormInput form={form} name="nationalID" label="Identity number" />
            <EligibilitySelect
              control={form.control}
              name="eligibility"
              label="Eligibility"
            />

            <div>
              <label className="text-sm">Nationality</label>
              <ReactFlagsSelect
                searchable
                searchPlaceholder="Search countries"
                selected={form.watch("nationality")}
                onSelect={(code) => {
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

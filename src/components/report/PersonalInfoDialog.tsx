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
import { CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react";
import { Calendar } from "../ui/calendar";
import { format } from "date-fns";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import ReactFlagsSelect from "react-flags-select";
import countryNames from "@/providers/countries";
import { useGetPatient } from "@/services/api/patient";
import { cn } from "@/lib/utils";

const formSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  middleName: z.string().optional(),
  lastName: z.string().min(1, "Last name is required"),
  dateOfBirth: z.date({ required_error: "Date of birth is required" }),
  gender: z.enum(["male", "female"], { message: "Gender is required" }),
  email: z.string().email("Invalid email"),
  phoneNumber: z.string().optional(),
  nationality: z.string().min(1, "Nationality is required"),
  passportNumber: z.string().optional(),
  nationalID: z.string().optional(),
});

type FormSchema = z.infer<typeof formSchema>;

const PersonalInfoDialog = ({ id }: { id: number }) => {
  const { patientData } = useGetPatient(id);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedNationality, setSelectedNationality] = useState<string>("");
  const [month, setMonth] = useState<number>(new Date().getMonth());
  const [year, setYear] = useState<number>(new Date().getFullYear());

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      middleName: "",
      lastName: "",
      dateOfBirth: undefined,
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
      const dob = patientInfo.dateofBirth
        ? new Date(patientInfo.dateofBirth)
        : undefined;
      form.reset({
        firstName: patientInfo.firstName || "",
        middleName: "",
        lastName: patientInfo.lastName || "",
        dateOfBirth: dob,
        gender: (patientInfo.gender === "female" ? "female" : "male") as "male" | "female",
        email: patientInfo.email || "",
        phoneNumber: patientInfo.phone || "",
        nationality: patientInfo.nationality || "",
        nationalID: patientInfo.nationalID,
      });
      if (dob) {
        setMonth(dob.getMonth());
        setYear(dob.getFullYear());
      }
      setSelectedNationality(patientInfo.nationality || "");
    }
  }, [patientData, form]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
    }
  };

  const handleMonthChange = (newMonth: number) => {
    setMonth(newMonth);
    // Create a new date with the updated month but keep the same year
    const newDate = new Date(year, newMonth, 1);
    form.setValue("dateOfBirth", newDate);
  };

  const handleYearChange = (newYear: number) => {
    setYear(newYear);
    // Create a new date with the updated year but keep the same month
    const newDate = new Date(newYear, month, 1);
    form.setValue("dateOfBirth", newDate);
  };

  const onSubmit = async (values: FormSchema) => {
    console.log("Form submitted with values:", values);
  };

  return (
    <div>
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
                name="dateOfBirth"
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
                      <PopoverContent className="w-auto p-0" align="start">
                        <div className="flex items-center justify-between px-4 pt-1">
                          <div className="flex items-center gap-2">
                            <select
                              value={month}
                              onChange={(e) =>
                                handleMonthChange(Number(e.target.value))
                              }
                              className="bg-transparent text-sm"
                            >
                              {Array.from({ length: 12 }).map((_, i) => (
                                <option key={i} value={i}>
                                  {new Date(0, i).toLocaleString("default", {
                                    month: "long",
                                  })}
                                </option>
                              ))}
                            </select>
                            <select
                              value={year}
                              onChange={(e) =>
                                handleYearChange(Number(e.target.value))
                              }
                              className="bg-transparent text-sm"
                            >
                              {Array.from(
                                { length: new Date().getFullYear() - 1899 },
                                (_, i) => (
                                  <option key={i} value={1900 + i}>
                                    {1900 + i}
                                  </option>
                                )
                              )}
                            </select>
                          </div>
                          <div className="flex gap-1">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                const newMonth = month - 1;
                                if (newMonth < 0) {
                                  setMonth(11);
                                  setYear(year - 1);
                                } else {
                                  setMonth(newMonth);
                                }
                              }}
                            >
                              <ChevronLeft className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                const newMonth = month + 1;
                                if (newMonth > 11) {
                                  setMonth(0);
                                  setYear(year + 1);
                                } else {
                                  setMonth(newMonth);
                                }
                              }}
                            >
                              <ChevronRight className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        <Calendar
                          mode="single"
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
              name="phoneNumber"
              placeholder="+05334829810"
              label="Phone number"
            />
            <FormInput form={form} name="nationalID" label="Identity number" />
            <FormInput form={form} name="passportNumber" label="Eligibility" />

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

"use client";

import FormInput from "@/components/FormInput";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon } from "lucide-react";
import Image from "next/image";
import ReactFlagsSelect from "react-flags-select";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { format } from "date-fns";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { EligibilitySelect } from "@/components/report/EligibilitySelect";
import { CustomCalendar } from "@/components/Custom-calendar";
import { BloodTypeSelect } from "@/components/report/BloodTypeSelect";
import { useCreatePatient } from "@/services/api/patient";
import LoadingIndicator from "@/components/Loading-Indicator";
import { useRouter } from "next/navigation";
import { PhoneInput } from "@/components/ui/phone-input";

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

export type FormSchema = z.infer<typeof formSchema>;

const CreateUnregisteredPCRReport = () => {
  const { createPatient, isPending } = useCreatePatient();
  const router = useRouter();

  // const [selectedImage, setSelectedImage] = useState<string | null>(null);

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

  // const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = e.target.files?.[0];
  //   if (file) {
  //     setSelectedImage(URL.createObjectURL(file));
  //   }
  // };

  const onSubmit = async (values: FormSchema) => {
    const formattedDateOfBirth = values.dateofBirth
      ? values.dateofBirth.toISOString().split("T")[0]
      : "";

    createPatient({
      ...values,
      phone: values.phone ?? "", // ✅ ensure string
      nationalID: values.nationalID ?? "", // ✅ ensure string
      weight: values.weight ?? "",
      height: values.height ?? "",
      dateofBirth: values.dateofBirth, // Pass as Date object
    });
    router.replace("/report/run-report/create/registered");
  };

  return (
    <div className="w-3/4 mx-auto">
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
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
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
                className="grid grid-cols-2 gap-8 mt-3"
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

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem className="flex flex-col items-start">
                  <FormLabel>Phone number</FormLabel>
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
            <FormInput
              form={form}
              name="weight"
              placeholder="Weight"
              label="Weight"
            />
            <BloodTypeSelect
              control={form.control}
              name="bloodType"
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

          <div className="flex justify-center gap-5 mt-8">
            <Button
              type="submit"
              disabled={isPending}
              className="bg-dark-gray flex items-center justify-center gap-x-2 w-full px-8 py-3 hover:text-white hover:bg-second-main transition-colors duration-150"
            >
              {isPending ? <LoadingIndicator /> : "Create Patient Profile"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default CreateUnregisteredPCRReport;

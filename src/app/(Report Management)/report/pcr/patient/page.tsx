"use client";
import React from "react";
import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Form } from "@/components/ui/form";
import FormInput from "@/components/FormInput";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const Page = () => {
  const formSchema = z.object({
    incidentNumber: z.string().min(1, "Incident Number is required"),
    dateOfIncident: z.string().min(1, "Date of Incident is required"),
    incidentType: z.string().min(1, "Incident Type is required"),
    incidentStatus: z.string().min(1, "Incident Status is required"),
    region: z.string().min(1, "Region is required"),
    neighborhood: z.string().min(1, "Neighborhood is required"),
    street: z.string().min(1, "Street is required"),
    landmark: z.string().optional(),
    reason: z.string().optional(),
  });

  type FormSchema = z.infer<typeof formSchema>;

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      incidentNumber: "",
      dateOfIncident: "",
      incidentType: "",
      incidentStatus: "",
      region: "",
      neighborhood: "",
      street: "",
      landmark: "",
      reason: "",
    },
  });

  const onSubmit = async (values: FormSchema) => {
    console.log(values);
  };

  return (
    <div className="container mx-auto p-4">
      {/* Patient Information Section */}
      <div className="bg-gray-100 shadow-lg rounded-lg p-6 flex flex-col md:flex-row justify-center md:items-start gap-6">
        <div className="flex flex-col items-center md:items-start gap-4 md:pr-4 w-full md:w-auto">
          <h2 className="text-lg font-bold text-gray-800">
            PATIENT INFORMATION
          </h2>
          <div className="flex flex-row">
            <Image
              src="/report/sample.jpg"
              width={80}
              height={80}
              alt="Profile Picture"
              className="w-20 h-20 rounded-md object-cover"
            />
            <div className="flex flex-col ml-4">
              <h2 className="text-lg text-gray-800">
                Mahamat Hassan Mahadjir Hassan
              </h2>
              <p className="text-gray-600 text-sm">
                <strong>Age:</strong> 24
              </p>
              <p className="text-gray-600 text-sm">
                <strong>Phone:</strong> +90 533 867 28 35
              </p>
              <p className="text-gray-600 text-sm">
                <strong>Email:</strong> hm.mahadjir@gmail.com
              </p>
            </div>
          </div>
        </div>

        <div className="flex-1 grid grid-cols-4 grid-rows-3 gap-4 px-4 text-gray-700 w-full md:border-l">
          <div>
            <p className="text-xs text-gray-500">Identify Number</p>
            <p className="font-semibold">20910394</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Date of Birth</p>
            <p className="font-semibold">17-05-2000</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Nationality</p>
            <p className="font-semibold">Chad</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Address</p>
            <p className="font-semibold">Northern Cyprus</p>
          </div>
          <div className="row-start-2">
            <p className="text-xs text-gray-500">Sex</p>
            <p className="font-semibold">Male</p>
          </div>
          <div className="row-start-2">
            <p className="text-xs text-gray-500">Height</p>
            <p className="font-semibold">189 CM</p>
          </div>
          <div className="row-start-2">
            <p className="text-xs text-gray-500">Weight</p>
            <p className="font-semibold">74 KG</p>
          </div>
          <div className="row-start-2">
            <p className="text-xs text-gray-500">Blood Type</p>
            <p className="font-semibold">- O</p>
          </div>
          <div className="col-start-4 row-start-3 justify-self-begin">
            <button className="bg-green-700 text-white px-4 py-2 rounded-md text-sm hover:bg-green-800">
              Update
            </button>
          </div>
        </div>
      </div>

      {/* Tabs Section */}
      <div className="bg-gray-100 shadow-lg rounded-lg p-6 mt-6">
        <Tabs defaultValue="incident">
          <TabsList className="mb-4 flex space-x-4">
            <TabsTrigger value="incident">Incident Information</TabsTrigger>
            <TabsTrigger value="crew">Crew Information</TabsTrigger>
            <TabsTrigger value="medication">Medication</TabsTrigger>
          </TabsList>

          {/* Incident Form */}
          <TabsContent value="incident">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 p-4"
              >
                <FormInput
                  form={form}
                  name="incidentNumber"
                  label="Incident Number"
                  placeholder="Enter incident number"
                />
                <FormInput
                  form={form}
                  name="dateOfIncident"
                  label="Date of Incident"
                  placeholder="DD-MM-YYYY"
                />
                <FormInput
                  form={form}
                  name="incidentType"
                  label="Incident Type"
                  placeholder="Enter type"
                />
                <FormInput
                  form={form}
                  name="incidentStatus"
                  label="Incident Status"
                  placeholder="Status"
                />
                <FormInput
                  form={form}
                  name="region"
                  label="Region"
                  placeholder="Enter region"
                />
                <FormInput
                  form={form}
                  name="neighborhood"
                  label="Neighborhood"
                  placeholder="Enter neighborhood"
                />
                <FormInput
                  form={form}
                  name="street"
                  label="Street"
                  placeholder="Enter street"
                />
                <FormInput
                  form={form}
                  name="landmark"
                  label="Landmark"
                  placeholder="Enter landmark (optional)"
                />
                <div className="col-span-1 sm:col-span-2 md:col-span-3">
                  <label
                    htmlFor="reason"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Reason
                  </label>
                  <textarea
                    id="reason"
                    {...form.register("reason")}
                    rows={4}
                    className="w-full p-2 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring focus:ring-blue-300"
                    placeholder="Write the reason..."
                  ></textarea>
                </div>
                <div className="col-span-1 sm:col-span-2 md:col-span-4">
                  <Button
                    type="submit"
                    className="bg-green-700 text-white px-4 py-2 rounded-md text-sm hover:bg-green-800"
                  >
                    Save
                  </Button>
                </div>
              </form>
            </Form>
          </TabsContent>

          {/* Placeholder for other tabs */}
          <TabsContent value="crew">Crew Information goes here.</TabsContent>
          <TabsContent value="medication">
            Medication details go here.
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Page;

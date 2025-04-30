import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Edit, Loader2 } from "lucide-react";
import React from "react";
import IncidentTab from "../IncidentTab";
import CrewTab from "../CrewTab";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { PCR } from "@/types/patients.type";
import { Form } from "@/components/ui/form";
import { PCRData, PCRSchema } from "@/types/formSchema";

interface EditPCRDialogProp {
  pcr: PCR;
}

const EditPCRDialog = ({ pcr }: EditPCRDialogProp) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState("incident");

  const form = useForm<PCRData>({
    resolver: zodResolver(PCRSchema),
    defaultValues: {
      id: pcr.id,
      patientCondition: pcr.patientCondition ?? "",
      initialCondition: pcr.initialCondition ?? "",
      primarySymptoms: pcr.primarySymptoms ?? "",
      notes: pcr.notes ?? "",
    },
  });

  const onSubmit = async (data: PCRData) => {
    try {
      setIsLoading(true);
      // Replace with your actual API call
      //example
      // const response = await fetch(`/api/pcr/${pcr.id}`, {
      //   method: "PUT",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify(data),
      // });

      // if (!response.ok) {
      //   throw new Error("Failed to update PCR");
      // }

      // Toast success message

      setIsOpen(false);
    } catch (error) {
      // Toast Error message
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          className="bg-main hover:bg-main/90"
          size="sm"
          variant="default"
        >
          <Edit className="w-4 h-4 mr-1" />
          Edit Report
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle className="text-xl">Edit PCR Report</DialogTitle>
        </DialogHeader>

        <div className="bg-gray-50 rounded-lg p-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <Tabs
                value={activeTab}
                onValueChange={setActiveTab}
                className="space-y-4"
              >
                <TabsList className="w-full bg-gray-200 p-1 rounded-lg">
                  <TabsTrigger
                    value="incident"
                    className="data-[state=active]:bg-white px-4 py-2 rounded-md"
                    disabled={isLoading}
                  >
                    Incident Details
                  </TabsTrigger>
                  <TabsTrigger
                    value="crew"
                    className="data-[state=active]:bg-white px-4 py-2 rounded-md"
                    disabled={isLoading}
                  >
                    Crew Information
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="incident">
                  <IncidentTab />
                </TabsContent>

                <TabsContent value="crew">
                  <CrewTab />
                </TabsContent>

                <div className="flex justify-end gap-2 pt-4 border-t">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsOpen(false)}
                    disabled={isLoading}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      "Save Changes"
                    )}
                  </Button>
                </div>
              </Tabs>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditPCRDialog;

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
import { Form } from "@/components/ui/form";
import { PCRData, PCRSchema } from "@/types/reportFormSchema";
import { useUpdatePCR } from "@/services/api/reports";
import { PCR } from "@/types/report.type";

interface EditPCRDialogProp {
  pcr: PCR;
}

const EditPCRDialog = ({ pcr }: EditPCRDialogProp) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState("incident");
  const { mutateUpdate, isPending } = useUpdatePCR(pcr.id);

  // "runReportId":18,
  //   "patientCondition":"critical",
  //   "primaryAssessment":"test primary Assessment",
  //   "secondaryAssessment":"test Secondary Assessment",
  //   "notes":"Additional notes",

  const form = useForm<PCRData>({
    resolver: zodResolver(PCRSchema),
    defaultValues: {
      runReportId: pcr.id,
      patientCondition: pcr.patientCondition ?? "",
      primaryAssessment: pcr.primaryAssessment ?? "",
      secondaryAssessment: pcr.secondaryAssessment ?? "",
      notes: pcr.notes ?? "",
    },
  });

  const onSubmit = async (data: PCRData) => {
    console.log("data", data);

    mutateUpdate(data, {
      onSuccess: () => {
        setIsOpen(false);
      },
    });
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
                    disabled={isPending}
                  >
                    Incident Details
                  </TabsTrigger>
                  <TabsTrigger
                    value="crew"
                    className="data-[state=active]:bg-white px-4 py-2 rounded-md"
                    disabled={isPending}
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
                    disabled={isPending}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" disabled={isPending}>
                    {isPending ? (
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

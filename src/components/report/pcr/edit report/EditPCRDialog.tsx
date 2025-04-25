import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Edit } from "lucide-react";
import React from "react";
import IncidentTab from "../IncidentTab";
import CrewTab from "../CrewTab";
import MedicationTab from "../MedicationTab";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { PCR } from "@/types/patients.type";
import { Form } from "@/components/ui/form";
import { PCRData, PCRSchema } from "@/types/formSchema";

interface EditPCRDialogProp {
  pcr: PCR;
}

const EditPCRDialog = ({ pcr }: EditPCRDialogProp) => {
  const form = useForm<PCRData>({
    resolver: zodResolver(PCRSchema),
    defaultValues: {
      id: pcr.id,
      patientCondition: pcr.patientCondition ?? null,
      initialCondition: pcr.initialCondition ?? null,
      primarySymptoms: pcr.primarySymptoms ?? null,
      notes: pcr.notes ?? null,
      createdAt: pcr.createdAt,
    },
  });

  const onSubmit = (data: PCRData) => {
    console.log(data);
  };

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="bg-main" size="sm">
            <Edit className="w-4 h-4 mr-1" />
            Edit
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <div className="bg-gray-100 shadow rounded-lg p-4">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                  <Tabs defaultValue="incident">
                    <TabsList className="mb-4 flex space-x-4">
                      <TabsTrigger value="incident">Incident</TabsTrigger>
                      <TabsTrigger value="crew">Crew</TabsTrigger>
                    </TabsList>

                    <TabsContent value="incident">
                      <IncidentTab />
                    </TabsContent>
                    <TabsContent value="crew">
                      <CrewTab />
                    </TabsContent>
                  </Tabs>
                </form>
              </Form>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EditPCRDialog;

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import React from "react";

const CreateTreatmentDialog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-main" size="sm">
          <Plus className="w-4 h-4 mr-1" />
          New Treatment
        </Button>
      </DialogTrigger>
      <DialogContent>New Treatment</DialogContent>
    </Dialog>
  );
};

export default CreateTreatmentDialog;

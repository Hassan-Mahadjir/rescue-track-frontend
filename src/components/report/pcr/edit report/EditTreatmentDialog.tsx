import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import React from "react";

const EditTreatmentDialog = () => {
  return (
    <div>
      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
        <Pencil className="h-3.5 w-3.5" />
      </Button>
    </div>
  );
};

export default EditTreatmentDialog;

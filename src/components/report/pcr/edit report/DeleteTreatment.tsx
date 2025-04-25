import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import React from "react";

const DeleteTreatment = () => {
  return (
    <div>
      <Button
        variant="ghost"
        size="sm"
        className="h-8 w-8 p-0 text-destructive hover:text-destructive"
      >
        <Trash className="h-3.5 w-3.5" />
      </Button>
    </div>
  );
};

export default DeleteTreatment;

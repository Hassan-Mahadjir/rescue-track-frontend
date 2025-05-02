import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

interface AllergyProps {
  allergies: string[];
}

const AllergyList = ({ allergies }: AllergyProps) => {
  if (!allergies || allergies.length === 0) {
    return (
      <div className="flex items-center justify-center p-4 text-muted-foreground text-sm">
        No allergies listed
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
      {allergies.map((allergy, index) => (
        <Card
          key={index}
          className="p-1 border border-gray-200 shadow-sm bg-white"
        >
          <CardContent className="p-2 flex justify-between items-center text-xs text-gray-800">
            <span className="truncate capitalize font-semibold">{allergy}</span>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="text-red-500 size-2  hover:text-red-700"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default AllergyList;

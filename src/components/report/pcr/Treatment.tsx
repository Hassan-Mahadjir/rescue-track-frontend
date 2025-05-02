import { Treatments } from "@/types/patients.type";
import { Card, CardContent } from "@/components/ui/card";
import DeleteTreatment from "./edit report/DeleteTreatment";
import EditTreatmentDialog from "./edit report/EditTreatmentDialog";

interface TreatmentProps {
  treatments: Treatments[];
  id: number;
}

const Treatment = ({ treatments, id }: TreatmentProps) => {
  if (!treatments || treatments.length === 0) {
    return (
      <div className="flex items-center justify-center p-8 text-muted-foreground">
        No treatments available
      </div>
    );
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {treatments.map((treat) => (
        <Card key={treat.id} className="hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <h3 className="font-medium">{treat.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {treat.category}
                </p>
                <p className="text-sm">
                  {treat.quantity} {treat.unit}
                </p>
              </div>

              <div className="flex gap-1">
                <EditTreatmentDialog treatment={treat} id={id} />
                <DeleteTreatment id={treat.id} />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default Treatment;

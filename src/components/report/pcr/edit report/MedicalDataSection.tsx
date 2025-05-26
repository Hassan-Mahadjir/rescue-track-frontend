"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AddMedicalDataDialog, { TypeKeys } from "./AddMedicalDataDialog";
import DeleteMedicalDataButton from "./DeleteMedicalDataButton";

// Interface allowing null values for fields such as height
interface MedicalDataItem {
  id: number;
  [key: string]: string | number | null | undefined;
}

interface MedicalDataSectionProps<T extends MedicalDataItem> {
  title: string;
  data: T[] | null | undefined;
  pcrId: number;
  type: TypeKeys;
  displayField: Extract<keyof T, string>;
  extraField?: Extract<keyof T, string>;
}

const MedicalDataSection = <T extends MedicalDataItem>({
  title,
  data,
  pcrId,
  type,
  displayField,
  extraField,
}: MedicalDataSectionProps<T>) => {
  return (
    <Card className="bg-gray-100 shadow-md">
      <CardHeader className="py-3 px-6 flex justify-between items-center">
        <CardTitle className="text-lg font-semibold">{title}</CardTitle>
        <AddMedicalDataDialog id={pcrId} type={type} />
      </CardHeader>
      <CardContent className="px-6 pb-6">
        {data && data.length > 0 ? (
          <div className="space-y-3">
            {data.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center p-3 bg-white rounded-lg border border-gray-200"
              >
                <div className="flex-1">
                  <p className="text-sm text-gray-700">
                    {String(item[displayField])}
                    {extraField && item[extraField] != null && (
                      <span className="text-gray-500">
                        {" "}
                        — {extraField}: {String(item[extraField])}
                      </span>
                    )}
                  </p>
                </div>
                <DeleteMedicalDataButton itemId={item.id} type={type} />
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600 text-center py-4">
            No {title.toLowerCase()} recorded.
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default MedicalDataSection;

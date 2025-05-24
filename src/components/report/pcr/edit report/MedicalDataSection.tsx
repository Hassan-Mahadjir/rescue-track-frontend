"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import AddMedicalDataDialog from "./AddMedicalDataDialog"
import DeleteMedicalDataButton from "./DeleteMedicalDataButton"

interface MedicalDataItem {
  id: number
  [key: string]: any
}

interface MedicalDataSectionProps {
  title: string
  data: MedicalDataItem[]
  pcrId: number
  type: string
  displayField: string
  extraField?: string
}

export default function MedicalDataSection({
  title,
  data,
  pcrId,
  type,
  displayField,
  extraField,
}: MedicalDataSectionProps) {
  return (
    <Card className="bg-gray-100 shadow-md">
      <CardHeader className="py-3 px-6 flex flex-row justify-between items-center">
        <CardTitle className="text-lg font-semibold">{title}</CardTitle>
        <AddMedicalDataDialog pcrId={pcrId} type={type} />
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
                    {item[displayField]}
                    {extraField && item[extraField] && (
                      <span className="text-gray-500">
                        {" "}
                        — {extraField}: {item[extraField]}
                      </span>
                    )}
                  </p>
                </div>
                <DeleteMedicalDataButton itemId={item.id} type={type} />
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600 text-center py-4">No {title.toLowerCase()} recorded.</p>
        )}
      </CardContent>
    </Card>
  )
}

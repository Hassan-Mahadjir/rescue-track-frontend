"use client";
import { CheckboxForm } from "@/components/CheckboxForm";

const traumaOptions = [
  { label: "Flail Chest", value: "Flail Chest" },
  { label: "Spinal Cord Injury", value: "Spinal Cord Injury" },
  { label: "Head Trauma", value: "Head Trauma" },
];

const injuryMechanismOptions = [
  { label: "Fall", value: "Fall", needsHeight: true },
  { label: "Airbag", value: "Airbag", needsHeight: false },
  { label: "Vehicle Ejection", value: "Vehicle Ejection", needsHeight: false },
];

const circumstanceOptions = [
  { label: "Abuse", value: "Abuse" },
  { label: "Neglect", value: "Neglect" },
  { label: "Assault", value: "Assault" },
];

export default function PcrReportStep4() {
  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      {/* Trauma */}
      <CheckboxForm name="truma" label="Trauma" options={traumaOptions} />

      {/* Injury Mechanism */}
      <CheckboxForm
        name="injuryMechanism"
        label="Injury Mechanism"
        options={injuryMechanismOptions}
      />

      {/* Circumstances */}
      <CheckboxForm
        name="circumstances"
        label="Circumstances"
        options={circumstanceOptions}
      />
    </div>
  );
}

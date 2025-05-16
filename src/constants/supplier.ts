export const specialistOptions = [
  { label: "Medical Equipment", value: "Medical Equipment" },
  { label: "Pharmaceuticals", value: "Pharmaceuticals" },
  { label: "Laboratory Equipment", value: "Laboratory Equipment" },
  { label: "Other", value: "other" },
] as const;

export type SpecialistValue = (typeof specialistOptions)[number]["value"];

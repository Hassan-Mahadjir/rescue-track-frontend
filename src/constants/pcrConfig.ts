export const PcrConfig = {
  pupilOptions: [
    { label: "Equal and reactive", value: "Equal and reactive" },
    { label: "Unequal reactive", value: "Unequal reactive" },
    { label: "Fixed and dilated", value: "Fixed and dilated" },
    { label: "Constricted", value: "Constricted" },
    { label: "Dilated", value: "Dilated" },
  ] as const,

  skinOptions: [
    { label: "Warm and dry", value: "Warm and dry" },
    { label: "Warm and moist", value: "Warm and moist" },
    { label: "Cool and dry", value: "Cool and dry" },
    { label: "Pale", value: "Pale" },
    { label: "Cyanotic", value: "Cyanotic" },
    { label: "Flushed", value: "Flushed" },
    { label: "Jaundiced", value: "Jaundiced" },
  ] as const,

  respOptions: [
    { label: "Normal", value: "Normal" },
    { label: "Tachypnea", value: "Tachypnea" },
    { label: "Bradypnea", value: "Bradypnea" },
    { label: "Apnea", value: "Apnea" },
    { label: "Labored", value: "Labored" },
    { label: "Shallow", value: "Shallow" },
    { label: "Deep", value: "Deep" },
  ] as const,

  therapyOptions: [
    { label: "Oxygen therapy", value: "Oxygen therapy" },
    { label: "IV fluids", value: "IV fluids" },
    { label: "Pain management", value: "Pain management" },
    { label: "Splinting", value: "Splinting" },
    { label: "Wound dressing", value: "Wound dressing" },
    { label: "Medication administration", value: "Medication administration" },
  ] as const,

  dietressLevelOptions: [
    { label: "Severe", value: "Severe" },
    { label: "Moderate", value: "Moderate" },
    { label: "Mild", value: "Mild" },
    { label: "None", value: "None" },
  ] as const,
};

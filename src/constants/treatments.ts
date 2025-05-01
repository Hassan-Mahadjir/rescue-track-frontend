// src/constants/treatments.ts

export const TreatmentConfig = {
  treatmentOptions: [
    { id: 1, name: "Paracetamol" },
    { id: 2, name: "Ibuprofen" },
    { id: 3, name: "Morphine" },
    { id: 4, name: "Aspirin" },
  ],

  categoryOptions: [
    { id: 1, name: "antibiotic" },
    { id: 2, name: "analgesic" },
    { id: 3, name: "antiseptic" },
    { id: 4, name: "antihistamine" },
    { id: 5, name: "anti-inflammatory" },
    { id: 6, name: "antiviral" },
    { id: 7, name: "vaccine" },
    { id: 8, name: "antipyretic" },
    { id: 9, name: "antifungal" },
    { id: 10, name: "anticoagulant" },
    { id: 11, name: "immunosuppressant" },
    { id: 12, name: "hormone" },
  ] as const,

  unitOptions: [
    { id: 1, name: "mg" },
    { id: 2, name: "ml" },
    { id: 3, name: "g" },
    { id: 4, name: "l" },
    { id: 5, name: "tablet" },
    { id: 6, name: "dose" },
  ] as const,

  quantityOptions: [
    50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 2000,
  ] as const,
};

// Extract enums for zod usage
export const UnitLiterals = TreatmentConfig.unitOptions.map((u) => u.name) as [
  string,
  ...string[]
];

export const CategoryLiterals = TreatmentConfig.categoryOptions.map(
  (c) => c.name
) as [string, ...string[]];

export const TreatmentNameLiterals = TreatmentConfig.treatmentOptions.map(
  (t) => t.name
) as [string, ...string[]];

export type Unit = (typeof UnitLiterals)[number];
export type Category = (typeof CategoryLiterals)[number];
export type TreatmentName = (typeof TreatmentNameLiterals)[number];

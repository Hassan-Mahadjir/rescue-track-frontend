"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

interface TreatmentContextType {
  treatmentAdded: boolean;
  setTreatmentAdded: (value: boolean) => void;
}

const TreatmentContext = createContext<TreatmentContextType | undefined>(
  undefined
);

export function TreatmentProvider({ children }: { children: ReactNode }) {
  const [treatmentAdded, setTreatmentAdded] = useState(false);

  return (
    <TreatmentContext.Provider value={{ treatmentAdded, setTreatmentAdded }}>
      {children}
    </TreatmentContext.Provider>
  );
}

export function useTreatment() {
  const context = useContext(TreatmentContext);
  if (context === undefined) {
    throw new Error("useTreatment must be used within a TreatmentProvider");
  }
  return context;
}

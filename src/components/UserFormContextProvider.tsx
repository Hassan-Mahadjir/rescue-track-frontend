"use client";
import { NewUserFormContext, User } from "@/contexts/multistep-form-context";
import { useState } from "react";

export function UserFormContextProider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [propertyForm, setPropertyForm] = useState<User>({
    email: "",
    phone: "",
    role: "",
    password: "",
    confirm: "",
  });

  const updatePropertyForm = (values: Partial<User>) => {
    setPropertyForm((prev) => ({ ...prev, ...values }));
  };

  return (
    <NewUserFormContext.Provider value={{ propertyForm, updatePropertyForm }}>
      {children}
    </NewUserFormContext.Provider>
  );
}

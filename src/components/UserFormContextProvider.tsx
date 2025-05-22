"use client";
import { NewUserFormContext, User } from "@/contexts/multistep-form-context";
import { useState } from "react";

const initialUser: User = {
  email: "",
  phone: "",
  role: "",
  password: "",
  confirm: "",
  firstName: "",
  lastName: "",
  hospitalID: "",
};

export function UserFormContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [propertyForm, setPropertyForm] = useState<User>(initialUser);

  const updatePropertyForm = (values: Partial<User>) => {
    setPropertyForm((prev) => ({ ...prev, ...values }));
  };

  return (
    <NewUserFormContext.Provider value={{ propertyForm, updatePropertyForm }}>
      {children}
    </NewUserFormContext.Provider>
  );
}

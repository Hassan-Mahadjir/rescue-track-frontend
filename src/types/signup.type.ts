export type SignupFormValues = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
  role: string;
};

export type SignupReturnValues = {
  id: number;
  createdAt: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: string;
};

export type ValidationFormValues = {
  otp: string;
  email: string;
};

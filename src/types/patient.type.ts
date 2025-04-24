export type Responsible = {
  id: number;
  email: string;
  password: string;
  role: "ADMIN" | "EMPLOYEE" | string;
  createdAt: string;
  hashedRefreshToken: string | null;
  otp: string | null;
  otpCodeExpiry: string | null;
  isVerified: boolean;
};

export type UpdateHistory = {
  id: number;
  updateFields: string;
  updatedAt: string;
  patientId: number;
  updatedBy: number;
};

export type Patient = {
  id: number;
  nationalID: string;
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
  phone: string;
  dateofBirth: string;
  eligibility: string | null;
  nationality: string;
  weight: number;
  height: number;
  status: string;
  createdAt: string;
  responsible: Responsible;
  updateHistory: UpdateHistory[];
};

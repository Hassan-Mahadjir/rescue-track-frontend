import { PatientCareReport } from "./runReport.type";

export type Profile = {
  id: number;
  firstName: string;
  middleName: string | null;
  lastName: string;
  address: string | null;
  phone: string;
  avatar: string | null;
  gender: string;
  nationality: string;
  dateofBirth: string;
  createdAt: string;
  updatedAt?: string;
};

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
  profile: Profile;
  hospital: Hospital;
};

export type Patient = {
  id?: number;
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
  status?: string;
  createdAt?: string;
  hospitalId?: string;
  updatedById?: number;
  responsibleUserId?: number;
  createById?: number;
  patientCareReport?: PatientCareReport[];
  responsible: Responsible;
};

type Hospital = {
  id: string;
  name: string;
  isActive: boolean;
  createdAt: string;
};

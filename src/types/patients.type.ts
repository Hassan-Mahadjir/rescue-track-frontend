export type Treatments = {
  id: number;
  name: string;
  quantity: number;
  unit: string;
  category: string;
};

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

export type InitiatedBy = {
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
  status: string; // More specific if possible
  createdAt?: string;
};

export type PCR = {
  id: number;
  patientCondition: string | null;
  primaryAssessment: string | null;
  secondaryAssessment: string | null;
  notes: string | null;
  createdAt: string;
  treatments: Treatments[];
  initiatedBy: InitiatedBy;
  patient: Patient;
};

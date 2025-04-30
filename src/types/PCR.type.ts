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

export type PCR = {
  id: number;
  patientCondition: string | null;
  initialCondition: string | null;
  primarySymptoms: string | null;
  notes: string | null;
  createdAt: string;
  treatments: Treatments[];
  initiatedBy: InitiatedBy;
  patient: Patient;
};

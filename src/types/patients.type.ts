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
  hospitalId: string;
  createdById: number;
  updatedById: number | null;
  responsibleUserId: number;
};

type Hospital = {
  id: string;
  name: string;
  isActive: boolean;
  createdAt: string;
};

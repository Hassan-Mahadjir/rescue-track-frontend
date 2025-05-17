import { Patient } from "./patients.type";

// Treatment interface
type Treatment = {
  id: number;
  name: string;
  quantity: number;
  unit: string;
  category: string;
};

// Patient Care Report interface
export type PatientCareReport = {
  id: number;
  patientCondition: string;
  initialCondition: string | null;
  primarySymptoms: string | null;
  notes: string | null;
  createdAt: string;
  treatments: Treatment[];
};

// Profile interface
interface Profile {
  id: number;
  firstName: string;
  middleName: string | null;
  lastName: string;
  address: string | null;
  phone: string;
  avatar: string;
  gender: string;
  nationality: string;
  dateofBirth: string;
  createdAt: string;
  updatedAt: string;
}

// User interface (initiatedBy)
interface User {
  id: number;
  email: string;
  password: string;
  role: string;
  createdAt: string;
  hashedRefreshToken: string | null;
  otp: string | null;
  otpCodeExpiry: string | null;
  isVerified: boolean;
  profile: Profile;
}

// Update Fields interface (part of UpdateHistory)
interface UpdateFields {
  category?: string;
  priority?: string;
  callerPhone?: string;
  relationship?: string;
  responseTime?: string;
  transportStatus?: string;
  arrivalTimeAtScense?: string;
  arrivalTimeAtPatient?: string;
}

// Update History interface
export type UpdateHistory = {
  id: number;
  updateFields: UpdateFields;
  updatedAt: string;
};

// Single Run Report interface
export type RunReportItem = {
  id: number;
  caller: string;
  callerPhone: string;
  relationship: string;
  category: string;
  priority: string;
  transportStatus: string;
  mileage: number;
  responseTime: string;
  arrivalTimeAtScense: string;
  arrivalTimeAtPatient: string;
  departureTime: string;
  notes: string;
  createAt: string;
  initiatedBy: User;
  patient: Patient;
  updateHistory: UpdateHistory[];
};

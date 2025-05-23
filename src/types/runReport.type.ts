import { Patient } from "./patients.type";

// Profile type
export type Profile = {
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
};

// InitiatedBy / User type
export type User = {
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
};

// UpdateFields type
export type UpdateFields = {
  id?: number;
  notes?: string;
  caller?: string;
  mileage?: number;
  category?: string;
  priority?: string;
  patientId?: number;
  callerPhone?: string;
  relationship?: string;
  responseTime?: string;
  departureTime?: string;
  transportStatus?: string;
  arrivalTimeAtScense?: string;
  arrivalTimeAtPatient?: string;
};

// UpdateHistory type
export type UpdateHistory = {
  id: number;
  updateFields: UpdateFields;
  updatedAt: string;
  updatedById: number;
};

// Main RunReportItem type
export type RunReportItem = {
  id: number;
  caller: string;
  callerPhone: string;
  relationship: string;
  category: string;
  priority: string;
  severtiyCode: string;
  transportStatus: string;
  mileage: number | null;
  responseTime: string;
  callReceivedTime: string | null;
  notificationTime: string | null;
  arrivalTimeAtScense: string;
  arrivalTimeAtPatient: string;
  departureTime: string;
  fromLocation: string | null;
  toLocation: string | null;
  locationNote: string | null;
  ambulanceNumber: string | null;
  ambulanceDriver: string | null;
  arrivalTimeAtDestination: string | null;
  departureTimeFromDestination: string | null;
  notes: string;
  createAt: string;
  updatedAt: string;
  createdById: number;
  updatedById: number | null;
  patient: Patient | null;
  updateHistory: UpdateHistory[];
};

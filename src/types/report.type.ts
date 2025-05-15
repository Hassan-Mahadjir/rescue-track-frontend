import { Patient } from "./patients.type";

export type Treatment = {
  id: number;
  name: string;
  quantity: number;
  unit: Unit;
  category: string;
};

type Unit = {
  id: number;
  abbreviation: string;
  name: string;
  createAt: string;
};

type MedicalConditions = {
  id: number;
  name: string;
};

export type Allergies = {
  id: number;
  name: string;
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
  hospital: Hospital;
};

export type PCR = {
  id: number;
  patientCondition: string | null;
  primaryAssessment: string | null;
  secondaryAssessment: string | null;
  notes: string | null;
  createdAt: string;
  createdById: number;
  updatedById: number;
  updatedAt: string;
  treatments: Treatment[];
  initiatedBy: InitiatedBy;
  patient: Patient;
  allergies: Allergies[];
  medicalConditions: MedicalConditions[];
};

type UpdateFields = {
  category?: string;
  priority?: string;
  callerPhone?: string;
  relationship?: string;
  responseTime?: string;
  transportStatus?: string;
  arrivalTimeAtScense?: string;
  arrivalTimeAtPatient?: string;
};

type UpdateHistory = {
  id: number;
  updateFields: UpdateFields;
  updatedAt: string;
};

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
  updatedById: number;
  createdById: number;
  initiatedBy: InitiatedBy;
  patient: Patient;
  updateHistory: UpdateHistory[];
};

type Hospital = {
  id: string;
  name: string;
  isActive: boolean;
  createAt: Date;
};

export type ReportStat = {
  date: string; // ISO date string like "2025-05-14T00:00:00.000Z"
  type: "PCR" | "Run report";
  low?: number;
  medium?: number;
  high?: number;
  critical?: number;
  stable?: number;
  serious?: number;
  good?: number;
};

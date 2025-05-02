export type Treatment = {
  id: number;
  name: string;
  quantity: number;
  unit: string;
  category: string;
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
};

export type PCR = {
  id: number;
  patientCondition: string | null;
  initialCondition: string | null;
  primarySymptoms: string | null;
  notes: string | null;
  createdAt: string;
  treatments: Treatment[];
  initiatedBy: InitiatedBy;
  patient: Patient;
  allergies: Allergies[];
  medicalConditions: MedicalConditions[];
};

type PatientCareReport = {
  id: number;
  patientCondition: string;
  initialCondition: string | null;
  primarySymptoms: string | null;
  notes: string | null;
  createdAt: string;
  treatments: Treatment[];
};

type Patient = {
  id: number;
  nationalID: string;
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
  phone: string;
  dateofBirth: string;
  eligibility: any | null;
  nationality: string;
  weight: number;
  height: number;
  status: string;
  createdAt: string;
  patientCareReport: PatientCareReport[];
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
  initiatedBy: InitiatedBy;
  patient: Patient;
  updateHistory: UpdateHistory[];
};

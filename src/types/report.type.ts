import { Patient } from "./patients.type";
export type Unit = {
  id: number;
  abbreviation: string;
  name: string;
  createdAt: string; // corrected typo from createAt
};

export type Treatment = {
  id: number;
  name: string;
  dosage: number;
  givenAt: string | null;
  route: string;
  result: string;
  category: string;
  unit: Unit;
};

export type VitalSign = {
  id: number;
  time: string;
  T: string;
  BP: string;
  pulse: string;
  resp: string;
  spO2: string;
  createdAt: string;
  treatments: Treatment[];
};

export type Allergy = {
  id: number;
  name: string;
};

export type MedicalCondition = {
  id: number;
  name: string;
};

export type Trauma = {
  id: number;
  name: string;
};

export type InjuryMechanism = {
  id: number;
  mechanism: string;
  height: number | null;
};

export type Pupil = {
  id: number;
  PHSY: string;
};

export type Skin = {
  id: number;
  skin_status: string;
};

export type Resp = {
  id: number;
  RESP: string;
};

export type Therapy = {
  id: number;
  therapy: string;
};

export type Circumstance = {
  id: number;
  circumstance: string;
};

export type GCS = {
  id: number;
  E: number;
  V: number;
  M: number;
  total: number;
};

export type Profile = {
  id: number;
  firstName: string;
  middleName: string | null;
  lastName: string;
  address: string | null;
  city: string | null;
  area: string | null;
  phone: string | null;
  avatar: string | null;
  gender: string;
  nationality: string;
  dateofBirth: string;
  createdAt: string;
  updatedAt: string;
};

export type Hospital = {
  id: string;
  name: string;
  databaseUrl: string;
  isActive: boolean;
  createdAt: string;
};

export type InitiatedBy = {
  id: number;
  email: string;
  password: string;
  role: string;
  createdAt: string;
  hashedRefreshToken: string;
  otp: string;
  otpCodeExpiry: string;
  isVerified: boolean;
  profile: Profile;
  hospital: Hospital;
};

export type StatRecord = {
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

export type ReportStat = {
  status: number;
  message: string;
  data: StatRecord[];
};

export type PCR = {
  id: number;
  patientCondition: string | null;
  primaryAssessment: string | null;
  secondaryAssessment: string | null;
  notes: string | null;
  createdAt: string;
  updatedAt: string;
  dietressLevel: string | null;
  createdById: number;
  updatedById: number | null;
  vitalSign: VitalSign[];
  treatments: Treatment[]; // redundant if you're accessing treatments only via vitalSign
  initiatedBy: InitiatedBy;
  patient: Patient;
  allergies: Allergy[];
  medicalConditions: MedicalCondition[];
  truma: Trauma[];
  injuryMechanism: InjuryMechanism[];
  pupil: Pupil[];
  skin: Skin[];
  resp: Resp[];
  therapies: Therapy[];
  circumstances: Circumstance[];
  gcs: GCS;
};

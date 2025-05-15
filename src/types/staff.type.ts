export type staff = {
  id: number;
  email: string;
  password: string;
  role: "EMPLOYEE" | "ADMIN" | "USER"; // extend as needed
  createdAt: string;
  hashedRefreshToken: string | null;
  otp: string | null;
  otpCodeExpiry: string | null;
  isVerified: boolean;
  profile: {
    id: number;
    firstName: string;
    middleName: string | null;
    lastName: string;
    address: string | null;
    phone: string;
    avatar: string | null;
    gender: "male" | "female" | "other"; // adjust as needed
    nationality: string;
    dateofBirth: string;
    createdAt: string;
    updatedAt: string;
  };
};

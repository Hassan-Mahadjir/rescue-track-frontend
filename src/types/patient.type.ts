type Patient = {
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
  status: "active" | "inactive" | string; // More specific if possible
  createdAt: string;
};

export type profile = {
  id: number;

  firstName: string;

  middleName: string;

  lastName: string;

  address: string | null;

  phone: string;

  avatar: string;

  gender: string;

  nationality: string;

  dateofBirth: Date;

  createdAt: Date;

  updatedAt: Date;
};

export type UserProfile = {
  id: number;
  firstName: string;
  middleName: string | null;
  lastName: string;
  address: string | null;
  phone: string;
  avatar: string | null;
  gender: string | null;
  nationality: string | null;
  dateofBirth: string | null;
  createdAt: string;
  updatedAt: string;
  user?: {
    id: number;
    email: string;
    role: string;
    createdAt: string;
    isVerified: boolean;
  };
};

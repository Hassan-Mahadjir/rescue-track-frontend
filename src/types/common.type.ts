export type AppResponse<T> = {
  data: T;
  message: string;
  status: string;
};

export type AuthDataType = {
  id: number;
  accessToken: string;
  refreshToken: string;
};

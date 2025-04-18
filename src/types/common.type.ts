export type AppResponse<T> = {
  data: T;
  message: string;
  statusCode: string;
};

export type AuthDataType = {
  id: number;
  accessToken: string;
  refreshToken: string;
};

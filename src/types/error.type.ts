type APIError = Error & {
  response?: {
    data?: {
      message?: string;
    };
  };
};

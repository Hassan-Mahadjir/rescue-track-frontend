import { useMutation, useQuery } from "@tanstack/react-query";
import { LoginFormValues } from "@/types/login.type";
import authService from "../auth-service";
import { getItem, setItem } from "@/utils/storage";
import { useRouter } from "next/navigation";

export enum Role {
  ADMIN = "ADMIN",
  USER = "USER",
  STAFF = "STAFF",
}

export const useLogin = () => {
  const router = useRouter();

  const {
    mutate: mutateLogin,
    isPending,
    ...props
  } = useMutation({
    mutationFn: (data: LoginFormValues) =>
      authService.postLogin({ password: data.password, email: data.email }),
    onSuccess: async (data) => {
      // console.log(`success from auth.ts ${data.data.data.accessToken}`);
      setItem("token", data.data.data.accessToken);
      if (await getItem("token")) {
        router.push("/dashboard");
        console.log("token is set", await getItem("token"));
      }
    },
    onError: () => {},
  });

  return { mutateLogin, isPending, ...props };
};

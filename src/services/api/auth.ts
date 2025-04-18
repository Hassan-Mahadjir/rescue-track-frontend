"use client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { LoginFormValues } from "@/types/login.type";
import authService from "../auth-service";
import { getItem, removeItem, setItem } from "@/utils/storage";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

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
    onSuccess: async (response) => {
      // console.log(`success from auth.ts ${data.data.data.accessToken}`);
      const token = response.data.data.accessToken;
      if (token) {
        setItem("token", token);
        Cookies.set("token", token, { path: "/", sameSite: "Lax" });
        router.replace("/dashboard");
      }
    },
    onError: () => {},
  });

  return { mutateLogin, isPending, ...props };
};

export const useLogout = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { mutate: logout, isPending } = useMutation({
    mutationFn: () => authService.postLogout(),
    onSuccess: async () => {
      await removeItem("token");
      Cookies.remove("token");

      queryClient.clear();
      router.replace("/login");
    },

    onError: (error) => {
      console.error("Logout failed:", error);
      // Optionally show a toast or feedback
    },
  });

  return { logout, isPending };
};

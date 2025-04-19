"use client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { LoginFormValues } from "@/types/login.type";
import authService from "../auth-service";
import { getItem, removeItem, setItem } from "@/utils/storage";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { useToast } from "@/hooks/use-toast";

export enum Role {
  ADMIN = "ADMIN",
  USER = "USER",
  STAFF = "STAFF",
}

export const useLogin = () => {
  const router = useRouter();
  const { toast } = useToast();

  const {
    mutate: mutateLogin,
    isPending,
    ...props
  } = useMutation({
    mutationFn: (data: LoginFormValues) =>
      authService.postLogin({ password: data.password, email: data.email }),
    onSuccess: async (response) => {
      console.log(`success from auth.ts ${response.data.data.accessToken}`);
      const token = response.data.data.accessToken;
      if (token) {
        setItem("token", token);
        Cookies.set("token", token, { path: "/", sameSite: "Lax" });
        router.replace("/dashboard");

        // Successful login toast
        toast({
          title: "Welcome back!",
          description: "You have successfully logged in.",
          variant: "default", // Optional, can use "default" as well
          duration: 3000,
          progressColor: "bg-green-500", // Optional, or your theme class
        });
      }
    },
    onError: () => {
      // Unsuccessful login toast
      toast({
        title: "Login failed",
        description: "Invalid email or password.",
        variant: "destructive",
        duration: 3000,
        progressColor: "bg-red-500", // Optional, or your theme class
      });
    },
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

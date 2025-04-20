"use client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { LoginFormValues } from "@/types/login.type";
import authService from "../auth-service";
import { getItem, removeItem, setItem } from "@/utils/storage";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { useToast } from "@/hooks/use-toast";
import { SignupFormValues } from "@/types/signup.type";

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

export const useSignup = () => {
  const router = useRouter();
  const { toast } = useToast();

  const {
    mutate: mutateSingup,
    isPending,
    ...props
  } = useMutation({
    mutationFn: (data: SignupFormValues) => authService.postSignup(data),
    onSuccess: async (response) => {
      setItem("validation-email", response.data.data.email);
      authService.verifyEmail(response.data.data.email);
      router.replace("/signup/validation");
    },
    onError: (error: any) => {
      // Unsuccessful login toast
      toast({
        title: "unsuccessful signup",
        description: error.message,
        variant: "destructive",
        duration: 3000,
        progressColor: "bg-red-500", // Optional, or your theme class
      });
    },
  });

  return { mutateSingup, isPending, ...props };
};

export const useResendEmail = (email: string) => {
  const { toast } = useToast();

  const {
    mutate: resendVerificationEmail,
    isPending,
    ...props
  } = useMutation({
    mutationFn: () => {
      if (!email) throw new Error("Email is missing.");
      return authService.verifyEmail(email);
    },
    onSuccess: () => {
      toast({
        title: "Verification email sent",
        description: "Please check your inbox.",
        variant: "default",
        duration: 4000,
        progressColor: "bg-green-500",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Failed to resend",
        description: error.message,
        variant: "destructive",
        duration: 5000,
        progressColor: "bg-red-500",
      });
    },
  });

  return { resendVerificationEmail, isPending, ...props };
};

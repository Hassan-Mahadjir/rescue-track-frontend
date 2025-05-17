"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { LoginFormValues, ResetPassword } from "@/types/login.type";
import authService from "../auth-service";
import { removeItem, setItem } from "@/utils/storage";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { useToast } from "@/hooks/use-toast";
import { SignupFormValues, ValidationFormValues } from "@/types/signup.type";
import { APIError } from "@/types/error.type";

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
      authService.postLogin({
        password: data.password,
        email: data.email,
        isOwner: false,
      }),
    onSuccess: async (response) => {
      // console.log(`success from auth.ts ${response.data.data.accessToken}`);
      const token = response.data.data.accessToken;
      const refreshToken = response.data.data.refreshToken;
      if (token) {
        await setItem("token", token);
        await setItem("refreshToken", refreshToken);
        Cookies.set("token", token, { path: "/", sameSite: "Lax" });
        Cookies.set("refreshToken", refreshToken, {
          path: "/",
          sameSite: "Lax",
        });
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
      await removeItem("refreshToken");
      Cookies.remove("token");
      Cookies.remove("refreshToken");

      router.replace("/login");
      queryClient.clear();
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
      router.replace("/validation");
    },
    onError: (error: APIError) => {
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
    onError: (error: APIError) => {
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

export const useVerifyEmail = () => {
  const { toast } = useToast();

  const {
    mutate: verifyEmail,
    isPending,
    ...props
  } = useMutation({
    mutationFn: (data: ValidationFormValues) => {
      if (!data.email || !data.otp) throw new Error("Email or OTP is missing.");
      return authService.verifyOTP(data);
    },
    onSuccess: () => {
      toast({
        title: "Verification successful",
        description: "Your email has been verified.",
        variant: "default",
        duration: 4000,
        progressColor: "bg-green-500",
      });
    },
    onError: (error: APIError) => {
      toast({
        title: "Verification failed",
        description: error.message,
        variant: "destructive",
        duration: 5000,
        progressColor: "bg-red-500",
      });
    },
  });

  return { verifyEmail, isVerifyPending: isPending, ...props };
};

export const useGetUser = (id: number) => {
  const router = useRouter();
  const { toast } = useToast();

  const {
    mutate, // renamed mutate
    data: userData,
    isPending,
    ...props
  } = useMutation({
    mutationFn: () => authService.getUser(id),
    onSuccess: async (response) => {
      const token = response.data.data.accessToken;
      const refreshToken = response.data.data.refreshToken;
      console.log(`success from auth.ts ${token}, ${refreshToken}`);
      // Store tokens if needed here
    },
    onError: () => {
      toast({
        title: "Login Failed",
        description: "Could not fetch user. Please try again.",
        variant: "destructive",
      });
      router.push("/login");
    },
  });

  return { mutateGetUser: mutate, userData, isPending, ...props };
};

export const useChangePassword = () => {
  const router = useRouter();
  const { toast } = useToast();

  const {
    mutate: mutateChangePassword,
    isPending,
    ...props
  } = useMutation({
    mutationFn: (data: ResetPassword) =>
      authService.patchChangePassword({
        email: data.email,
        password: data.password,
      }),
    onSuccess: async (response) => {
      toast({
        title: `${response.data.message}`,
        description: "You can now log in with your new password.",
        variant: "default",
        duration: 3000,
        progressColor: "bg-green-500",
      });
      router.replace("/login");
    },
    onError: () => {
      // Unsuccessful login toast
      toast({
        title: "Change password failed",
        description: "Something is not correct.",
        variant: "destructive",
        duration: 3000,
        progressColor: "bg-red-500", // Optional, or your theme class
      });
    },
  });

  return { mutateChangePassword, isPending, ...props };
};

"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { useRouter } from "next/navigation";
const photo = require("../../../../public/auth/login-plant.jpg");

const Login = () => {
  const t = useTranslations("Auth");

  return (
    <div className="grid grid-cols-2 min-h-screen">
      <div className="flex flex-col items-center mt-[100px]">
        <h1>Sign Up</h1>
      </div>
      <div>
        <Image
          src="/auth/login-plant.jpg"
          alt="Login photo"
          width={4592}
          height={3448}
          className="w-full h-full sm:w-auto"
        />
      </div>
    </div>
  );
};

export default Login;

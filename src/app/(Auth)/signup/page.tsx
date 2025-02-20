import { redirect } from "next/navigation";
import React from "react";

const SignupPage = () => {
  redirect("/signup/step-one");
};

export default SignupPage;

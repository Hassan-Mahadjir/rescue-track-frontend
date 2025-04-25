import { useTranslations } from "next-intl";
import React from "react";

const StepHeader = () => {
  const t = useTranslations("Auth");

  return (
    <div className="text-center mt-2">
      <h1 className=" text-2xl font-semibold mb-1">{t("createAccount")}</h1>
      <p className="text-xs">
        {t("alreadyHaveAccount")}{" "}
        <a href="/login" className="underline underline-offset-4">
          {t("login")}
        </a>
      </p>
    </div>
  );
};

export default StepHeader;

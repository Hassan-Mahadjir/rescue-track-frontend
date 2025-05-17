"use client";

import clsx from "clsx";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { usePathname } from "next/navigation";

const StepNavigation = () => {
  const t = useTranslations("Auth");

  const steps = [
    { title: t("nav-email"), link: "/signup/step-one", route: "step-one" },
    { title: t("nav-basic"), link: "/signup/step-two", route: "step-two" },
    {
      title: t("nav-password"),
      link: "/signup/step-three",
      route: "step-three",
    },
  ];

  const pathname = usePathname();
  const currentPath = pathname.split("/").pop();

  return (
    <div className="flex flex-col items-center justify-center my-5">
      <div className="flex items-center mb-3 w-3/4">
        {steps.map((step, index) => (
          <Link
            href={step.link}
            key={step.link}
            prefetch={true}
            className="flex items-center w-3/4"
          >
            <div className="flex flex-col items-center w-full">
              <div
                className={clsx(
                  "w-6 h-6 flex items-center justify-center rounded-full text-white transition-colors duration-200",
                  {
                    "bg-main": step.route === currentPath,
                    "bg-dark-gray": step.route !== currentPath,
                  }
                )}
              >
                <span>{index + 1}</span>
              </div>
              <span className="mt-2 text-xs text-center whitespace-nowrap px-1 hidden sm:block">
                {step.title}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default StepNavigation;

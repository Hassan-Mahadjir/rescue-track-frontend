"use client";

import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const Navbar = () => {
  const [locale, setLocale] = React.useState<string>("");
  const router = useRouter();

  useEffect(() => {
    const cookieLocale = document.cookie
      .split(";")
      .find((row) => row.startsWith("MYNEXTAPP_LOCALE="))
      ?.split("=")[1];

    if (cookieLocale) {
      setLocale(cookieLocale);
    } else {
      const browserLocale = navigator.language.slice(0, 2);
      document.cookie = `MYNEXTAPP_LOCALE=${browserLocale}`;
      router.refresh();
    }
  }, [router]);

  const changeLocale = (locale: string) => {
    setLocale(locale);
    document.cookie = `MYNEXTAPP_LOCALE=${locale}`;
    router.refresh();
  };

  return (
    <div className="py-3 flex items-center justify-between border-b">
      <h1 className="text-2xl font-bold">Next JS</h1>
      <div className="flex items-center gap-3">
        <button
          onClick={() => changeLocale("en")}
          className={`border p-2 font-bold rounded-md text-sm ${
            locale === "en" && "bg-black text-white"
          }`}
        >
          EN
        </button>
        <button
          onClick={() => changeLocale("ar")}
          className={`border p-2 font-bold rounded-md text-sm ${
            locale === "ar" && "bg-black text-white"
          }`}
        >
          AR
        </button>
      </div>
    </div>
  );
};

export default Navbar;

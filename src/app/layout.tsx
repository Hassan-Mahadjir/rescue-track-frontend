import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import QueryProvider from "@/providers/QueryProvider";
import NavBar from "@/components/NavBar";
import { shouldHideNavBar } from "@/functions/hideNaveBar";
import NavBarWrapper from "@/components/NavBarWrapper";
import useCheckToken from "@/hooks/check-token";
import TokenChecker from "@/components/Token-Checker";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const messages = await getMessages();
  const isRTL = locale === "ar";

  return (
    <html lang={locale} dir={isRTL ? "rtl" : "ltr"}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NextIntlClientProvider messages={messages}>
          <QueryProvider>
            {/* <TokenChecker /> */}
            <NavBarWrapper />
            {children}
          </QueryProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

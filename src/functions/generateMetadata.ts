import { AbstractIntlMessages } from "next-intl";
import { getMessages } from "next-intl/server";

export default async function generateMetaData(
  {
    params: { locale },
  }: {
    params: { locale: string };
  },
  pageKey: string
) {
  const messages: AbstractIntlMessages = await getMessages({ locale });

  const title = messages.TabTitles?.[pageKey];

  return {
    title,
  };
}

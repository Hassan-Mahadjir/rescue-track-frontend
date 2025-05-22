import type { AbstractIntlMessages } from "use-intl";
import { getMessages } from "next-intl/server";

export default async function generateMetaData(
  {
    params: { locale },
  }: {
    params: { locale: string };
  },
  pageKey: string
): Promise<{ title: string | null }> {
  // load the raw messages (could be string or nested object)
  const messages: AbstractIntlMessages = await getMessages({ locale });

  // locally assert that TabTitles is a mapping from page-keys to strings
  const titles = (messages as { TabTitles?: Record<string, string> }).TabTitles;

  // safely index into it, defaulting to null if missing
  const title = titles?.[pageKey] ?? null;

  return { title };
}

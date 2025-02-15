import { redirect } from "next/navigation";

export default function Home() {
  return redirect("/login");
}

// export async function generateMetadata({
//   params,
// }: {
//   params: { locale: string };
// }) {
//   return generateMetaData({ params }, "about");
// }

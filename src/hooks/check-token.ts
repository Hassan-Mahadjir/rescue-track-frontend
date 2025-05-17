import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { getItem } from "@/utils/storage";

const useCheckToken = () => {
  const router = useRouter();

  useEffect(() => {
    const checkToken = async () => {
      const token = await getItem("token");
      if (token) {
        router.replace("/dashboard");
      } else {
        router.replace("/");
      }
    };

    checkToken();
  }, [router]);
};

export default useCheckToken;

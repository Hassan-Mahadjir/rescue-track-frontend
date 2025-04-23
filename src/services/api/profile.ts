import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import ProfileService from "../profile-service";

const useprofile = () => {
  // const router = useRouter();
  const {
    data: profileData,
    error,
    isError,
    ...props
  } = useQuery({
    queryFn: () => ProfileService.getProfile(),
    queryKey: ["profile"],
  });

  if (isError) {
    console.error("Failed to fetch profile:", error);
  }

  return { profileData, ...props };
};

export default useprofile;

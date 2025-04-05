import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import ProfileService from "../profile-service";

const useprofile = () => {
  const router = useRouter();
  const { data: profileData, ...props } = useQuery({
    queryFn: () => ProfileService.getProfile(),
    queryKey: ["profile"],
  });

  return { profileData, ...props };
};

export default useprofile;

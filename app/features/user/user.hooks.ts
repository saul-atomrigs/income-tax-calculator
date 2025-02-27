import { useQuery } from "@tanstack/react-query";
import { type User, getUserAPI } from "~/remotes";

export function useUser() {
  const {
    data: user = { firstName: "", lastName: "" },
    isLoading: userLoading,
    error: userError,
  } = useQuery({
    queryKey: ["user"],
    queryFn: getUserAPI,
  });

  return {
    user,
    userLoading,
    userError,
  };
}

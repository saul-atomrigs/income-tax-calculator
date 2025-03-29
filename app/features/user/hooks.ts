import { useSuspenseQuery, useQueryClient } from "@tanstack/react-query";
import { type User, getUserAPI } from "~/remotes";
import { useUserContext } from "./context";

export function useUser(autoSetUser = true) {
  const { setUser } = useUserContext();
  const queryClient = useQueryClient();

  const query = useSuspenseQuery<User>({
    queryKey: ["user"],
    queryFn: async () => {
      const data = await getUserAPI();
      if (autoSetUser) {
        setUser(data);
        queryClient.setQueryData(["user"], data);
      }
      return data;
    },
  });

  return query;
}

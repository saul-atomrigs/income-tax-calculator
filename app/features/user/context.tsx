import { createContext, useContext, useState, type ReactNode } from "react";
import type { User } from "~/remotes";

type UserContextType = {
  user: User;
  setUser: (user: User) => void;
  clearUser: () => void;
};

const DEFAULT_USER_DATA = {
  firstName: "",
  lastName: "",
  id: "",
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [userState, setUserState] = useState<User>(DEFAULT_USER_DATA);

  const setUser = (user: User) => {
    setUserState(user);
  };

  const clearUser = () => {
    setUserState(DEFAULT_USER_DATA);
  };

  return (
    <UserContext.Provider
      value={{
        user: userState,
        setUser,
        clearUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUserContext() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
}

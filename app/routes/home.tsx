import type { Route } from "./+types/home";
import { useEffect, useState } from "react";
import { getUserAPI } from "../remotes";
import type { User } from "../remotes";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  const [user, setUser] = useState<User>();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getUserAPI();
        setUser(userData);
      } catch (error) {
        console.error("Failed to fetch user:", error);
      }
    };

    fetchUser();
  }, []);

  if (!user) return <div>Loading...</div>;

  return (
    <div>
      {user.firstName} {user.lastName}
    </div>
  );
}

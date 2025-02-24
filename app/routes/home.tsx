import { initMockAPI } from "~/mocks";
import type { Route } from "./+types/home";
import { useEffect, useState } from "react";

initMockAPI();

interface User {
  id: string;
  firstName: string;
  lastName: string;
  age: number;
  retirementAge: number;
  investmentStyle: "stable" | "balanced" | "aggressive";
}

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch("/user");
        const userData = await response.json();
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

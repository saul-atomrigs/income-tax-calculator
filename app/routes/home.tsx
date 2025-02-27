import CTAButton from "~/components/CTAButton";
import Txt from "~/components/Txt";
import { useUser } from "~/features/user/hooks";
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  const { user } = useUser();

  return (
    <>
      <Txt weight="bold" size="xl">
        {user.lastName}님의 세금,
      </Txt>
      <Txt weight="bold" size="xl">
        얼마 돌려받을지 알려드려요
      </Txt>

      <CTAButton onClick={() => {}}>시작하기</CTAButton>
    </>
  );
}

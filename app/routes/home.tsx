import { useUser } from "~/features/user/hooks";
import type { Route } from "./+types/home";
import Loading from "~/components/Loading";
import Error from "~/components/Error";
import Txt from "~/components/Txt";
import CTAButton from "~/components/CTAButton";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  const { user, userLoading, userError } = useUser();

  if (userLoading) {
    return <Loading message="사용자 정보를 불러오고 있습니다..." />;
  }

  if (userError) {
    return (
      <Error message="사용자 정보를 불러올 수 없습니다. 새로고침하고 다시 시도해주세요" />
    );
  }

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

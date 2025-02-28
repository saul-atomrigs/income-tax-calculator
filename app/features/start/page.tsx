import { useNavigate } from "react-router";
import CTAButton from "~/components/CTAButton";
import Txt from "~/components/Txt";
import { useUser } from "~/features/user/hooks";

export default function Home() {
  const { user } = useUser();
  const navigate = useNavigate();

  return (
    <>
      <Txt weight="bold" size="xl">
        {user.lastName}님의 세금,
      </Txt>
      <Txt weight="bold" size="xl">
        얼마 돌려받을지 알려드려요
      </Txt>

      <CTAButton onClick={() => navigate("/income")}>시작하기</CTAButton>
    </>
  );
}

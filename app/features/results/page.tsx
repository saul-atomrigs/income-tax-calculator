import { useNavigate } from "react-router";
import CTAButton from "~/components/CTAButton";
import Txt from "~/components/Txt";
import { useResult } from "~/features/results/context";
import ResultList from "./list";

export default function ResultsPage() {
  const { calculationResult } = useResult();
  const navigate = useNavigate();

  if (!calculationResult) {
    return (
      <div className="container">
        <Txt size="lg">계산 결과가 없습니다.</Txt>
        <CTAButton onClick={() => navigate("/")}>처음으로</CTAButton>
      </div>
    );
  }

  return (
    <div className="container">
      <Txt size="xl" weight="bold">
        계산 결과
      </Txt>

      <ResultList {...calculationResult} />

      <div className="mt-8 space-y-4">
        <CTAButton onClick={() => navigate("/income")}>다시 계산하기</CTAButton>
      </div>
    </div>
  );
}

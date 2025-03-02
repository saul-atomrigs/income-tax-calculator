import { useNavigate } from "react-router";
import { ErrorBoundary } from "react-error-boundary";
import CTAButton from "~/components/CTAButton";
import Txt from "~/components/Txt";
import { useResult } from "~/features/results/context";
import ResultList from "./list";
import { ROUTES } from "~/routes";
import { ResultErrorFallback } from "./error-fallback";

export default function ResultsPage() {
  const navigate = useNavigate();
  const { calculationResult } = useResult();

  if (!calculationResult) {
    throw new Error("다시 시도해주세요");
  }

  return (
    <ErrorBoundary
      FallbackComponent={ResultErrorFallback}
      onReset={() => navigate(ROUTES.start)}
    >
      <div className="container">
        <Txt size="xl" weight="bold">
          계산 결과
        </Txt>

        <ResultList {...calculationResult} />

        <div className="mt-8 space-y-4">
          <CTAButton onClick={() => navigate("/income")}>
            다시 계산하기
          </CTAButton>
        </div>
      </div>
    </ErrorBoundary>
  );
}

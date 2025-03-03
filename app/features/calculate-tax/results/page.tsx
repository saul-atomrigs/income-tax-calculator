import { useNavigate } from "react-router";
import { ErrorBoundary } from "react-error-boundary";
import DualCTAButton from "~/components/DualCTAButton";
import Button from "~/components/Button";
import Txt from "~/components/Txt";
import ResultList from "./list";
import { ResultErrorFallback } from "./error-fallback";
import { ROUTES } from "~/routes";
import { useResultContext } from "./context";
import { useRefundEstimate } from "../../refund-estimate/hooks";

export default function ResultsPage() {
  const navigate = useNavigate();
  const { calculationResult } = useResultContext();
  const refundMutation = useRefundEstimate();

  if (!calculationResult) {
    throw new Error("다시 시도해주세요");
  }

  const handleRefundEstimate = () => {
    refundMutation.mutate(
      {
        lastYearTaxPaid: 1_000_000,
        currentYearTax: calculationResult.totalTax,
      },
      {
        onSuccess: () => {
          navigate(ROUTES.refundEstimate);
        },
      }
    );
  };

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

        <div className="mt-8">
          <DualCTAButton>
            <Button variant="secondary" onClick={() => navigate(ROUTES.start)}>
              처음으로
            </Button>
            <Button
              onClick={handleRefundEstimate}
              disabled={refundMutation.isPending}
            >
              {refundMutation.isPending ? "처리 중..." : "환급액 찾기"}
            </Button>
          </DualCTAButton>
        </div>
      </div>
    </ErrorBoundary>
  );
}

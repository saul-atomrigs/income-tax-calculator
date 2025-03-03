import Txt from "~/components/Txt";
import { useRefundEstimateContext } from "./context";
import { formatToKoreanWon } from "~/components/shared/utils";
import { useUser } from "../user/hooks";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorFallback } from "../calculate-tax/error-fallback";
import { ROUTES } from "~/routes";
import { useNavigate } from "react-router";
import DualCTAButton from "~/components/DualCTAButton";
import Button from "~/components/Button";

export default function RefundEstimatePage() {
  const navigate = useNavigate();
  const { data: user } = useUser();

  const { refundResult } = useRefundEstimateContext();
  const refundAmount = refundResult?.refundAmount ?? 0;

  const displayAmount =
    refundAmount < 0 ? Math.abs(refundAmount) : refundAmount;

  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={() => navigate(ROUTES.start)}
    >
      <Txt size="xl" weight="bold">
        {user.lastName}님의 환급액은 {formatToKoreanWon(displayAmount)}원
        입니다.
      </Txt>
      <DualCTAButton>
        <Button variant="secondary" onClick={() => navigate(ROUTES.start)}>
          처음으로
        </Button>
        <Button onClick={() => navigate(ROUTES.start)}>환급 내역</Button>
      </DualCTAButton>
    </ErrorBoundary>
  );
}

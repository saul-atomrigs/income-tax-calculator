import { useNavigate } from 'react-router';
import { ErrorBoundary } from 'react-error-boundary';
import { DualCTAButton } from '~/components/DualCTAButton';
import { Button } from '~/components/Button';
import { Txt } from '~/components/Txt';
import ResultList from './list';
import { ErrorFallback } from '../error-fallback';
import { ROUTES } from '~/routes';
import { useResultContext } from './context';
import { useRefundEstimate } from '../../refund-estimate/hooks';
import { useRefundEstimateContext } from '~/features/refund-estimate/context';

const MOCKED_LAST_YEAR_TAX_PAID = 1_000_000;

export default function ResultsPage() {
  const navigate = useNavigate();
  const { calculationResult } = useResultContext();
  const { setRefundResult } = useRefundEstimateContext();
  const refundMutation = useRefundEstimate();

  if (!calculationResult) {
    return <ErrorFallback resetErrorBoundary={() => navigate(ROUTES.start)} />;
  }

  const handleRefundEstimate = () => {
    refundMutation.mutate(
      {
        lastYearTaxPaid: MOCKED_LAST_YEAR_TAX_PAID,
        currentYearTax: calculationResult.totalTax,
      },
      {
        onSuccess: (data) => {
          setRefundResult(data);
          navigate(ROUTES.refundEstimate);
        },
      }
    );
  };

  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
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
              {refundMutation.isPending ? '처리 중...' : '환급액 찾기'}
            </Button>
          </DualCTAButton>
        </div>
      </div>
    </ErrorBoundary>
  );
}

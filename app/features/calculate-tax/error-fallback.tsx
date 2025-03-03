import { useNavigate } from "react-router";
import CTAButton from "~/components/CTAButton";
import Txt from "~/components/Txt";
import { ROUTES } from "~/routes";

export function ErrorFallback({
  resetErrorBoundary,
}: {
  resetErrorBoundary: () => void;
}) {
  const navigate = useNavigate();

  return (
    <div className="container">
      <Txt size="lg">계산 결과가 없습니다.</Txt>
      <CTAButton
        onClick={() => {
          resetErrorBoundary();
          navigate(ROUTES.start);
        }}
      >
        처음으로
      </CTAButton>
    </div>
  );
}

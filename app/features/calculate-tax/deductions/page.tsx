import { useState } from "react";
import { useNavigate } from "react-router";
import CTAButton from "~/components/CTAButton";
import TextInput from "~/components/TextInput";
import Txt from "~/components/Txt";
import {
  DEDUCTION_LABELS,
  DEDUCTIONS_INITIAL_STATE,
} from "~/features/calculate-tax/deductions/constants";
import { useCalculateTax } from "~/features/calculate-tax/hooks";
import { parseFormData } from "~/features/calculate-tax/deductions/validate";
import { ROUTES } from "~/routes";
import { useIncomeContext } from "../income/context";
import { useResultContext } from "../results/context";
import { useSaveTaxRecord } from "~/features/tax-record/hooks";
import { useUser } from "~/features/user/hooks";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorFallback } from "../error-fallback";

export default function DeductionsPage() {
  const navigate = useNavigate();

  const { income } = useIncomeContext();
  const { setCalculationResult } = useResultContext();

  const { data: user } = useUser();
  const { mutateAsync: calculateTax } = useCalculateTax();
  const { mutateAsync: saveTaxRecord } = useSaveTaxRecord();

  const [deductions, setDeductions] = useState(DEDUCTIONS_INITIAL_STATE);

  const handleDeductionChange = (key: string, value: string) => {
    setDeductions((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmitTaxForm = async (e: React.FormEvent) => {
    e.preventDefault();

    const validatedData = parseFormData(income, deductions);
    const { annualIncome } = validatedData;
    const result = await calculateTax(validatedData);
    const { totalTax, netSalary } = result;
    await saveTaxRecord({
      userId: user.id,
      annualIncome,
      totalTax,
      netSalary,
    });
    setCalculationResult(result);
    navigate(ROUTES.results);
  };

  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={() => navigate(ROUTES.start)}
    >
      <div className="container">
        <Txt size="lg" weight="bold">
          공제 항목을 입력해주세요
        </Txt>

        <form onSubmit={handleSubmitTaxForm} className="container">
          {Object.entries(deductions).map(([key, value]) => (
            <TextInput
              key={key}
              name={key}
              placeholder={DEDUCTION_LABELS[key]}
              type="money"
              value={value}
              onChange={(e) => handleDeductionChange(key, e.target.value)}
              autoFocus={key === "nationalPension"}
            />
          ))}

          <CTAButton type="submit">계산하기</CTAButton>
        </form>
      </div>
    </ErrorBoundary>
  );
}

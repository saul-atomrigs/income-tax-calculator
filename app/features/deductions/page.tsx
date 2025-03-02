import { useState } from "react";
import { useNavigate } from "react-router";
import CTAButton from "~/components/CTAButton";
import TextInput from "~/components/TextInput";
import Txt from "~/components/Txt";
import {
  DEDUCTION_LABELS,
  DEDUCTIONS_INITIAL_STATE,
} from "~/features/deductions/constants";
import { useResult } from "~/features/results/context";
import { useCalculateTax } from "~/features/calculate-tax/hooks";
import { useIncome } from "~/features/income/context";
import { parseFormData } from "~/features/deductions/validate";
import { ROUTES } from "~/routes";

export default function DeductionsPage() {
  const navigate = useNavigate();
  const { income } = useIncome();
  const { setCalculationResult } = useResult();
  const { mutateAsync: calculateTax } = useCalculateTax();
  const [deductions, setDeductions] = useState(DEDUCTIONS_INITIAL_STATE);

  const handleDeductionChange = (key: string, value: string) => {
    setDeductions((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmitTaxForm = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const validatedData = parseFormData(income, deductions);
      const result = await calculateTax(validatedData);
      setCalculationResult(result);
      navigate(ROUTES.results);
    } catch (error) {
      console.error("Calculation failed:", error);
    }
  };

  return (
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
  );
}

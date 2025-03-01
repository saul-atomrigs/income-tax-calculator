import { useNavigate } from "react-router";
import CTAButton from "~/components/CTAButton";
import TextInput from "~/components/TextInput";
import Txt from "~/components/Txt";
import { DEDUCTION_LABELS } from "~/features/deductions/constants";
import useDeductions from "~/features/deductions/hooks";
import { useResult } from "~/features/results/context";

export default function DeductionsPage() {
  const { deductions, handleDeductionChange, getTaxResults } = useDeductions();
  const { setCalculationResult } = useResult();
  const navigate = useNavigate();

  const handleCalculate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const calculationResult = await getTaxResults(e);
      if (calculationResult) {
        setCalculationResult(calculationResult);
        navigate("/results");
      }
    } catch (error) {
      console.error("Calculation failed:", error);
    }
  };

  return (
    <div className="container">
      <Txt size="lg" weight="bold">
        공제 항목을 입력해주세요
      </Txt>

      <form onSubmit={handleCalculate} className="container">
        {Object.entries(deductions).map(([key, value]) => (
          <TextInput
            key={key}
            name={key}
            label={DEDUCTION_LABELS[key]}
            type="number"
            value={value}
            onChange={(e) => handleDeductionChange(key, e.target.value)}
            placeholder="0"
          />
        ))}

        <CTAButton type="submit">계산하기</CTAButton>
      </form>
    </div>
  );
}

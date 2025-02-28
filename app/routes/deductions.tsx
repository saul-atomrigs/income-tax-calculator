import { useNavigate } from "react-router";
import CTAButton from "~/components/CTAButton";
import TextInput from "~/components/TextInput";
import Txt from "~/components/Txt";
import { useIncome } from "~/contexts/IncomeContext";
import { DEDUCTION_LABELS } from "~/features/deductions/constants";
import useDeductions from "~/features/deductions/hooks";

export default function DeductionsPage() {
  const { income } = useIncome();
  const { deductions, handleDeductionChange, handleSubmit, result } =
    useDeductions();
  const navigate = useNavigate();

  return (
    <div className="container">
      <Txt size="lg" weight="bold">
        공제 항목을 입력해주세요
      </Txt>

      <form onSubmit={handleSubmit} className="container">
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

        <CTAButton type="submit" onClick={() => navigate("/results")}>
          계산하기
        </CTAButton>
      </form>
    </div>
  );
}

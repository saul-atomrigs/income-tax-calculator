import CTAButton from "~/components/CTAButton";
import TextInput from "~/components/TextInput";
import Txt from "~/components/Txt";
import { useIncome } from "~/contexts/IncomeContext";
import useDeductions from "~/features/deductions/hooks";

export default function DeductionsPage() {
  const { income } = useIncome();
  const { deductions, handleDeductionChange, handleSubmit, result } =
    useDeductions();

  return (
    <>
      <Txt size="2xl" weight="bold" style={{ marginBottom: "1rem" }}>
        공제 항목
      </Txt>

      <Txt>연봉: {income}원</Txt>

      <form onSubmit={handleSubmit}>
        {Object.entries(deductions).map(([key, value]) => (
          <TextInput
            key={key}
            name={key}
            label={key}
            type="number"
            value={value}
            onChange={(e) => handleDeductionChange(key, e.target.value)}
            placeholder="0"
          />
        ))}

        <CTAButton type="submit">계산하기</CTAButton>
      </form>
    </>
  );
}

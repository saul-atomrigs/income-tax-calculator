import { useNavigate } from "react-router";
import { useState } from "react";
import CTAButton from "~/components/CTAButton";
import TextInput from "~/components/TextInput";
import Txt from "~/components/Txt";
import { DEDUCTION_LABELS } from "~/features/deductions/constants";
import { useCalculateTax } from "~/features/calculate-tax/hooks";
import { useResult } from "~/features/results/context";
import { useIncome } from "~/features/income/context";
import { taxCalculationSchema } from "./schemas";

export default function DeductionsPage() {
  const navigate = useNavigate();
  const { income } = useIncome();
  const { setCalculationResult } = useResult();
  const { calculateTaxAsync } = useCalculateTax();

  const [deductions, setDeductions] = useState({
    nationalPension: "",
    healthInsurance: "",
    employmentInsurance: "",
    otherDeductions: "",
  });

  const handleDeductionChange = (key: string, value: string) => {
    setDeductions((prev) => ({ ...prev, [key]: value }));
  };

  const handleTaxCalculate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const validatedData = taxCalculationSchema.parse({
        annualIncome: Number(income),
        deductions: {
          nationalPension: Number(deductions.nationalPension) || undefined,
          healthInsurance: Number(deductions.healthInsurance) || undefined,
          employmentInsurance:
            Number(deductions.employmentInsurance) || undefined,
          otherDeductions: Number(deductions.otherDeductions) || undefined,
        },
      });

      const result = await calculateTaxAsync(validatedData);
      setCalculationResult(result);
      navigate("/results");
    } catch (error) {
      console.error("Calculation failed:", error);
    }
  };

  return (
    <div className="container">
      <Txt size="lg" weight="bold">
        공제 항목을 입력해주세요
      </Txt>

      <form onSubmit={handleTaxCalculate} className="container">
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

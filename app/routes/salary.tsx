import { useNavigate } from "react-router";
import CTAButton from "~/components/CTAButton";
import TextInput from "~/components/TextInput";
import Txt from "~/components/Txt";
import useDeductions from "~/features/deductions/hooks";

export default function SalaryInputPage() {
  const {
    annualIncome,
    deductions,
    result,
    error,
    handleAnnualIncomeChange,
    handleDeductionChange,
    handleSubmit,
  } = useDeductions();
  const navigate = useNavigate();

  const handleClickNext = () => {
    navigate("/deductions");
  };

  return (
    <>
      <Txt size="2xl" weight="bold" style={{ marginBottom: "1rem" }}>
        세금 계산기
      </Txt>

      <form onSubmit={handleSubmit}>
        <TextInput
          name="annualIncome"
          label="연봉"
          type="number"
          value={annualIncome}
          onChange={(e) => handleAnnualIncomeChange(e.target.value)}
          placeholder="연봉을 입력하세요"
          required
        />

        <>
          <Txt size="xl" weight="semibold">
            공제 항목
          </Txt>

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
        </>

        <CTAButton type="submit" onClick={handleClickNext}>
          계산하기
        </CTAButton>
      </form>

      {error && (
        <div
          style={{
            marginTop: "1rem",
            padding: "1rem",
            backgroundColor: "#FEE2E2",
            borderRadius: "0.375rem",
          }}
        >
          <Txt style={{ color: "#DC2626" }}>{error.message}</Txt>
        </div>
      )}

      {result && (
        <div
          style={{
            marginTop: "1.5rem",
            padding: "1rem",
            backgroundColor: "#F3F4F6",
            borderRadius: "0.375rem",
          }}
        >
          <Txt size="xl" weight="semibold" style={{ marginBottom: "1rem" }}>
            계산 결과
          </Txt>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}
          >
            <Txt>소득세: {result.incomeTax.toLocaleString()}원</Txt>
            <Txt>주민세: {result.residentTax.toLocaleString()}원</Txt>
            <Txt>총 세금: {result.totalTax.toLocaleString()}원</Txt>
            <Txt weight="bold">
              실수령액: {result.netSalary.toLocaleString()}원
            </Txt>
          </div>
        </div>
      )}
    </>
  );
}

import { formatCurrency } from "~/utils";
import type { TaxCalculationResponse } from "~/remotes";
import ResultItem from "./item";

export default function ResultList(result: TaxCalculationResponse) {
  const { incomeTax, residentTax, totalTax, netSalary } = result;

  const resultItems = [
    { label: "소득세", value: incomeTax },
    { label: "주민세", value: residentTax },
    { label: "총 세금", value: totalTax },
    { label: "실수령액", value: netSalary, highlight: true },
  ];

  return (
    <>
      {resultItems.map((item) => (
        <ResultItem
          key={item.label}
          label={item.label}
          value={formatCurrency(item.value)}
          highlight={item.highlight}
        />
      ))}
    </>
  );
}

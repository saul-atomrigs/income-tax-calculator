import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useIncome } from "~/contexts/IncomeContext";
import { calculateTaxAPI } from "~/remotes";
import { taxCalculationSchema } from "./schemas";

export default function useDeductions() {
  const { income } = useIncome();
  const [deductions, setDeductions] = useState({
    nationalPension: "",
    healthInsurance: "",
    employmentInsurance: "",
    otherDeductions: "",
  });

  const {
    mutate: calculateTax,
    data: result,
    error,
  } = useMutation({
    mutationFn: calculateTaxAPI,
    onError: (err) => {
      console.error("Tax calculation failed:", err);
    },
  });

  const handleDeductionChange = (key: string, value: string) => {
    setDeductions((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
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

      const result = await calculateTaxAPI(validatedData);
      return result;
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  return {
    deductions,
    error,
    handleDeductionChange,
    handleSubmit,
  };
}

import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { calculateTaxAPI } from "~/remotes";
import { taxCalculationSchema } from "./schemas";

export default function useDeductions() {
  const [annualIncome, setAnnualIncome] = useState("");
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

  const handleAnnualIncomeChange = (value: string) => {
    setAnnualIncome(value);
  };

  const handleDeductionChange = (key: string, value: string) => {
    setDeductions((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const validatedData = taxCalculationSchema.parse({
        annualIncome: Number(annualIncome),
        deductions: {
          nationalPension: Number(deductions.nationalPension) || undefined,
          healthInsurance: Number(deductions.healthInsurance) || undefined,
          employmentInsurance:
            Number(deductions.employmentInsurance) || undefined,
          otherDeductions: Number(deductions.otherDeductions) || undefined,
        },
      });

      calculateTax(validatedData);
    } catch (err) {
      console.error(err);
    }
  };

  return {
    annualIncome,
    deductions,
    result,
    error,
    handleAnnualIncomeChange,
    handleDeductionChange,
    handleSubmit,
  };
}

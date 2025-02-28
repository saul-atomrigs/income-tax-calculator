import { z } from "zod";

export const taxCalculationSchema = z.object({
  annualIncome: z.number().min(0, "연봉은 0보다 커야 합니다"),
  deductions: z
    .object({
      nationalPension: z.number().min(0).optional(),
      healthInsurance: z.number().min(0).optional(),
      employmentInsurance: z.number().min(0).optional(),
      otherDeductions: z.number().min(0).optional(),
    })
    .optional(),
});

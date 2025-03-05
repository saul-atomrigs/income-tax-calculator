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

export type TaxCalculationInput = z.infer<typeof taxCalculationSchema>;

export function parseFormData(
  income: string,
  deductions: Record<string, string>
) {
  return taxCalculationSchema.parse({
    annualIncome: Number(income),
    deductions: {
      nationalPension: Number(deductions.nationalPension) || undefined,
      healthInsurance: Number(deductions.healthInsurance) || undefined,
      employmentInsurance: Number(deductions.employmentInsurance) || undefined,
      otherDeductions: Number(deductions.otherDeductions) || undefined,
    },
  });
}

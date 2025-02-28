import { http, HttpResponse } from "msw";
import { z } from "zod";

// Zod schemas
const taxCalculationSchema = z.object({
  annualIncome: z.number(),
  deductions: z
    .object({
      nationalPension: z.number().optional(),
      healthInsurance: z.number().optional(),
      employmentInsurance: z.number().optional(),
      otherDeductions: z.number().optional(),
    })
    .optional(),
});

const refundEstimateSchema = z.object({
  lastYearTaxPaid: z.number(),
  currentYearTax: z.number(),
});

const taxRecordSchema = z.object({
  userId: z.string(),
  annualIncome: z.number(),
  totalTax: z.number(),
  netSalary: z.number(),
});

export const handlers = [
  http.get("/user", () => {
    return HttpResponse.json({
      id: "test-id",
      firstName: "안",
      lastName: "이솔",
    });
  }),

  // 1️⃣ 연봉 입력 및 세금 계산
  http.post("/api/calculate-tax", async ({ request }) => {
    const parsedResult = taxCalculationSchema.safeParse(await request.json());

    if (!parsedResult.success) {
      return new HttpResponse("Invalid request data", { status: 400 });
    }

    const { annualIncome, deductions } = parsedResult.data;

    const incomeTax = annualIncome * 0.1;
    const residentTax = incomeTax * 0.1;
    const totalTax =
      incomeTax + residentTax + (deductions?.nationalPension || 0);
    const netSalary = annualIncome - totalTax;

    return HttpResponse.json({
      incomeTax,
      residentTax,
      totalTax,
      netSalary,
    });
  }),

  // 2️⃣ 예상 세금 환급 계산
  http.post("/api/refund-estimate", async ({ request }) => {
    const parsedResult = refundEstimateSchema.safeParse(await request.json());

    if (!parsedResult.success) {
      return new HttpResponse("Invalid request data", { status: 400 });
    }

    const { lastYearTaxPaid, currentYearTax } = parsedResult.data;
    const refundAmount = lastYearTaxPaid - currentYearTax;

    return HttpResponse.json({
      refundAmount,
      message: `You may get a refund of ${refundAmount} KRW.`,
    });
  }),

  // 3️⃣ 세금 계산 기록 저장
  http.post("/api/save-tax-record", async ({ request }) => {
    const parsedResult = taxRecordSchema.safeParse(await request.json());

    if (!parsedResult.success) {
      return new HttpResponse("Invalid request data", { status: 400 });
    }

    const { userId, annualIncome, totalTax, netSalary } = parsedResult.data;

    return HttpResponse.json(
      {
        recordId: "mock-record-id",
        message: "Tax record saved successfully.",
      },
      { status: 201 }
    );
  }),

  // 4️⃣ 세금 계산 기록 불러오기
  http.get("/api/tax-records", async () => {
    return HttpResponse.json([
      {
        recordId: "mock1",
        annualIncome: 50000000,
        totalTax: 9750000,
        netSalary: 40250000,
        timestamp: "2025-02-24T10:00:00Z",
      },
      {
        recordId: "mock2",
        annualIncome: 60000000,
        totalTax: 12000000,
        netSalary: 48000000,
        timestamp: "2024-12-15T15:30:00Z",
      },
    ]);
  }),

  // 5️⃣ 계산 결과 PDF 다운로드 (Mock 파일)
  http.get("/api/download-pdf", async () => {
    return new HttpResponse(
      new Blob(["Mock PDF Data"], { type: "application/pdf" }),
      {
        headers: {
          "Content-Type": "application/pdf",
        },
      }
    );
  }),
];

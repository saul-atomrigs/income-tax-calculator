import { http, HttpResponse } from "msw";
import { z } from "zod";
import { LiveStorage } from "@mswjs/storage";
import { nanoid } from "nanoid";
import type { TaxRecord } from "~/remotes";

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

const taxRecords = new LiveStorage<TaxRecord[]>("taxRecords", []);

export const handlers = [
  http.get("/user", () => {
    return HttpResponse.json({
      id: nanoid(),
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

  /**
   * 2️⃣ 예상 세금 환급 계산
   * /api/calculate-tax의 totalTax 값이 /api/refund-estimate의 currentYearTax에 해당함.
   * lastYearTaxPaid 값은 작년에 낸 실제 세금이므로, 별도로 기록된 데이터를 가져와야 함.
   */
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

    taxRecords.update((prevRecords) =>
      prevRecords.concat({
        userId,
        annualIncome,
        totalTax,
        netSalary,
      })
    );

    return HttpResponse.json(
      {
        recordId: nanoid(),
        message: "Tax record saved successfully.",
      },
      { status: 201 }
    );
  }),

  // 4️⃣ 세금 계산 기록 불러오기
  http.get("/api/tax-records", async () => {
    return HttpResponse.json(taxRecords.getValue());
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

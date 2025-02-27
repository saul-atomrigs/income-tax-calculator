import axios from "axios";

// Types
export interface User {
  id: string;
  firstName: string;
  lastName: string;
}

export interface Deductions {
  nationalPension?: number;
  healthInsurance?: number;
  employmentInsurance?: number;
  otherDeductions?: number;
}

export interface TaxCalculationRequest {
  annualIncome: number;
  deductions?: Deductions;
}

export interface TaxCalculationResponse {
  incomeTax: number;
  residentTax: number;
  totalTax: number;
  netSalary: number;
}

export interface RefundEstimateRequest {
  lastYearTaxPaid: number;
  currentYearTax: number;
}

export interface RefundEstimateResponse {
  refundAmount: number;
  message: string;
}

export interface TaxRecord {
  userId: string;
  annualIncome: number;
  totalTax: number;
  netSalary: number;
}

export interface SaveTaxRecordResponse {
  recordId: string;
  message: string;
}

export interface TaxRecordHistory {
  recordId: string;
  annualIncome: number;
  totalTax: number;
  netSalary: number;
  timestamp: string;
}

// API Functions
export async function getUserAPI(): Promise<User> {
  const response = await axios.get<User>("/user");
  return response.data;
}

export async function calculateTaxAPI(
  data: TaxCalculationRequest
): Promise<TaxCalculationResponse> {
  const response = await axios.post<TaxCalculationResponse>(
    "/api/calculate-tax",
    data
  );
  return response.data;
}

export async function getRefundEstimateAPI(
  data: RefundEstimateRequest
): Promise<RefundEstimateResponse> {
  const response = await axios.post<RefundEstimateResponse>(
    "/api/refund-estimate",
    data
  );
  return response.data;
}

export async function saveTaxRecordAPI(
  data: TaxRecord
): Promise<SaveTaxRecordResponse> {
  const response = await axios.post<SaveTaxRecordResponse>(
    "/api/save-tax-record",
    data
  );
  return response.data;
}

export async function getTaxRecordsAPI(): Promise<TaxRecordHistory[]> {
  const response = await axios.get<TaxRecordHistory[]>("/api/tax-records");
  return response.data;
}

export async function downloadTaxPdfAPI(): Promise<Blob> {
  const response = await axios.get("/api/download-pdf", {
    responseType: "blob",
  });
  return response.data;
}

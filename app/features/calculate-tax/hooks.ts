import { useMutation } from "@tanstack/react-query";
import {
  calculateTaxAPI,
  type TaxCalculationRequest,
  type TaxCalculationResponse,
} from "../../remotes";

export function useCalculateTax() {
  return useMutation<TaxCalculationResponse, Error, TaxCalculationRequest>({
    mutationFn: (data: TaxCalculationRequest) => calculateTaxAPI(data),
    onError: (error) => {
      console.error("Tax calculation failed:", error);
    },
  });
}

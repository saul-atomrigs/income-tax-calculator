import { useMutation } from "@tanstack/react-query";
import {
  calculateTaxAPI,
  type TaxCalculationRequest,
  type TaxCalculationResponse,
} from "../../remotes";

export const useCalculateTax = () => {
  const mutation = useMutation<
    TaxCalculationResponse,
    Error,
    TaxCalculationRequest
  >({
    mutationFn: calculateTaxAPI,
    onError: (error) => {
      console.error("Tax calculation failed:", error);
    },
  });

  const { mutate, mutateAsync, isPending, error, data, reset } = mutation;

  return {
    calculateTax: mutate,
    calculateTaxAsync: mutateAsync,
    isLoading: isPending,
    error: error?.message ?? null,
    result: data,
    reset: reset,
  };
};

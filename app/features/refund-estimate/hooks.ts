import { useMutation } from "@tanstack/react-query";
import { useRefundEstimateContext } from "./context";
import {
  getRefundEstimateAPI,
  type RefundEstimateRequest,
  type RefundEstimateResponse,
} from "~/remotes";

export function useRefundEstimate() {
  const { setRefundResult } = useRefundEstimateContext();

  return useMutation({
    mutationFn: async (
      params: RefundEstimateRequest
    ): Promise<RefundEstimateResponse> => {
      const request: RefundEstimateRequest = {
        lastYearTaxPaid: params.lastYearTaxPaid,
        currentYearTax: params.currentYearTax,
      };

      const response = await getRefundEstimateAPI(request);

      return response;
    },
    onSuccess: (data) => {
      setRefundResult(data);
    },
  });
}

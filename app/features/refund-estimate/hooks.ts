import { useMutation } from "@tanstack/react-query";
import {
  getRefundEstimateAPI,
  type RefundEstimateRequest,
  type RefundEstimateResponse,
} from "../../remotes";

export function useRefundEstimate() {
  return useMutation<RefundEstimateResponse, Error, RefundEstimateRequest>({
    mutationFn: (data: RefundEstimateRequest) => getRefundEstimateAPI(data),
  });
}

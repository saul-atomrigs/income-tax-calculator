import { createContext, useContext, useState, type ReactNode } from "react";
import type { RefundEstimateResponse } from "~/remotes";

type RefundEstimateContextType = {
  refundResult: RefundEstimateResponse | null;
  setRefundResult: (result: RefundEstimateResponse) => void;
  clearRefundResult: () => void;
};

const RefundEstimateContext = createContext<
  RefundEstimateContextType | undefined
>(undefined);

export function RefundEstimateProvider({ children }: { children: ReactNode }) {
  const [refundResult, setRefundResultState] =
    useState<RefundEstimateResponse | null>(null);

  const setRefundResult = (result: RefundEstimateResponse) => {
    setRefundResultState(result);
  };

  const clearRefundResult = () => {
    setRefundResultState(null);
  };

  return (
    <RefundEstimateContext.Provider
      value={{ refundResult, setRefundResult, clearRefundResult }}
    >
      {children}
    </RefundEstimateContext.Provider>
  );
}

export function useRefundEstimateContext() {
  const context = useContext(RefundEstimateContext);
  if (context === undefined) {
    throw new Error(
      "useRefundEstimateContext must be used within a RefundEstimateProvider"
    );
  }
  return context;
}

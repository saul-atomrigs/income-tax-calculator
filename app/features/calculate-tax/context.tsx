import { createContext, useContext } from "react";
import { IncomeProvider } from "./income/context";
import { ResultProvider } from "./results/context";
import { RefundEstimateProvider } from "../refund-estimate/context";

const TaxContext = createContext(null);

export const TaxProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <TaxContext.Provider value={null}>
      <IncomeProvider>
        <ResultProvider>
          <RefundEstimateProvider>{children}</RefundEstimateProvider>
        </ResultProvider>
      </IncomeProvider>
    </TaxContext.Provider>
  );
};

export const useTaxContext = () => {
  const context = useContext(TaxContext);
  if (!context) {
    throw new Error("useFinance must be used within a TaxProvider");
  }
  return context;
};

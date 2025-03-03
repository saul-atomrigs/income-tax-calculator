import { createContext, useContext, useState } from "react";
import type { TaxCalculationResponse } from "~/remotes";

type ResultContextType = {
  calculationResult: TaxCalculationResponse | null;
  setCalculationResult: (result: TaxCalculationResponse | null) => void;
};

const ResultContext = createContext<ResultContextType | null>(null);

export function ResultProvider({ children }: { children: React.ReactNode }) {
  const [calculationResult, setCalculationResult] =
    useState<TaxCalculationResponse | null>(null);

  return (
    <ResultContext.Provider value={{ calculationResult, setCalculationResult }}>
      {children}
    </ResultContext.Provider>
  );
}

export function useResultContext() {
  const context = useContext(ResultContext);
  if (!context) {
    throw new Error("useResultContext must be used within ResultProvider");
  }
  return context;
}

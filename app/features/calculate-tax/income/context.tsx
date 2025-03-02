import { createContext, useContext, useState } from "react";

type IncomeContextType = {
  income: string;
  setIncome: (income: string) => void;
};

const IncomeContext = createContext<IncomeContextType | undefined>(undefined);

export function IncomeProvider({ children }: { children: React.ReactNode }) {
  const [income, setIncome] = useState("");

  return (
    <IncomeContext.Provider value={{ income, setIncome }}>
      {children}
    </IncomeContext.Provider>
  );
}

export function useIncome() {
  const context = useContext(IncomeContext);
  if (!context) {
    throw new Error("useIncome must be used within an IncomeProvider");
  }
  return context;
}

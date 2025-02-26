import { createContext, useContext, useEffect, useState } from "react";
import { initMockAPI } from "../mocks";

interface MockContextType {
  isMockReady: boolean;
}

const MockContext = createContext<MockContextType | undefined>(undefined);

export function MockProvider({ children }: { children: React.ReactNode }) {
  const [isMockReady, setIsMockReady] = useState(false);

  useEffect(() => {
    const init = async () => {
      await initMockAPI();
      setIsMockReady(true);
    };
    init();
  }, []);

  if (!isMockReady) {
    return <div>Initializing...</div>;
  }

  return (
    <MockContext.Provider value={{ isMockReady }}>
      {children}
    </MockContext.Provider>
  );
}

export function useMock() {
  const context = useContext(MockContext);
  if (context === undefined) {
    throw new Error("useMock must be used within a MockProvider");
  }
  return context;
}

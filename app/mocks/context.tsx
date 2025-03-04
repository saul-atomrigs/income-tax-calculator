import { createContext, useContext, useEffect, useState } from "react";
import { initMockAPI } from ".";
import Loading from "~/components/Loading";

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
    return <Loading message="데이터 불러오는 중..." />;
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

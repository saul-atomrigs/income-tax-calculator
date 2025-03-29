import type { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RefundEstimateProvider } from './features/refund-estimate/context';

// Add any other providers your app uses

const queryClient = new QueryClient();

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <RefundEstimateProvider>{children}</RefundEstimateProvider>
    </QueryClientProvider>
  );
}

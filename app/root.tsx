import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Suspense, useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Links, Meta, Outlet, Scripts, ScrollRestoration } from 'react-router';

import type { Route } from './+types/root';
import './app.css';
import { Error } from './components/Error';
import { Loading } from './components/Loading';
import { MockProvider } from './mocks/context';
import { UserProvider } from './features/user/context';
import { TaxProvider } from './features/calculate-tax/context';

export const links: Route.LinksFunction = () => [
  { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
  {
    rel: 'preconnect',
    href: 'https://fonts.gstatic.com',
    crossOrigin: 'anonymous',
  },
  {
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap',
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <QueryClientProvider client={queryClient}>
        <Suspense fallback={<Loading message="Loading..." />}>
          <MockProvider>
            <UserProvider>
              <TaxProvider>
                <Outlet />
              </TaxProvider>
            </UserProvider>
          </MockProvider>
        </Suspense>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

function ErrorFallback({ error }: { error: Error }) {
  return <Error message={error.message} />;
}

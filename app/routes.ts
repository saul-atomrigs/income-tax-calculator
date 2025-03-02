import { type RouteConfig, index, route } from '@react-router/dev/routes';

export default [
  index('features/start/page.tsx'),

  route('income', 'features/income/page.tsx'),
  route('deductions', 'features/deductions/page.tsx'),
  route('results', 'features/results/page.tsx'),
] satisfies RouteConfig;

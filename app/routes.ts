import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("features/start/page.tsx"),

  route("income", "features/calculate-tax/income/page.tsx"),
  route("deductions", "features/calculate-tax/deductions/page.tsx"),
  route("results", "features/calculate-tax/results/page.tsx"),
  route("refund-estimate", "features/refund-estimate/page.tsx"),
] satisfies RouteConfig;

export const ROUTES = {
  start: "/",
  income: "/income",
  deductions: "/deductions",
  results: "/results",
  refundEstimate: "/refund-estimate",
};

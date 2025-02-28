import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),

  route("income", "routes/income.tsx"),
  route("deductions", "routes/deductions.tsx"),
  route("results", "routes/results.tsx"),
] satisfies RouteConfig;

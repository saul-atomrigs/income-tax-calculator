import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),

  route("salary", "routes/salary.tsx"),
  route("deductions", "routes/deductions.tsx"),
] satisfies RouteConfig;

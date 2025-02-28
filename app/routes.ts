import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),

  route("salary-input", "routes/salary-input.tsx"),
] satisfies RouteConfig;

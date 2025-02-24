interface TxtProps {
  children: React.ReactNode;
  weight?: "normal" | "medium" | "semibold" | "bold";
  size?: "xs" | "sm" | "base" | "lg" | "xl" | "2xl";
  style?: React.CSSProperties;
}

const sizeMap = {
  xs: "0.75rem",
  sm: "0.875rem",
  base: "1rem",
  lg: "1.125rem",
  xl: "1.25rem",
  "2xl": "1.5rem",
};

const weightMap = {
  normal: "400",
  medium: "500",
  semibold: "600",
  bold: "700",
};

export default function Txt({
  children,
  weight = "normal",
  size = "base",
  style,
}: TxtProps) {
  return (
    <div
      style={{
        fontSize: sizeMap[size],
        fontWeight: weightMap[weight],
        ...style,
      }}
    >
      {children}
    </div>
  );
}

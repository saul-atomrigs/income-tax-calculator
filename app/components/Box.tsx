import { colors, spacing } from "./design-tokens";

interface BoxProps {
  children: React.ReactNode;
  bg?: string;
  padding?: string;
  onClick?: () => void;
  align?: "center" | "left" | "right";
  style?: React.CSSProperties;
}

export default function Box({
  children,
  bg = colors.white,
  padding = "1rem",
  onClick,
  align = "left",
  style,
}: BoxProps) {
  return (
    <div
      onClick={onClick}
      style={{
        background: bg,
        padding,
        borderRadius: `${spacing.tiny}`,
        boxShadow: `0 1px 3px rgba(0, 0, 0, 0.1)`,
        transition: "transform 0.2s ease",
        cursor: onClick ? "pointer" : "default",
        display: "flex",
        flexDirection: "column",
        alignItems: align === "center" ? "center" : "flex-start",
        ...style,
      }}
      onMouseOver={(e) => {
        if (onClick) {
          e.currentTarget.style.transform = "scale(1.02)";
        }
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.transform = "none";
      }}
    >
      {children}
    </div>
  );
}

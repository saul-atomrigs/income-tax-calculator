import { spacing } from "./design-tokens";
import { colors } from "./design-tokens";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary";
  fullWidth?: boolean;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  style?: React.CSSProperties;
}

export default function Button({
  children,
  variant = "primary",
  fullWidth = false,
  onClick,
  disabled = false,
  type = "button",
  style,
}: ButtonProps) {
  const bgColor =
    variant === "primary" ? colors["primary-500"] : colors["secondary-500"];
  const hoverBgColor =
    variant === "primary" ? colors["primary-600"] : colors["secondary-600"];

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      type={type}
      style={{
        backgroundColor: bgColor,
        color: "white",
        padding: `${spacing.small} ${spacing.large}`,
        borderRadius: `${spacing.tiny}`,
        border: "none",
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.7 : 1,
        width: fullWidth ? "100%" : "auto",
        transition: "background-color 0.2s ease",
        ...style,
      }}
      onMouseOver={(e) => {
        if (!disabled) {
          e.currentTarget.style.backgroundColor = hoverBgColor;
        }
      }}
      onMouseOut={(e) => {
        if (!disabled) {
          e.currentTarget.style.backgroundColor = bgColor;
        }
      }}
    >
      {children}
    </button>
  );
}

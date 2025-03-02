import Button from "./Button";
import { colors } from "./design-tokens/colors";

interface CTAButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  variant?: "single" | "dual";
  secondaryText?: React.ReactNode;
  onSecondaryClick?: () => void;
  secondaryDisabled?: boolean;
  secondaryType?: "button" | "submit" | "reset";
}

export default function CTAButton({
  children,
  onClick,
  disabled,
  type = "button",
  variant = "single",
  secondaryText,
  onSecondaryClick,
  secondaryDisabled,
  secondaryType = "button",
}: CTAButtonProps) {
  return (
    <div className="cta-button-container">
      {variant === "single" ? (
        <Button fullWidth onClick={onClick} disabled={disabled} type={type}>
          {children}
        </Button>
      ) : (
        <div className="dual-button-container">
          <Button
            fullWidth
            onClick={onSecondaryClick}
            disabled={secondaryDisabled}
            type={secondaryType}
            style={{ backgroundColor: colors["secondary-500"] }}
          >
            {secondaryText}
          </Button>
          <Button fullWidth onClick={onClick} disabled={disabled} type={type}>
            {children}
          </Button>
        </div>
      )}
      <style>{`
        .cta-button-container {
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 1rem;
        }
        .dual-button-container {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.75rem;
        }
      `}</style>
    </div>
  );
}

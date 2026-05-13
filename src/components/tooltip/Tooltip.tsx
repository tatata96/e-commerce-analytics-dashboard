import { useState } from "react";

type TooltipVariant = "default" | "light";

type TooltipProps = {
  label: string;
  children: React.ReactNode;
  variant?: TooltipVariant;
};

const variantStyles: Record<TooltipVariant, { bubble: string; arrow: string }> = {
  default: {
    bubble: "bg-accent text-text-light",
    arrow: "border-r-accent",
  },
  light: {
    bubble: "bg-card-bg text-text shadow-card",
    arrow: "border-r-card-bg",
  },
};

export default function Tooltip({ label, children, variant = "default" }: TooltipProps) {
  const [visible, setVisible] = useState(false);
  const styles = variantStyles[variant];

  return (
    <div
      className="relative flex items-center"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      {children}

      <div
        role="tooltip"
        className={`
          absolute left-full ml-3 px-3 py-1.5 rounded-lg whitespace-nowrap
          pointer-events-none z-50 transition-all duration-200
          type-caption ${styles.bubble}
          ${visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-1"}
        `}
      >
        {label}
        <div className={`absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent ${styles.arrow}`} />
      </div>
    </div>
  );
}

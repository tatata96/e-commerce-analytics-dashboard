import { useState } from "react";
import { VARIANT_STYLES } from "./Tooltip.constants";
import type { TooltipProps } from "./Tooltip.types";

export default function Tooltip({ label, children, variant = "default" }: TooltipProps) {
  const [visible, setVisible] = useState(false);
  const styles = VARIANT_STYLES[variant];

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

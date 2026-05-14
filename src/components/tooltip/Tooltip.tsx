import { useState } from "react";
import { VARIANT_STYLES } from "./Tooltip.constants";
import type { TooltipProps } from "./Tooltip.types";

export default function Tooltip({ label, children, variant = "default", placement = "right" }: TooltipProps) {
  const [visible, setVisible] = useState(false);
  const styles = VARIANT_STYLES[variant];

  const bubblePosition =
    placement === "right" ? "left-full ml-3" :
    placement === "left"  ? "right-full mr-3" :
                            "top-full mt-2 left-1/2 -translate-x-1/2";

  const bubbleAnimation =
    placement === "right"  ? (visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-1") :
    placement === "left"   ? (visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-1") :
                             (visible ? "opacity-100 translate-y-0"  : "opacity-0 translate-y-1");

  const arrowPosition =
    placement === "right" ? `right-full top-1/2 -translate-y-1/2 ${styles.arrowRight}` :
    placement === "left"  ? `left-full top-1/2 -translate-y-1/2 ${styles.arrowLeft}` :
                            `bottom-full left-1/2 -translate-x-1/2 ${styles.arrowBottom}`;

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
          absolute px-3 py-1.5 rounded-lg max-w-48
          pointer-events-none z-50 transition-all duration-200
          type-caption ${styles.bubble}
          ${bubblePosition} ${bubbleAnimation}
        `}
      >
        {label}
        <div className={`absolute border-4 border-transparent ${arrowPosition}`} />
      </div>
    </div>
  );
}

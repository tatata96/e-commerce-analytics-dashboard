import type { TooltipVariant } from "./Tooltip.types";

export const VARIANT_STYLES: Record<TooltipVariant, { bubble: string; arrow: string }> = {
  default: {
    bubble: "bg-accent text-text-light",
    arrow: "border-r-accent",
  },
  light: {
    bubble: "bg-card-bg text-text shadow-card",
    arrow: "border-r-card-bg",
  },
};

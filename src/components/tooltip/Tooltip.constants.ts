import type { TooltipVariant } from "./Tooltip.types";

export const VARIANT_STYLES: Record<TooltipVariant, { bubble: string; arrowRight: string; arrowLeft: string; arrowBottom: string }> = {
  default: {
    bubble: "bg-accent text-text-light",
    arrowRight: "border-r-accent",
    arrowLeft: "border-l-accent",
    arrowBottom: "border-b-accent",
  },
  light: {
    bubble: "bg-card-bg text-text shadow-card",
    arrowRight: "border-r-card-bg",
    arrowLeft: "border-l-card-bg",
    arrowBottom: "border-b-card-bg",
  },
};

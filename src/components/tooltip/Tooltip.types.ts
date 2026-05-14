export type TooltipVariant = "default" | "light";

export type TooltipPlacement = "right" | "left" | "bottom";

export type TooltipProps = {
  label: string;
  children: React.ReactNode;
  variant?: TooltipVariant;
  placement?: TooltipPlacement;
};

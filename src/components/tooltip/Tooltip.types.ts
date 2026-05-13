export type TooltipVariant = "default" | "light";

export type TooltipProps = {
  label: string;
  children: React.ReactNode;
  variant?: TooltipVariant;
};

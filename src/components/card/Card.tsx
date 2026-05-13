import { type ReactNode } from "react";
import { Info } from "lucide-react";
import Tooltip from "@/components/tooltip/Tooltip";

type CardProps = {
  title?: string;
  tooltip?: string;
  className?: string;
  children: ReactNode;
};

export default function Card({ title, tooltip, className, children }: CardProps) {
  return (
    <div className={`${className} rounded-2xl bg-card-bg p-6 shadow-card`}>
      {title && (
        <div className="mb-6 flex items-center gap-2">
          <h2 className="type-title text-text">{title}</h2>

          {tooltip && (
            <Tooltip label={tooltip} variant="light">
              <Info size={16} className="cursor-help text-text-muted" />
            </Tooltip>
          )}
        </div>
      )}

      {children}
    </div>
  );
}

import { type ReactNode } from "react";
import { Info } from "lucide-react";
import Tooltip from "@/components/tooltip/Tooltip";

type CardProps = {
  title?: string;
  tooltip?: string;
  className?: string;
  fill?: boolean;
  children: ReactNode;
};

export default function Card({ title, tooltip, className, fill, children }: CardProps) {
  return (
    <div className={`${className} w-full rounded-2xl bg-card-bg p-6 ${fill ? "flex flex-col" : ""}`}>
      {title && (
        <div className={`flex items-center gap-2 ${fill ? "shrink-0 mb-6" : "mb-6"}`}>
          <h2 className="type-title text-text">{title}</h2>

          {tooltip && (
            <Tooltip label={tooltip} variant="light" placement="bottom">
              <Info size={16} className="cursor-help text-text-muted" />
            </Tooltip>
          )}
        </div>
      )}

      {fill ? <div className="flex-1 min-h-0 ">{children}</div> : children}
    </div>
  );
}

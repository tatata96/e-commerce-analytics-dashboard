import { useState } from "react";

type TooltipProps = {
  label: string;
  children: React.ReactNode;
};

export default function Tooltip({ label, children }: TooltipProps) {
  const [visible, setVisible] = useState(false);

  return (
    <div
      className={"relative flex items-center"}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      {children}

      <div
        role="tooltip"
        className={`
          absolute left-full ml-3 px-3 py-1.5 rounded-lg whitespace-nowrap
          pointer-events-none z-50 transition-all duration-200
          bg-accent shadow-xl type-caption text-text-light
          ${visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-1"}
        `}
      >
        {label}
        <div className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-background" />
      </div>
    </div>
  );
}

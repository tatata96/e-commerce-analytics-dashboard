import { ITEMS, ACTIVE_CLASS } from "./StatusToggle.constants";
import type { StatusToggleProps } from "./StatusToggle.types";

export type { Status } from "./StatusToggle.types";

export default function StatusToggle({ value, onChange }: StatusToggleProps) {
  return (
    <div className="flex items-center bg-card-bg rounded-full p-1 gap-0.5 shadow-card">
      {ITEMS.map((item) => {
        const isActive = value === item.value;

        return (
          <button
            key={item.value}
            onClick={() => onChange(item.value)}
            className={`px-3 py-1 rounded-full text-sm font-semibold transition-colors cursor-pointer ${
              isActive ? ACTIVE_CLASS[item.value] : "text-text-muted hover:text-text"
            }`}
          >
            {item.label}
          </button>
        );
      })}
    </div>
  );
}

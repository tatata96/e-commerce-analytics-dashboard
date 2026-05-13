import { AlertTriangle } from "lucide-react";

interface ChartErrorProps {
  error: string;
  height?: number | string;
}

export default function ChartError({ error, height }: ChartErrorProps) {
  return (
    <div
      className="flex flex-col items-center justify-center gap-3"
      style={{ height: height ?? "100%" }}
    >
      <div className="flex items-center justify-center rounded-full bg-danger/10 p-4">
        <AlertTriangle className="text-danger" size={24} />
      </div>

      <span className="text-sm text-text-muted">{error}</span>
    </div>
  );
}

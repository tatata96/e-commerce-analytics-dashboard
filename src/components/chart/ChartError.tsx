import { AlertCircle } from "lucide-react";

interface ChartErrorProps {
  error: string;
  height: number | string;
}

export default function ChartError({ error, height }: ChartErrorProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-2" style={{ height }}>
      <AlertCircle className="text-danger" size={24} />
      <span className="text-sm text-text-muted">{error}</span>
    </div>
  );
}

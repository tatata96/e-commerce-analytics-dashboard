import type { Status } from "./StatusToggle.types";

export const ITEMS: Array<{ value: Status; label: string }> = [
  { value: "success", label: "success" },
  { value: "pending", label: "pending" },
  { value: "error", label: "error" },
];

export const ACTIVE_CLASS: Record<Status, string> = {
  success: "bg-success text-text-light",
  pending: "bg-warning text-text-light",
  error: "bg-danger text-text-light",
};

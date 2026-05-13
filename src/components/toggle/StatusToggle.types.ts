export type Status = "success" | "pending" | "error";

export type StatusToggleProps = {
  value: Status;
  onChange: (value: Status) => void;
};

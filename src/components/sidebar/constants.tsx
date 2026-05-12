import {
  LayoutGrid,
  CalendarDays,
  BarChart2,
  FileText,
  MessageSquare,
  Settings,
} from "lucide-react";

export type NavItem = {
  id: string;
  icon: React.ReactNode;
  label: string;
};

export const navItems: NavItem[] = [
  { id: "dashboard", icon: <LayoutGrid size={20} />, label: "Dashboard" },
  { id: "calendar", icon: <CalendarDays size={20} />, label: "Calendar" },
  { id: "analytics", icon: <BarChart2 size={20} />, label: "Analytics" },
  { id: "reports", icon: <FileText size={20} />, label: "Reports" },
  { id: "messages", icon: <MessageSquare size={20} />, label: "Messages" },
];

export const bottomItems: NavItem[] = [
  { id: "settings", icon: <Settings size={20} />, label: "Settings" },
];

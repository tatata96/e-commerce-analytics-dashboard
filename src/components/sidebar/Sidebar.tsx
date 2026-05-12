import { useState } from "react";
import Tooltip from "@/components/tooltip/Tooltip";
import MobileNav from "@/components/sidebar/MobileNav";
import { navItems, bottomItems, type NavItem } from "@/components/sidebar/constants";

type NavButtonProps = {
  item: NavItem;
  isActive: boolean;
  onClick: () => void;
  badge?: number;
};

function AvatarButton() {
  return (
    <Tooltip label="Tamara K.">
      <button
        aria-label="User profile"
        className="w-10 h-10 rounded-3xl overflow-hidden ring-2 ring-text/10 hover:ring-text/30 transition-all duration-200 cursor-pointer"
      >
        <div className="w-full h-full bg-accent flex items-center justify-center text-text type-caption">
          T
        </div>
      </button>
    </Tooltip>
  );
}

function NavButton({ item, isActive, onClick, badge }: NavButtonProps) {
  return (
    <Tooltip label={item.label}>
      <button
        onClick={onClick}
        aria-label={item.label}
        className={`
          relative flex items-center justify-center w-11 h-11 rounded-3xl
          transition-all duration-200 cursor-pointer
          ${
            isActive
              ? "bg-white text-background shadow-md shadow-text/10"
              : "text-text-muted hover:bg-text/10 hover:text-white"
          }
        `}
      >
        {item.icon}

        {badge !== undefined && badge > 0 && (
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-danger" />
        )}
      </button>
    </Tooltip>
  );
}

export default function Sidebar() {
  const [activeId, setActiveId] = useState("dashboard");

  return (
    <>
      <aside className="hidden md:flex flex-col items-center w-[72px] h-[calc(100vh-2rem)] my-4 ml-4 py-5 gap-2 bg-sidebar rounded-[100px] sticky top-4 shrink-0 shadow-2xl shadow-black/20">
        <div className="flex items-center justify-center w-11 h-11 rounded-3xl mb-3 shrink-0">
          <img src="/logo.svg" alt="Logo" className="w-10 h-10 object-contain" />
        </div>

        <div className="w-8 h-px bg-text/8 mb-1" />

        <nav className="flex flex-col items-center gap-1 flex-1">
          {navItems.map((item) => (
            <NavButton
              key={item.id}
              item={item}
              isActive={activeId === item.id}
              onClick={() => setActiveId(item.id)}
              badge={item.id === "messages" ? 3 : undefined}
            />
          ))}
        </nav>

        <div className="w-8 h-px bg-text/8 my-1" />

        <div className="flex flex-col items-center gap-1">
          {bottomItems.map((item) => (
            <NavButton
              key={item.id}
              item={item}
              isActive={activeId === item.id}
              onClick={() => setActiveId(item.id)}
            />
          ))}
        </div>

        <AvatarButton />
      </aside>

      <MobileNav activeId={activeId} setActiveId={setActiveId} />
    </>
  );
}

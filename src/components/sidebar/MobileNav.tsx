import { navItems, bottomItems } from "@/components/sidebar/constants";

type MobileNavProps = {
  activeId: string;
  setActiveId: (id: string) => void;
};

export default function MobileNav({ activeId, setActiveId }: MobileNavProps) {
  const allItems = [...navItems, ...bottomItems];

  return (
    <nav className="fixed bottom-0 left-0 right-0 flex md:hidden bg-sidebar px-3 pt-2 pb-6 z-50 shadow-[0_-1px_0_0_rgba(255,255,255,0.05)]">
      {allItems.map((item) => (
        <button
          key={item.id}
          onClick={() => setActiveId(item.id)}
          aria-label={item.label}
          className={`relative flex-1 flex flex-col items-center gap-1 py-1.5 rounded-2xl transition-all duration-200 cursor-pointer
            ${activeId === item.id ? "text-text-light" : "text-text-muted"}`}
        >
          <span
            className={`relative flex items-center justify-center w-9 h-7 rounded-xl transition-all duration-200
            ${activeId === item.id ? "bg-text/10" : ""}`}
          >
            {item.icon}

            {item.id === "messages" && (
              <span className="absolute top-0.5 right-0.5 w-1.5 h-1.5 rounded-full bg-danger" />
            )}
          </span>

          <span className={`type-caption ${activeId === item.id ? "text-text-light" : ""}`}>
            {item.label}
          </span>
        </button>
      ))}
    </nav>
  );
}

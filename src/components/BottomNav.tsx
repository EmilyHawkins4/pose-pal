import { Link, useLocation } from "react-router-dom";
import { Layers, Brain, ListOrdered } from "lucide-react";

const navItems = [
  { to: "/", icon: Layers, label: "Browse", match: ["/", "/pose"] },
  { to: "/sequence", icon: ListOrdered, label: "Sequence", match: ["/sequence"] },
  { to: "/learn", icon: Brain, label: "Learn", match: ["/learn", "/flashcards", "/quiz", "/roots"] },
];

export default function BottomNav() {
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-lg border-t border-border safe-area-bottom">
      <div className="flex items-center justify-around h-16 max-w-lg mx-auto">
        {navItems.map(({ to, icon: Icon, label, match }) => {
          const active = match.some((m) =>
            m === "/" ? location.pathname === "/" : location.pathname.startsWith(m)
          );
          return (
            <Link
              key={to}
              to={to}
              className={`flex flex-col items-center gap-0.5 px-3 py-1 transition-colors ${
                active ? "text-primary" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Icon className="w-5 h-5" strokeWidth={active ? 2.5 : 1.5} />
              <span className="text-[10px] font-body font-medium">{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

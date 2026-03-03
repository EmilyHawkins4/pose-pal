import { Link, useLocation } from "react-router-dom";
import { Home, Search, Layers, Brain } from "lucide-react";

const navItems = [
  { to: "/", icon: Home, label: "Home" },
  { to: "/browse", icon: Layers, label: "Browse" },
  { to: "/search", icon: Search, label: "Search" },
  { to: "/learn", icon: Brain, label: "Learn" },
];

export default function BottomNav() {
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-lg border-t border-border safe-area-bottom">
      <div className="flex items-center justify-around h-16 max-w-lg mx-auto">
        {navItems.map(({ to, icon: Icon, label }) => {
          const active = location.pathname === to || (to !== "/" && location.pathname.startsWith(to));
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

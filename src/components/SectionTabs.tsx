import { Link, useLocation } from "react-router-dom";

export interface SectionTab {
  to: string;
  label: string;
}

interface Props {
  tabs: SectionTab[];
  className?: string;
}

/**
 * Segmented control / tab row for in-page section navigation.
 * Used at the top of hub pages (Asanas, Vocab) to switch between
 * Browse / Flashcards / Quiz sub-views.
 */
export default function SectionTabs({ tabs, className = "" }: Props) {
  const location = useLocation();
  return (
    <div
      className={`inline-flex items-center gap-1 p-1 rounded-full bg-muted ${className}`}
      role="tablist"
    >
      {tabs.map((t) => {
        const active = location.pathname === t.to;
        return (
          <Link
            key={t.to}
            to={t.to}
            role="tab"
            aria-selected={active}
            className={`px-3.5 py-1.5 rounded-full text-sm font-body font-medium transition-all whitespace-nowrap ${
              active
                ? "bg-background text-foreground shadow-soft"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {t.label}
          </Link>
        );
      })}
    </div>
  );
}

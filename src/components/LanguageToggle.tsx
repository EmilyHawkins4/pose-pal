import type { DisplayLanguage } from "@/hooks/useLanguagePreference";

interface LanguageToggleProps {
  language: DisplayLanguage;
  onChange: (lang: DisplayLanguage) => void;
}

const options: { value: DisplayLanguage; label: string }[] = [
  { value: "english", label: "EN" },
  { value: "both", label: "Both" },
  { value: "sanskrit", label: "SA" },
];

export default function LanguageToggle({ language, onChange }: LanguageToggleProps) {
  return (
    <div className="inline-flex items-center gap-1 bg-muted rounded-full p-1">
      {options.map(({ value, label }) => (
        <button
          key={value}
          onClick={() => onChange(value)}
          className={`px-3.5 py-1.5 text-sm font-body font-medium rounded-full transition-all whitespace-nowrap ${
            language === value
              ? "bg-background text-foreground shadow-soft"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}

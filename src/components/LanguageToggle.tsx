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
    <div className="flex items-center gap-0.5 bg-muted rounded-full p-0.5">
      {options.map(({ value, label }) => (
        <button
          key={value}
          onClick={() => onChange(value)}
          className={`px-3 py-1 text-xs font-body font-medium rounded-full transition-all ${
            language === value
              ? "bg-primary text-primary-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}

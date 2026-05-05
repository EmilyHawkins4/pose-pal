import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { poses } from "@/data/poses";
import { sanskritRoots } from "@/data/sanskritRoots";
import { CheckCircle2, XCircle, RotateCcw, Trophy, ArrowLeft, Star, Search, Lightbulb } from "lucide-react";
import { useBookmarks } from "@/hooks/useBookmarks";
import { useStarredRoots } from "@/hooks/useStarredRoots";

function normalize(s: string): string {
  return s.normalize("NFD").replace(/\p{Mn}/gu, "").toLowerCase().trim();
}

interface SearchAnswerProps {
  candidates: string[];
  onSelect: (value: string) => void;
  disabled: boolean;
  selected: string | null;
  correctAnswer: string;
  placeholder?: string;
}

function SearchAnswer({ candidates, onSelect, disabled, selected, correctAnswer, placeholder }: SearchAnswerProps) {
  const [query, setQuery] = useState("");
  const filtered = useMemo(() => {
    const q = normalize(query);
    if (!q) return [];
    return candidates.filter((c) => normalize(c).includes(q)).slice(0, 6);
  }, [query, candidates]);

  return (
    <div className="max-w-sm mx-auto">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
        <input
          type="text"
          value={disabled ? selected ?? query : query}
          onChange={(e) => setQuery(e.target.value)}
          disabled={disabled}
          placeholder={placeholder ?? "Type to search…"}
          className="w-full pl-9 pr-3 py-3 rounded-xl bg-card shadow-soft font-body text-sm focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-70"
          autoFocus
        />
      </div>
      {!disabled && filtered.length > 0 && (
        <div className="mt-2 space-y-1.5">
          {filtered.map((option) => (
            <button
              key={option}
              onClick={() => onSelect(option)}
              className="w-full px-4 py-2.5 rounded-lg bg-card shadow-soft hover:shadow-card text-left font-body text-sm text-foreground transition-all"
            >
              {option}
            </button>
          ))}
        </div>
      )}
      {disabled && (
        <div className="mt-3 space-y-2">
          {selected && selected !== correctAnswer && (
            <div className="px-4 py-3 rounded-xl bg-destructive/10 text-destructive font-body text-sm flex items-center justify-between">
              <span>Your answer: {selected}</span>
              <XCircle className="w-5 h-5 flex-shrink-0" />
            </div>
          )}
          <div className="px-4 py-3 rounded-xl bg-sage-light text-primary ring-2 ring-primary font-body text-sm flex items-center justify-between">
            <span>{correctAnswer}</span>
            <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
          </div>
        </div>
      )}
    </div>
  );
}

function shuffleArray<T>(arr: T[]): T[] {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export type QuizMode =
  | "image-to-english"
  | "image-to-sanskrit"
  | "english-to-sanskrit"
  | "sanskrit-to-english"
  | "english-to-image"
  | "sanskrit-to-image"
  | "mixed-no-images"
  | "mixed-all"
  | "roots-sanskrit-to-meaning"
  | "roots-meaning-to-sanskrit"
  | "roots-mixed";

interface ImageOption {
  image: string;
  poseId: string;
}

interface QuizQuestion {
  poseId?: string;
  rootId?: string;
  image?: string;
  promptOverride?: string;
  correctAnswer: string; // for text options: the text; for image options: the poseId
  options: string[]; // text labels OR poseIds when imageOptions=true
  imageOptions?: boolean;
  type: QuizMode;
}

function findExamplePosesForRoot(rootId: string): typeof poses {
  const root = sanskritRoots.find((r) => r.id === rootId);
  if (!root) return [];
  const needle = normalize(root.simple);
  const matches = poses.filter((p) => normalize(p.sanskritName).includes(needle));
  return matches.slice(0, 3);
}

interface ModeMeta {
  id: QuizMode;
  title: string;
  description: string;
  group: "asanas" | "roots";
}

const ALL_MODES: ModeMeta[] = [
  { id: "image-to-english", title: "Picture ↔ English", description: "See the pose, name it in English", group: "asanas" },
  { id: "image-to-sanskrit", title: "Picture ↔ Sanskrit", description: "See the pose, name it in Sanskrit", group: "asanas" },
  { id: "english-to-sanskrit", title: "English ↔ Sanskrit", description: "Translate between English and Sanskrit", group: "asanas" },
  { id: "mixed-all", title: "Mixed (everything)", description: "Every possible combination", group: "asanas" },
  { id: "roots-sanskrit-to-meaning", title: "Root → Meaning", description: "What does this Sanskrit root mean?", group: "roots" },
  { id: "roots-meaning-to-sanskrit", title: "Meaning → Root", description: "What's the Sanskrit for this meaning?", group: "roots" },
  { id: "roots-mixed", title: "Mixed roots", description: "Both directions", group: "roots" },
];

function generateQuiz(mode: QuizMode, count: number = 10, starredIds?: string[]): QuizQuestion[] {
  // Roots quizzes
  if (mode.startsWith("roots-")) {
    const pool = starredIds && starredIds.length > 0
      ? sanskritRoots.filter((r) => starredIds.includes(r.id))
      : sanskritRoots;
    if (pool.length === 0) return [];
    const shuffled = shuffleArray(pool);
    const selected = shuffled.slice(0, Math.min(count, shuffled.length));
    return selected.map((root) => {
      const others = shuffleArray(sanskritRoots.filter((r) => r.id !== root.id)).slice(0, 3);
      let actual = mode;
      if (mode === "roots-mixed") {
        const opts = ["roots-sanskrit-to-meaning", "roots-meaning-to-sanskrit"] as const;
        actual = opts[Math.floor(Math.random() * opts.length)];
      }
      if (actual === "roots-sanskrit-to-meaning") {
        const correctAnswer = root.meaning;
        return {
          rootId: root.id,
          promptOverride: `What does "${root.sanskrit}" mean?`,
          correctAnswer,
          options: shuffleArray([correctAnswer, ...others.map((r) => r.meaning)]),
          type: actual,
        };
      } else {
        const correctAnswer = root.sanskrit;
        return {
          rootId: root.id,
          promptOverride: `Which Sanskrit root means "${root.meaning}"?`,
          correctAnswer,
          options: shuffleArray([correctAnswer, ...others.map((r) => r.sanskrit)]),
          type: actual,
        };
      }
    });
  }

  const pool = starredIds && starredIds.length > 0
    ? poses.filter((p) => starredIds.includes(p.id))
    : poses;
  if (pool.length === 0) return [];
  const shuffled = shuffleArray(pool);
  const selected = shuffled.slice(0, Math.min(count, shuffled.length));

  return selected.map((pose) => {
    let type: QuizMode;
    if (mode === "mixed-all") {
      const all = [
        "image-to-english",
        "image-to-sanskrit",
        "english-to-sanskrit",
        "sanskrit-to-english",
        "english-to-image",
        "sanskrit-to-image",
      ] as const;
      type = all[Math.floor(Math.random() * all.length)];
    } else if (mode === "mixed-no-images") {
      const textOnly = ["english-to-sanskrit", "sanskrit-to-english"] as const;
      type = textOnly[Math.floor(Math.random() * textOnly.length)];
    } else if (mode === "english-to-sanskrit") {
      // bidirectional text-only: English ↔ Sanskrit
      type = Math.random() < 0.5 ? "english-to-sanskrit" : "sanskrit-to-english";
    } else if (mode === "image-to-english") {
      // bidirectional image ↔ English only (no Sanskrit)
      type = Math.random() < 0.5 ? "image-to-english" : "english-to-image";
    } else if (mode === "image-to-sanskrit") {
      // bidirectional image ↔ Sanskrit only (no English)
      type = Math.random() < 0.5 ? "image-to-sanskrit" : "sanskrit-to-image";
    } else {
      type = mode;
    }

    const others = shuffleArray(poses.filter((p) => p.id !== pose.id)).slice(0, 3);

    // Image-answer questions
    if (type === "english-to-image" || type === "sanskrit-to-image") {
      return {
        poseId: pose.id,
        correctAnswer: pose.id,
        options: shuffleArray([pose.id, ...others.map((p) => p.id)]),
        imageOptions: true,
        type,
      };
    }

    let correctAnswer: string;
    let distractors: string[];

    if (type === "image-to-english" || type === "sanskrit-to-english") {
      correctAnswer = pose.englishName;
      distractors = others.map((p) => p.englishName);
    } else {
      // image-to-sanskrit or english-to-sanskrit
      correctAnswer = pose.sanskritName;
      distractors = others.map((p) => p.sanskritName);
    }

    return {
      poseId: pose.id,
      image: pose.image,
      correctAnswer,
      options: shuffleArray([correctAnswer, ...distractors]),
      type,
    };
  });
}

interface Props {
  scope: "asanas" | "roots";
}

/** Quiz content (no page chrome). Filtered to asana or root modes. */
export default function QuizContent({ scope }: Props) {
  const [mode, setMode] = useState<QuizMode | null>(null);
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [answered, setAnswered] = useState(false);
  const [starredOnly, setStarredOnly] = useState(false);
  const [hintShown, setHintShown] = useState(false);
  const [hintsUsed, setHintsUsed] = useState(0);

  const { bookmarks } = useBookmarks();
  const { starred: starredRoots } = useStarredRoots();
  const starredCount = scope === "asanas" ? bookmarks.length : starredRoots.length;

  const startQuiz = (m: QuizMode) => {
    const ids = scope === "asanas" ? bookmarks : starredRoots;
    const qs = generateQuiz(m, 10, starredOnly ? ids : undefined);
    if (qs.length === 0) return;
    setMode(m);
    setQuestions(qs);
    setCurrentQ(0);
    setSelected(null);
    setScore(0);
    setFinished(false);
    setAnswered(false);
    setHintShown(false);
    setHintsUsed(0);
  };

  const backToModes = () => {
    setMode(null);
    setQuestions([]);
    setFinished(false);
  };

  if (!mode) {
    const modes = ALL_MODES.filter((m) => m.group === scope);
    const insufficientStarred = starredOnly && starredCount === 0;
    return (
      <div className="px-5">
        <div className="flex items-center justify-between mb-3 gap-2">
          <p className="font-body text-sm text-muted-foreground">Choose how you'd like to practice</p>
          <button
            onClick={() => setStarredOnly((s) => !s)}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-body font-medium transition-colors whitespace-nowrap ${
              starredOnly
                ? "bg-accent text-accent-foreground"
                : "bg-muted text-muted-foreground hover:text-foreground"
            }`}
            aria-pressed={starredOnly}
            aria-label="Toggle starred only"
          >
            <Star className={`w-3.5 h-3.5 ${starredOnly ? "fill-current" : ""}`} />
            Starred only
          </button>
        </div>
        {starredOnly && (
          <p className="font-body text-xs text-muted-foreground mb-3">
            {starredCount === 0
              ? `No starred ${scope === "asanas" ? "poses" : "roots"} yet. Star some from Browse first.`
              : `Quizzing on ${starredCount} starred ${scope === "asanas" ? "pose" : "root"}${
                  starredCount === 1 ? "" : "s"
                }.`}
          </p>
        )}
        <div className="space-y-3">
          {modes.map((m) => (
            <motion.button
              key={m.id}
              whileTap={{ scale: 0.98 }}
              onClick={() => startQuiz(m.id)}
              disabled={insufficientStarred}
              className={`w-full flex items-center gap-4 p-4 rounded-2xl bg-card shadow-soft hover:shadow-card transition-all text-left ${
                insufficientStarred ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              <div className="flex-1 min-w-0">
                <p className="font-display text-lg font-semibold text-foreground">{m.title}</p>
                <p className="font-body text-xs text-muted-foreground mt-0.5">{m.description}</p>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    );
  }

  const question = questions[currentQ];
  const pose = poses.find((p) => p.id === question?.poseId);

  const handleSelect = (option: string) => {
    if (answered) return;
    setSelected(option);
    setAnswered(true);
    if (option === question.correctAnswer) {
      setScore((s) => s + 1);
    }
  };

  const handleNext = () => {
    if (currentQ + 1 >= questions.length) {
      setFinished(true);
    } else {
      setCurrentQ((q) => q + 1);
      setSelected(null);
      setAnswered(false);
      setHintShown(false);
    }
  };

  const handleShowHint = () => {
    if (hintShown || answered) return;
    setHintShown(true);
    setHintsUsed((n) => n + 1);
  };

  const getHint = (): { label: string; kind: "text" | "image"; value: string } | null => {
    if (!pose) return null;
    switch (question.type) {
      case "image-to-english":
        return { label: "Hint · Sanskrit name", kind: "text", value: pose.sanskritName };
      case "image-to-sanskrit":
        return { label: "Hint · English name", kind: "text", value: pose.englishName };
      case "sanskrit-to-english":
      case "english-to-sanskrit":
        return { label: "Hint · Picture", kind: "image", value: pose.image };
      case "english-to-image":
        return { label: "Hint · Sanskrit name", kind: "text", value: pose.sanskritName };
      case "sanskrit-to-image":
        return { label: "Hint · English name", kind: "text", value: pose.englishName };
      default:
        return null;
    }
  };

  if (finished) {
    const pct = Math.round((score / questions.length) * 100);
    return (
      <div className="flex flex-col items-center justify-center px-5 py-12">
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center">
          <Trophy className="w-16 h-16 text-accent mx-auto mb-4" />
          <h2 className="font-display text-4xl font-bold">{pct}%</h2>
          <p className="font-body text-muted-foreground mt-1">
            {score} out of {questions.length} correct · {hintsUsed} hint{hintsUsed === 1 ? "" : "s"} used
          </p>
          <p className="font-display text-lg mt-3">
            {pct >= 80 ? "Amazing!" : pct >= 50 ? "Good effort!" : "Keep practicing!"}
          </p>
          <div className="flex gap-3 justify-center mt-6">
            <button
              onClick={() => startQuiz(mode)}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-body font-medium"
            >
              <RotateCcw className="w-4 h-4" /> Try Again
            </button>
            <button onClick={backToModes} className="px-6 py-3 rounded-xl bg-muted text-foreground font-body font-medium">
              Change Mode
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  const showImage = question.type === "image-to-english" || question.type === "image-to-sanskrit";
  const imageOptions = !!question.imageOptions;

  const getPromptText = () => {
    if (question.promptOverride) return question.promptOverride;
    if (question.type === "english-to-sanskrit") return `What is "${pose?.englishName}" in Sanskrit?`;
    if (question.type === "sanskrit-to-english") return `What is "${pose?.sanskritName}" in English?`;
    if (question.type === "image-to-sanskrit") return "What is the Sanskrit name?";
    if (question.type === "english-to-image") return `Which pose is "${pose?.englishName}"?`;
    if (question.type === "sanskrit-to-image") return `Which pose is "${pose?.sanskritName}"?`;
    return "What is the English name?";
  };

  return (
    <div>
      <div className="px-5 pb-2">
        <div className="flex items-center justify-between mb-2">
          <button
            onClick={backToModes}
            className="flex items-center gap-1 font-body text-sm text-muted-foreground hover:text-foreground"
            aria-label="Back to quiz modes"
          >
            <ArrowLeft className="w-4 h-4" /> Modes
          </button>
          <span className="font-body text-sm text-muted-foreground">
            {currentQ + 1}/{questions.length}
          </span>
        </div>
        <div className="h-1 bg-muted rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-primary rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${((currentQ + (answered ? 1 : 0)) / questions.length) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      <div className="px-5 mt-4">
        <AnimatePresence mode="wait">
          <motion.div key={currentQ} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            {showImage && (
              <div className="w-28 h-28 mx-auto rounded-2xl bg-sage-light flex items-center justify-center mb-3 p-3">
                <img src={question.image} alt="Yoga pose" className="max-h-full max-w-full object-contain" />
              </div>
            )}
            <p className="font-display text-lg font-semibold text-center mb-3">{getPromptText()}</p>

            {imageOptions ? (
              <div className="grid grid-cols-4 gap-2 max-w-2xl mx-auto">
                {question.options.map((option) => {
                  const isCorrect = option === question.correctAnswer;
                  const isSelected = option === selected;
                  let optionStyle = "bg-card shadow-soft hover:shadow-card text-foreground";
                  if (answered) {
                    if (isCorrect) optionStyle = "bg-sage-light text-primary ring-2 ring-primary";
                    else if (isSelected && !isCorrect)
                      optionStyle = "bg-destructive/10 text-destructive ring-2 ring-destructive";
                    else optionStyle = "bg-muted text-muted-foreground opacity-60";
                  }
                  const optPose = poses.find((p) => p.id === option);
                  return (
                    <button
                      key={option}
                      onClick={() => handleSelect(option)}
                      disabled={answered}
                      className={`relative aspect-square rounded-xl p-2 flex items-center justify-center transition-all ${optionStyle}`}
                      aria-label={optPose?.englishName}
                    >
                      <img
                        src={optPose?.image}
                        alt={optPose?.englishName ?? "Pose option"}
                        className="max-h-full max-w-full object-contain"
                      />
                      {answered && isCorrect && (
                        <CheckCircle2 className="absolute top-1 right-1 w-4 h-4 text-primary" />
                      )}
                      {answered && isSelected && !isCorrect && (
                        <XCircle className="absolute top-1 right-1 w-4 h-4 text-destructive" />
                      )}
                    </button>
                  );
                })}
              </div>
            ) : (
              (() => {
                let candidates: string[] = [];
                let placeholder = "Type to search…";
                if (question.type === "image-to-english" || question.type === "sanskrit-to-english") {
                  candidates = poses.map((p) => p.englishName);
                  placeholder = "Search English names…";
                } else if (question.type === "image-to-sanskrit" || question.type === "english-to-sanskrit") {
                  candidates = poses.map((p) => p.sanskritName);
                  placeholder = "Search Sanskrit names…";
                } else if (question.type === "roots-sanskrit-to-meaning") {
                  candidates = sanskritRoots.map((r) => r.meaning);
                  placeholder = "Search meanings…";
                } else if (question.type === "roots-meaning-to-sanskrit") {
                  candidates = sanskritRoots.map((r) => r.sanskrit);
                  placeholder = "Search Sanskrit roots…";
                }
                return (
                  <SearchAnswer
                    candidates={candidates}
                    onSelect={handleSelect}
                    disabled={answered}
                    selected={selected}
                    correctAnswer={question.correctAnswer}
                    placeholder={placeholder}
                  />
                );
              })()
            )}

            {(() => {
              const hint = getHint();
              if (!hint) return null;
              return (
                <div className="max-w-sm mx-auto mt-4 flex flex-col items-center">
                  {!hintShown ? (
                    <button
                      onClick={handleShowHint}
                      disabled={answered}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-body font-medium transition-colors ${
                        answered
                          ? "bg-muted text-muted-foreground opacity-60 cursor-not-allowed"
                          : "bg-accent/20 text-accent-foreground hover:bg-accent/30"
                      }`}
                      aria-label="Show hint"
                    >
                      <Lightbulb className="w-3.5 h-3.5" /> Show hint
                    </button>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="w-full rounded-xl border border-dashed border-accent/50 bg-accent/10 px-4 py-2 flex flex-col items-center gap-1.5"
                    >
                      <div className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-wide font-body font-medium text-muted-foreground">
                        <Lightbulb className="w-3 h-3 fill-current text-accent" /> {hint.label}
                      </div>
                      {hint.kind === "image" ? (
                        <div className="w-20 h-20 rounded-lg bg-background/60 flex items-center justify-center p-1.5">
                          <img src={hint.value} alt="Hint" className="max-h-full max-w-full object-contain opacity-90" />
                        </div>
                      ) : (
                        <p className="font-display text-base text-foreground">{hint.value}</p>
                      )}
                    </motion.div>
                  )}
                </div>
              );
            })()}

            {answered && (
              <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="mt-4 text-center">
                <button
                  onClick={handleNext}
                  className="px-8 py-3 rounded-xl bg-primary text-primary-foreground font-body font-medium"
                >
                  {currentQ + 1 >= questions.length ? "See Results" : "Next Question"}
                </button>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

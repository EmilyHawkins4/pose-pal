import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { poses } from "@/data/poses";
import { sanskritRoots } from "@/data/sanskritRoots";
import BottomNav from "@/components/BottomNav";
import { CheckCircle2, XCircle, RotateCcw, Trophy, ArrowLeft } from "lucide-react";

function shuffleArray<T>(arr: T[]): T[] {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

type QuizMode =
  | "image-to-english"
  | "image-to-sanskrit"
  | "english-to-sanskrit"
  | "sanskrit-to-english"
  | "mixed-no-images"
  | "mixed-all"
  | "roots-sanskrit-to-meaning"
  | "roots-meaning-to-sanskrit"
  | "roots-devanagari-to-meaning";

interface QuizQuestion {
  poseId?: string;
  image?: string;
  promptOverride?: string;
  correctAnswer: string;
  options: string[];
  type: QuizMode;
}

const QUIZ_MODES: { id: QuizMode; title: string; description: string; emoji: string; group: "asanas" | "roots" }[] = [
  { id: "image-to-english", title: "Picture → English", description: "See the pose, name it in English", emoji: "🖼️", group: "asanas" },
  { id: "image-to-sanskrit", title: "Picture → Sanskrit", description: "See the pose, name it in Sanskrit", emoji: "🧘", group: "asanas" },
  { id: "english-to-sanskrit", title: "English → Sanskrit", description: "Translate English to Sanskrit", emoji: "🔤", group: "asanas" },
  { id: "sanskrit-to-english", title: "Sanskrit → English", description: "Translate Sanskrit to English", emoji: "📖", group: "asanas" },
  { id: "mixed-no-images", title: "Mixed (text only)", description: "Names only, no pictures", emoji: "✍️", group: "asanas" },
  { id: "mixed-all", title: "Mixed (everything)", description: "All asana question types", emoji: "🎲", group: "asanas" },
  { id: "roots-sanskrit-to-meaning", title: "Root → Meaning", description: "What does this Sanskrit root mean?", emoji: "🌱", group: "roots" },
  { id: "roots-meaning-to-sanskrit", title: "Meaning → Root", description: "What's the Sanskrit for this meaning?", emoji: "🪷", group: "roots" },
  { id: "roots-devanagari-to-meaning", title: "Devanāgarī → Meaning", description: "Recognize the script and name the meaning", emoji: "🕉️", group: "roots" },
];

function generateQuiz(mode: QuizMode, count: number = 10): QuizQuestion[] {
  // Roots quizzes
  if (
    mode === "roots-sanskrit-to-meaning" ||
    mode === "roots-meaning-to-sanskrit" ||
    mode === "roots-devanagari-to-meaning"
  ) {
    const shuffled = shuffleArray(sanskritRoots);
    const selected = shuffled.slice(0, Math.min(count, shuffled.length));
    return selected.map((root) => {
      const others = shuffleArray(sanskritRoots.filter((r) => r.id !== root.id)).slice(0, 3);
      if (mode === "roots-sanskrit-to-meaning") {
        const correctAnswer = root.meaning;
        const distractors = others.map((r) => r.meaning);
        return {
          promptOverride: `What does "${root.sanskrit}" mean?`,
          correctAnswer,
          options: shuffleArray([correctAnswer, ...distractors]),
          type: mode,
        };
      } else if (mode === "roots-devanagari-to-meaning") {
        const correctAnswer = root.meaning;
        const distractors = others.map((r) => r.meaning);
        return {
          promptOverride: `What does "${root.devanagari}" (${root.sanskrit}) mean?`,
          correctAnswer,
          options: shuffleArray([correctAnswer, ...distractors]),
          type: mode,
        };
      } else {
        const correctAnswer = root.sanskrit;
        const distractors = others.map((r) => r.sanskrit);
        return {
          promptOverride: `Which Sanskrit root means "${root.meaning}"?`,
          correctAnswer,
          options: shuffleArray([correctAnswer, ...distractors]),
          type: mode,
        };
      }
    });
  }

  const shuffled = shuffleArray(poses);
  const selected = shuffled.slice(0, Math.min(count, shuffled.length));

  return selected.map((pose) => {
    let type: QuizMode;
    if (mode === "mixed-all") {
      const all = ["image-to-english", "image-to-sanskrit", "english-to-sanskrit", "sanskrit-to-english"] as const;
      type = all[Math.floor(Math.random() * all.length)];
    } else if (mode === "mixed-no-images") {
      const textOnly = ["english-to-sanskrit", "sanskrit-to-english"] as const;
      type = textOnly[Math.floor(Math.random() * textOnly.length)];
    } else {
      type = mode;
    }

    let correctAnswer: string;
    let distractors: string[];
    const others = shuffleArray(poses.filter((p) => p.id !== pose.id)).slice(0, 3);

    if (type === "image-to-english" || type === "sanskrit-to-english") {
      correctAnswer = pose.englishName;
      distractors = others.map((p) => p.englishName);
    } else {
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

export default function Quiz() {
  const [mode, setMode] = useState<QuizMode | null>(null);
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [answered, setAnswered] = useState(false);

  const startQuiz = (m: QuizMode) => {
    setMode(m);
    setQuestions(generateQuiz(m));
    setCurrentQ(0);
    setSelected(null);
    setScore(0);
    setFinished(false);
    setAnswered(false);
  };

  const backToModes = () => {
    setMode(null);
    setQuestions([]);
    setFinished(false);
  };

  // Mode selection screen
  if (!mode) {
    const asanaModes = QUIZ_MODES.filter((m) => m.group === "asanas");
    const rootModes = QUIZ_MODES.filter((m) => m.group === "roots");
    const renderBtn = (m: typeof QUIZ_MODES[number]) => (
      <motion.button
        key={m.id}
        whileTap={{ scale: 0.98 }}
        onClick={() => startQuiz(m.id)}
        className="w-full flex items-center gap-4 p-4 rounded-2xl bg-card shadow-soft hover:shadow-card transition-all text-left"
      >
        <div className="w-12 h-12 rounded-xl bg-sage-light flex items-center justify-center text-2xl flex-shrink-0">
          {m.emoji}
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-display text-lg font-semibold text-foreground">{m.title}</p>
          <p className="font-body text-xs text-muted-foreground mt-0.5">{m.description}</p>
        </div>
      </motion.button>
    );
    return (
      <div className="min-h-screen pb-24">
        <div className="px-5 pt-12 pb-4">
          <h1 className="font-display text-3xl font-bold">Quiz</h1>
          <p className="font-body text-sm text-muted-foreground mt-1">Choose how you'd like to practice</p>
        </div>
        <div className="px-5 mt-2">
          <h2 className="font-display text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-2">Asanas</h2>
          <div className="space-y-3">{asanaModes.map(renderBtn)}</div>
          <h2 className="font-display text-sm font-semibold text-muted-foreground uppercase tracking-wide mt-6 mb-2">Sanskrit Roots</h2>
          <div className="space-y-3">{rootModes.map(renderBtn)}</div>
        </div>
        <BottomNav />
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
    }
  };

  if (finished) {
    const pct = Math.round((score / questions.length) * 100);
    return (
      <div className="min-h-screen pb-20 flex flex-col items-center justify-center px-5">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center"
        >
          <Trophy className="w-16 h-16 text-accent mx-auto mb-4" />
          <h1 className="font-display text-4xl font-bold">{pct}%</h1>
          <p className="font-body text-muted-foreground mt-1">
            {score} out of {questions.length} correct
          </p>
          <p className="font-display text-lg mt-3">
            {pct >= 80 ? "Amazing! 🎉" : pct >= 50 ? "Good effort! 💪" : "Keep practicing! 🧘"}
          </p>
          <div className="flex gap-3 justify-center mt-6">
            <button
              onClick={() => startQuiz(mode)}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-body font-medium"
            >
              <RotateCcw className="w-4 h-4" /> Try Again
            </button>
            <button
              onClick={backToModes}
              className="px-6 py-3 rounded-xl bg-muted text-foreground font-body font-medium"
            >
              Change Mode
            </button>
          </div>
        </motion.div>
        <BottomNav />
      </div>
    );
  }

  const showImage = question.type === "image-to-english" || question.type === "image-to-sanskrit";

  const getPromptText = () => {
    if (question.promptOverride) return question.promptOverride;
    if (question.type === "english-to-sanskrit") return `What is "${pose?.englishName}" in Sanskrit?`;
    if (question.type === "sanskrit-to-english") return `What is "${pose?.sanskritName}" in English?`;
    if (question.type === "image-to-sanskrit") return "What is the Sanskrit name?";
    return "What is the English name?";
  };

  return (
    <div className="min-h-screen pb-20">
      <div className="px-5 pt-12 pb-4">
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
          <motion.div
            key={currentQ}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            {showImage && (
              <div className="w-40 h-40 mx-auto rounded-2xl bg-sage-light flex items-center justify-center mb-4 p-4">
                <img src={question.image} alt="Yoga pose" className="max-h-full max-w-full object-contain" />
              </div>
            )}
            <p className="font-display text-xl font-semibold text-center mb-6">{getPromptText()}</p>

            <div className="space-y-3 max-w-sm mx-auto">
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

                return (
                  <button
                    key={option}
                    onClick={() => handleSelect(option)}
                    disabled={answered}
                    className={`w-full px-4 py-3.5 rounded-xl font-body text-sm font-medium text-left transition-all flex items-center justify-between ${optionStyle}`}
                  >
                    <span>{option}</span>
                    {answered && isCorrect && <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />}
                    {answered && isSelected && !isCorrect && (
                      <XCircle className="w-5 h-5 text-destructive flex-shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>

            {answered && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 text-center"
              >
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

      <BottomNav />
    </div>
  );
}

import { useState, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { poses } from "@/data/poses";
import BottomNav from "@/components/BottomNav";
import { CheckCircle2, XCircle, RotateCcw, Trophy } from "lucide-react";

function shuffleArray<T>(arr: T[]): T[] {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

interface QuizQuestion {
  poseId: string;
  emoji: string;
  correctAnswer: string;
  options: string[];
  type: "image-to-english" | "image-to-sanskrit" | "english-to-sanskrit";
}

function generateQuiz(count: number = 10): QuizQuestion[] {
  const shuffled = shuffleArray(poses);
  const selected = shuffled.slice(0, Math.min(count, shuffled.length));

  return selected.map(pose => {
    const types = ["image-to-english", "image-to-sanskrit", "english-to-sanskrit"] as const;
    const type = types[Math.floor(Math.random() * types.length)];

    let correctAnswer: string;
    let distractors: string[];

    if (type === "image-to-english") {
      correctAnswer = pose.englishName;
      distractors = shuffleArray(poses.filter(p => p.id !== pose.id)).slice(0, 3).map(p => p.englishName);
    } else if (type === "image-to-sanskrit") {
      correctAnswer = pose.sanskritName;
      distractors = shuffleArray(poses.filter(p => p.id !== pose.id)).slice(0, 3).map(p => p.sanskritName);
    } else {
      correctAnswer = pose.sanskritName;
      distractors = shuffleArray(poses.filter(p => p.id !== pose.id)).slice(0, 3).map(p => p.sanskritName);
    }

    return {
      poseId: pose.id,
      emoji: pose.emoji,
      correctAnswer,
      options: shuffleArray([correctAnswer, ...distractors]),
      type,
    };
  });
}

export default function Quiz() {
  const [questions, setQuestions] = useState(() => generateQuiz());
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [answered, setAnswered] = useState(false);

  const question = questions[currentQ];
  const pose = poses.find(p => p.id === question?.poseId);

  const handleSelect = (option: string) => {
    if (answered) return;
    setSelected(option);
    setAnswered(true);
    if (option === question.correctAnswer) {
      setScore(s => s + 1);
    }
  };

  const handleNext = () => {
    if (currentQ + 1 >= questions.length) {
      setFinished(true);
    } else {
      setCurrentQ(q => q + 1);
      setSelected(null);
      setAnswered(false);
    }
  };

  const restart = () => {
    setQuestions(generateQuiz());
    setCurrentQ(0);
    setSelected(null);
    setScore(0);
    setFinished(false);
    setAnswered(false);
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
          <button
            onClick={restart}
            className="mt-6 flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-body font-medium mx-auto"
          >
            <RotateCcw className="w-4 h-4" /> Try Again
          </button>
        </motion.div>
        <BottomNav />
      </div>
    );
  }

  const getPromptText = () => {
    if (question.type === "english-to-sanskrit") return `What is "${pose?.englishName}" in Sanskrit?`;
    if (question.type === "image-to-sanskrit") return "What is the Sanskrit name?";
    return "What is the English name?";
  };

  return (
    <div className="min-h-screen pb-20">
      <div className="px-5 pt-12 pb-4">
        <div className="flex items-center justify-between mb-2">
          <h1 className="font-display text-3xl font-bold">Quiz</h1>
          <span className="font-body text-sm text-muted-foreground">{currentQ + 1}/{questions.length}</span>
        </div>
        {/* Progress bar */}
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
            {/* Prompt */}
            {question.type !== "english-to-sanskrit" && (
              <div className="w-32 h-32 mx-auto rounded-2xl bg-sage-light flex items-center justify-center mb-4">
                <span className="text-6xl">{question.emoji}</span>
              </div>
            )}
            <p className="font-display text-xl font-semibold text-center mb-6">{getPromptText()}</p>

            {/* Options */}
            <div className="space-y-3 max-w-sm mx-auto">
              {question.options.map((option) => {
                const isCorrect = option === question.correctAnswer;
                const isSelected = option === selected;

                let optionStyle = "bg-card shadow-soft hover:shadow-card text-foreground";
                if (answered) {
                  if (isCorrect) optionStyle = "bg-sage-light text-primary ring-2 ring-primary";
                  else if (isSelected && !isCorrect) optionStyle = "bg-destructive/10 text-destructive ring-2 ring-destructive";
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
                    {answered && isSelected && !isCorrect && <XCircle className="w-5 h-5 text-destructive flex-shrink-0" />}
                  </button>
                );
              })}
            </div>

            {/* Next button */}
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

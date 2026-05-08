export type CueCategory =
  | "setup"
  | "action"
  | "checkpoint"
  | "intention"
  | "gaze"
  | "breath"
  | "hold";

const SETUP = /^(lie|sit|stand|step (the|back|forward|your)|from |begin|start|come|kneel|squat|establish|enter|set up|in t[āa]?[ḍd]|in da[ṇn]|prone|supine|all-?fours|squat with|interlace the (fingers|forearms))/i;
const SETUP_POS = /\b(hip-width|shoulder-width|feet apart|legs together|knees together|knees wide|45[°\u00b0]|60[°\u00b0]|90[°\u00b0]|four corners|fingers? interlaced)\b/i;

const INTENTION = /\b(to (feel|create|open|lengthen|relieve|release|stretch|engage|stabili[sz]e|protect|find|allow|encourage|deepen|broaden|free|spread|invite|avoid|prevent|access|activate|wake|extend)|so that|in order to|without (forcing|locking|collapsing|straining|losing|gripping|clenching|hardening|tilting))\b/i;

const GAZE = /\b(gaze|drishti|dṛṣṭi|dr[iī]shti|eyes (closed|soft)|eye level|samadṛṣṭi|samadrsti)\b/i;
const BREATH = /\b(inhale|exhale|breath|breathe|breathing)\b/i;
const HOLD = /\b(hold (for )?\d|for \d+\s*(seconds|minutes)|remain for|stay for \d|change sides|then reverse|then release)\b/i;

const VERB = /^(press|lift|draw|reach|extend|stretch|engage|squeeze|root|roll|drop|lower|raise|turn|spiral|hug|pull|push|tuck|widen|broaden|open|soften|relax|firm|lengthen|fold|bend|straighten|flex|point|stack|align|square|ground|anchor|sweep|peel|cradle|hinge|shift|hover|float|cross|hook|interlace|spread|step|place|bring|set|join|contract|melt|externally rotate|internally rotate|rotate)\b/i;

export function categorizeCue(raw: string): CueCategory {
  const c = raw.trim();
  if (HOLD.test(c)) return "hold";
  if (GAZE.test(c)) return "gaze";
  if (INTENTION.test(c)) return "intention";
  if (SETUP.test(c) || SETUP_POS.test(c)) return "setup";
  if (BREATH.test(c)) return "breath";
  if (VERB.test(c)) return "action";
  return "checkpoint";
}

export const CATEGORY_META: Record<
  CueCategory,
  { label: string; description: string; chipClass: string; dotClass: string }
> = {
  setup: {
    label: "Setup",
    description: "How to enter the shape",
    chipClass: "bg-sage-light text-primary border-primary/20",
    dotClass: "bg-primary",
  },
  action: {
    label: "Action",
    description: "Verb · body part · direction",
    chipClass: "bg-terracotta-light text-accent border-accent/20",
    dotClass: "bg-accent",
  },
  checkpoint: {
    label: "Checkpoint",
    description: "What correct looks like",
    chipClass: "bg-muted text-foreground border-border",
    dotClass: "bg-foreground/60",
  },
  intention: {
    label: "Intention",
    description: "Do this to feel that",
    chipClass: "bg-sage-light text-primary border-primary/30",
    dotClass: "bg-primary",
  },
  gaze: {
    label: "Gaze",
    description: "Drishti — where the eyes go",
    chipClass: "bg-terracotta-light/60 text-accent border-accent/20",
    dotClass: "bg-accent/70",
  },
  breath: {
    label: "Breath",
    description: "Pranayama pairing",
    chipClass: "bg-sage-light/70 text-primary border-primary/20",
    dotClass: "bg-primary/70",
  },
  hold: {
    label: "Hold",
    description: "Duration & exit",
    chipClass: "bg-muted/60 text-muted-foreground border-border",
    dotClass: "bg-muted-foreground",
  },
};

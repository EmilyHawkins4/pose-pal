export type PoseCategory = "standing" | "seated" | "balance" | "backbend" | "inversion" | "twist" | "forward-fold" | "supine";

export interface YogaPose {
  id: string;
  englishName: string;
  sanskritName: string;
  category: PoseCategory;
  difficulty: "beginner" | "intermediate" | "advanced";
  description: string;
  alignmentCues: string[];
  emoji: string;
}

export const CATEGORIES: { value: PoseCategory; label: string; emoji: string }[] = [
  { value: "standing", label: "Standing", emoji: "🧍" },
  { value: "seated", label: "Seated", emoji: "🪷" },
  { value: "balance", label: "Balance", emoji: "⚖️" },
  { value: "backbend", label: "Backbend", emoji: "🌙" },
  { value: "inversion", label: "Inversion", emoji: "🙃" },
  { value: "twist", label: "Twist", emoji: "🌀" },
  { value: "forward-fold", label: "Forward Fold", emoji: "🙇" },
  { value: "supine", label: "Supine", emoji: "😌" },
];

export const poses: YogaPose[] = [
  {
    id: "mountain",
    englishName: "Mountain Pose",
    sanskritName: "Tāḍāsana",
    category: "standing",
    difficulty: "beginner",
    description: "The foundation of all standing poses. Stand tall with feet together, grounding evenly through all four corners of each foot.",
    alignmentCues: ["Feet together or hip-width apart", "Engage quadriceps", "Lengthen tailbone toward floor", "Roll shoulders back and down", "Crown of head reaches toward ceiling"],
    emoji: "🏔️",
  },
  {
    id: "warrior-1",
    englishName: "Warrior I",
    sanskritName: "Vīrabhadrāsana I",
    category: "standing",
    difficulty: "beginner",
    description: "A powerful standing pose that strengthens the legs and opens the hips and chest, building focus and stability.",
    alignmentCues: ["Front knee over ankle at 90°", "Back foot at 45° angle", "Hips squared forward", "Arms extended overhead", "Gaze forward or slightly up"],
    emoji: "⚔️",
  },
  {
    id: "warrior-2",
    englishName: "Warrior II",
    sanskritName: "Vīrabhadrāsana II",
    category: "standing",
    difficulty: "beginner",
    description: "A strong, open stance that builds stamina and concentration while stretching the hips and inner thighs.",
    alignmentCues: ["Front knee stacked over ankle", "Arms parallel to floor", "Hips open to side", "Gaze over front fingertips", "Back foot parallel to short edge of mat"],
    emoji: "🗡️",
  },
  {
    id: "warrior-3",
    englishName: "Warrior III",
    sanskritName: "Vīrabhadrāsana III",
    category: "balance",
    difficulty: "intermediate",
    description: "An energizing balance pose that strengthens the legs, core, and back while improving focus and coordination.",
    alignmentCues: ["Standing leg strong and straight", "Body forms T-shape", "Hips level and squared down", "Arms reaching forward or alongside body", "Flex lifted foot, toes point down"],
    emoji: "✈️",
  },
  {
    id: "tree",
    englishName: "Tree Pose",
    sanskritName: "Vṛkṣāsana",
    category: "balance",
    difficulty: "beginner",
    description: "A classic balance pose that builds focus and stability, connecting you to a sense of grounding and calm.",
    alignmentCues: ["Foot on inner thigh or calf, never on knee", "Standing leg strong", "Hips level", "Hands at heart or overhead", "Fix gaze on a steady point"],
    emoji: "🌳",
  },
  {
    id: "triangle",
    englishName: "Triangle Pose",
    sanskritName: "Trikoṇāsana",
    category: "standing",
    difficulty: "beginner",
    description: "A foundational standing pose that stretches the hamstrings, hips, and spine while building strength in the legs.",
    alignmentCues: ["Legs straight, front foot forward", "Reach forward then tilt sideways", "Bottom hand on shin or block", "Top arm extends to ceiling", "Open chest toward sky"],
    emoji: "📐",
  },
  {
    id: "downward-dog",
    englishName: "Downward-Facing Dog",
    sanskritName: "Adho Mukha Śvānāsana",
    category: "inversion",
    difficulty: "beginner",
    description: "One of the most recognized poses in yoga. An inverted V-shape that stretches the entire back body and builds upper body strength.",
    alignmentCues: ["Hands shoulder-width apart", "Feet hip-width apart", "Hips press up and back", "Spine long, head between upper arms", "Heels reach toward floor"],
    emoji: "🐕",
  },
  {
    id: "cobra",
    englishName: "Cobra Pose",
    sanskritName: "Bhujaṅgāsana",
    category: "backbend",
    difficulty: "beginner",
    description: "A gentle backbend that strengthens the spine and opens the chest and shoulders.",
    alignmentCues: ["Hands under shoulders", "Elbows close to body", "Lift chest using back muscles", "Shoulders away from ears", "Legs and feet pressing into mat"],
    emoji: "🐍",
  },
  {
    id: "childs-pose",
    englishName: "Child's Pose",
    sanskritName: "Bālāsana",
    category: "forward-fold",
    difficulty: "beginner",
    description: "A restful pose that gently stretches the hips, thighs, and back. Perfect for rest and recovery.",
    alignmentCues: ["Knees together or wide", "Hips sink toward heels", "Arms extended forward or alongside body", "Forehead rests on mat", "Breathe into back body"],
    emoji: "🧒",
  },
  {
    id: "seated-forward-fold",
    englishName: "Seated Forward Fold",
    sanskritName: "Paścimottānāsana",
    category: "forward-fold",
    difficulty: "beginner",
    description: "A deep stretch for the entire back of the body, promoting calm and introspection.",
    alignmentCues: ["Sit tall on sit bones", "Legs extended straight", "Hinge from hips, not waist", "Reach toward feet", "Keep spine long"],
    emoji: "🦶",
  },
  {
    id: "crow",
    englishName: "Crow Pose",
    sanskritName: "Bakāsana",
    category: "balance",
    difficulty: "advanced",
    description: "An arm balance that builds tremendous core and upper body strength while developing focus and courage.",
    alignmentCues: ["Hands shoulder-width apart", "Knees rest on backs of upper arms", "Lean forward, lifting feet", "Round upper back", "Gaze slightly forward on floor"],
    emoji: "🐦‍⬛",
  },
  {
    id: "pigeon",
    englishName: "Pigeon Pose",
    sanskritName: "Eka Pāda Rājakapotāsana",
    category: "seated",
    difficulty: "intermediate",
    description: "A deep hip opener that stretches the hip flexors and rotators, often releasing stored tension.",
    alignmentCues: ["Front shin angled across mat", "Back leg extends straight behind", "Hips squared toward front", "Walk hands forward to fold", "Use a block under hip if needed"],
    emoji: "🕊️",
  },
  {
    id: "bridge",
    englishName: "Bridge Pose",
    sanskritName: "Setu Bandha Sarvāṅgāsana",
    category: "backbend",
    difficulty: "beginner",
    description: "A gentle backbend that opens the chest and strengthens the legs, glutes, and spine.",
    alignmentCues: ["Feet hip-width, close to sit bones", "Press feet into floor to lift hips", "Roll shoulders under, clasp hands", "Knees stay parallel", "Chin slightly tucked"],
    emoji: "🌉",
  },
  {
    id: "corpse",
    englishName: "Corpse Pose",
    sanskritName: "Śavāsana",
    category: "supine",
    difficulty: "beginner",
    description: "The ultimate relaxation pose. Lying flat on the back, releasing all effort and surrendering to stillness.",
    alignmentCues: ["Lie flat on back", "Arms alongside body, palms up", "Feet fall open naturally", "Close eyes", "Release all muscular effort"],
    emoji: "🧘",
  },
  {
    id: "headstand",
    englishName: "Headstand",
    sanskritName: "Śīrṣāsana",
    category: "inversion",
    difficulty: "advanced",
    description: "Known as the king of asanas, this full inversion builds core strength, balance, and mental clarity.",
    alignmentCues: ["Forearms on mat, fingers interlaced", "Crown of head on mat, cradled by hands", "Walk feet in, hips over shoulders", "Lift legs slowly using core", "Body in one straight line"],
    emoji: "🤸",
  },
  {
    id: "half-moon",
    englishName: "Half Moon Pose",
    sanskritName: "Ardha Candrāsana",
    category: "balance",
    difficulty: "intermediate",
    description: "A challenging balance pose that builds strength and flexibility in the legs, hips, and core.",
    alignmentCues: ["Standing leg straight and strong", "Bottom hand on floor or block", "Top leg parallel to floor", "Open hips and chest to side", "Top arm reaches to ceiling"],
    emoji: "🌓",
  },
  {
    id: "boat",
    englishName: "Boat Pose",
    sanskritName: "Nāvāsana",
    category: "seated",
    difficulty: "intermediate",
    description: "A core-strengthening pose that builds abdominal power and hip flexor strength.",
    alignmentCues: ["Sit on sit bones", "Lean back slightly", "Lift legs to 45°", "Arms parallel to floor", "Chest lifted, spine straight"],
    emoji: "⛵",
  },
  {
    id: "twisted-chair",
    englishName: "Revolved Chair Pose",
    sanskritName: "Parivṛtta Utkaṭāsana",
    category: "twist",
    difficulty: "intermediate",
    description: "A twist combined with a squat that detoxifies and strengthens the legs while improving spinal mobility.",
    alignmentCues: ["Feet together, knees bent", "Hands at heart center", "Twist from mid-spine", "Hook elbow outside opposite knee", "Keep knees level"],
    emoji: "🪑",
  },
  {
    id: "supine-twist",
    englishName: "Supine Spinal Twist",
    sanskritName: "Supta Matsyendrāsana",
    category: "twist",
    difficulty: "beginner",
    description: "A gentle reclining twist that releases tension in the spine and hips while promoting relaxation.",
    alignmentCues: ["Lie on back, arms in T-shape", "Draw one knee to chest", "Guide knee across body", "Keep both shoulders on mat", "Turn head opposite to knee"],
    emoji: "🌀",
  },
  {
    id: "camel",
    englishName: "Camel Pose",
    sanskritName: "Uṣṭrāsana",
    category: "backbend",
    difficulty: "intermediate",
    description: "A deep backbend performed from kneeling that opens the entire front body and builds spinal flexibility.",
    alignmentCues: ["Kneel with hips over knees", "Hands on lower back first", "Lift chest toward ceiling", "Reach hands to heels", "Keep hips pressing forward"],
    emoji: "🐫",
  },
];

export function getPosesByCategory(category: PoseCategory): YogaPose[] {
  return poses.filter(p => p.category === category);
}

export function searchPoses(query: string): YogaPose[] {
  const q = query.toLowerCase().trim();
  if (!q) return poses;
  return poses.filter(
    p =>
      p.englishName.toLowerCase().includes(q) ||
      p.sanskritName.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q)
  );
}

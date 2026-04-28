// Sanskrit root words used across the asana catalog.
// Only roots that appear in 2+ pose names are included (with a few foundational extras).

export interface SanskritRoot {
  id: string;
  sanskrit: string; // transliterated with diacritics
  simple: string; // simplified spelling (no diacritics) for matching
  meaning: string;
  category: "number" | "direction" | "body" | "shape" | "action" | "quality" | "core";
  example: string; // an asana that uses this root
}

export const sanskritRoots: SanskritRoot[] = [
  // Core
  { id: "asana", sanskrit: "āsana", simple: "asana", meaning: "pose / seat", category: "core", example: "Tāḍāsana (Mountain Pose)" },
  { id: "ardha", sanskrit: "ardha", simple: "ardha", meaning: "half", category: "quality", example: "Ardha Candrāsana (Half Moon)" },

  // Numbers
  { id: "eka", sanskrit: "eka", simple: "eka", meaning: "one", category: "number", example: "Eka Pāda Rājakapotāsana (One-Legged Pigeon)" },
  { id: "tri", sanskrit: "tri", simple: "tri", meaning: "three", category: "number", example: "Trikoṇāsana (Triangle), Tri Pāda Adho Mukha Śvānāsana" },
  { id: "catur", sanskrit: "catur", simple: "catur", meaning: "four", category: "number", example: "Caturaṅga Daṇḍāsana (Four-Limbed Staff)" },

  // Directions / orientation
  { id: "utthita", sanskrit: "utthita", simple: "utthita", meaning: "extended / stretched out", category: "direction", example: "Utthita Pārśvakoṇāsana (Extended Side Angle)" },
  { id: "parivrtta", sanskrit: "parivṛtta", simple: "parivrtta", meaning: "revolved / twisted", category: "direction", example: "Parivṛtta Utkaṭāsana (Revolved Chair)" },
  { id: "parsva", sanskrit: "pārśva", simple: "parsva", meaning: "side", category: "direction", example: "Utthita Pārśvakoṇāsana (Extended Side Angle)" },
  { id: "adho", sanskrit: "adho", simple: "adho", meaning: "downward", category: "direction", example: "Adho Mukha Śvānāsana (Downward-Facing Dog)" },
  { id: "urdhva", sanskrit: "ūrdhva", simple: "urdhva", meaning: "upward", category: "direction", example: "Ūrdhva Mukha Śvānāsana (Upward-Facing Dog)" },
  { id: "viparita", sanskrit: "viparīta", simple: "viparita", meaning: "inverted / reversed", category: "direction", example: "Viparīta Vīrabhadrāsana (Reverse Warrior)" },
  { id: "supta", sanskrit: "supta", simple: "supta", meaning: "reclining / lying down", category: "direction", example: "Supta Matsyendrāsana (Supine Twist)" },

  // Body parts
  { id: "pada", sanskrit: "pāda", simple: "pada", meaning: "foot / leg", category: "body", example: "Eka Pāda Rājakapotāsana, Tri Pāda Adho Mukha Śvānāsana" },
  { id: "hasta", sanskrit: "hasta", simple: "hasta", meaning: "hand", category: "body", example: "Hasta Pādāsana (Hand-to-Foot Pose)" },
  { id: "mukha", sanskrit: "mukha", simple: "mukha", meaning: "face / facing", category: "body", example: "Adho Mukha Śvānāsana (Downward-Facing Dog)" },
  { id: "sirsa", sanskrit: "śīrṣa", simple: "sirsa", meaning: "head", category: "body", example: "Śīrṣāsana (Headstand)" },
  { id: "anga", sanskrit: "aṅga", simple: "anga", meaning: "limb", category: "body", example: "Caturaṅga Daṇḍāsana, Sarvāṅgāsana (Shoulderstand)" },

  // Shapes / objects
  { id: "kona", sanskrit: "koṇa", simple: "kona", meaning: "angle", category: "shape", example: "Trikoṇāsana, Utkaṭa Koṇāsana (Horse)" },
  { id: "danda", sanskrit: "daṇḍa", simple: "danda", meaning: "staff / rod", category: "shape", example: "Caturaṅga Daṇḍāsana (Four-Limbed Staff)" },
  { id: "candra", sanskrit: "candra", simple: "candra", meaning: "moon", category: "shape", example: "Ardha Candrāsana (Half Moon)" },
  { id: "setu", sanskrit: "setu", simple: "setu", meaning: "bridge", category: "shape", example: "Setu Bandha Sarvāṅgāsana (Bridge)" },

  // Qualities / actions
  { id: "baddha", sanskrit: "baddha", simple: "baddha", meaning: "bound", category: "quality", example: "Baddha Koṇāsana (Bound Angle)" },
  { id: "bandha", sanskrit: "bandha", simple: "bandha", meaning: "lock / bind", category: "action", example: "Setu Bandha Sarvāṅgāsana (Bridge)" },
  { id: "salamba", sanskrit: "sālamba", simple: "salamba", meaning: "supported", category: "quality", example: "Sālamba Bhujaṅgāsana (Sphinx)" },
  { id: "utkata", sanskrit: "utkaṭa", simple: "utkata", meaning: "fierce / powerful", category: "quality", example: "Utkaṭāsana (Chair), Utkaṭa Koṇāsana (Horse)" },
  { id: "sarva", sanskrit: "sarva", simple: "sarva", meaning: "all / whole", category: "quality", example: "Sarvāṅgāsana (Shoulderstand)" },
  { id: "ananda", sanskrit: "ānanda", simple: "ananda", meaning: "bliss / joy", category: "quality", example: "Ānanda Bālāsana (Happy Baby)" },
  { id: "bala", sanskrit: "bāla", simple: "bala", meaning: "child", category: "quality", example: "Bālāsana (Child's Pose), Ānanda Bālāsana (Happy Baby)" },

  // Animals / figures (used 2+ times)
  { id: "virabhadra", sanskrit: "vīrabhadra", simple: "virabhadra", meaning: "Vīrabhadra (a fierce warrior)", category: "core", example: "Vīrabhadrāsana I, II, III (Warrior series)" },
  { id: "bhujanga", sanskrit: "bhujaṅga", simple: "bhujanga", meaning: "serpent / cobra", category: "shape", example: "Bhujaṅgāsana (Cobra), Sālamba Bhujaṅgāsana (Sphinx)" },
  { id: "svana", sanskrit: "śvāna", simple: "svana", meaning: "dog", category: "shape", example: "Adho Mukha Śvānāsana (Downward Dog)" },
  { id: "anjaneya", sanskrit: "añjaneya", simple: "anjaneya", meaning: "son of Añjanā (Hanuman)", category: "core", example: "Añjaneyāsana (Low Lunge / Crescent Lunge)" },
];

// Per-pose translation breakdowns. Tokens map to root ids when possible.
// Only included for poses whose name is composed of 2+ recognizable Sanskrit words.
export interface PoseBreakdownToken {
  word: string; // display word (with diacritics)
  rootId?: string; // links to sanskritRoots
  meaning: string;
}

export const poseBreakdowns: Record<string, PoseBreakdownToken[]> = {
  "mountain": [
    { word: "Tāḍa", meaning: "mountain" },
    { word: "āsana", rootId: "asana", meaning: "pose" },
  ],
  "warrior-1": [
    { word: "Vīrabhadra", rootId: "virabhadra", meaning: "fierce warrior" },
    { word: "āsana", rootId: "asana", meaning: "pose" },
    { word: "I", meaning: "first variation" },
  ],
  "warrior-2": [
    { word: "Vīrabhadra", rootId: "virabhadra", meaning: "fierce warrior" },
    { word: "āsana", rootId: "asana", meaning: "pose" },
    { word: "II", meaning: "second variation" },
  ],
  "warrior-3": [
    { word: "Vīrabhadra", rootId: "virabhadra", meaning: "fierce warrior" },
    { word: "āsana", rootId: "asana", meaning: "pose" },
    { word: "III", meaning: "third variation" },
  ],
  "tree": [
    { word: "Vṛkṣa", meaning: "tree" },
    { word: "āsana", rootId: "asana", meaning: "pose" },
  ],
  "triangle": [
    { word: "Tri", rootId: "tri", meaning: "three" },
    { word: "koṇa", rootId: "kona", meaning: "angle" },
    { word: "āsana", rootId: "asana", meaning: "pose" },
  ],
  "downward-dog": [
    { word: "Adho", rootId: "adho", meaning: "downward" },
    { word: "Mukha", rootId: "mukha", meaning: "facing" },
    { word: "Śvāna", rootId: "svana", meaning: "dog" },
    { word: "āsana", rootId: "asana", meaning: "pose" },
  ],
  "cobra": [
    { word: "Bhujaṅga", rootId: "bhujanga", meaning: "serpent" },
    { word: "āsana", rootId: "asana", meaning: "pose" },
  ],
  "childs-pose": [
    { word: "Bāla", rootId: "bala", meaning: "child" },
    { word: "āsana", rootId: "asana", meaning: "pose" },
  ],
  "seated-forward-fold": [
    { word: "Paścima", meaning: "west / back of body" },
    { word: "uttāna", meaning: "intense stretch" },
    { word: "āsana", rootId: "asana", meaning: "pose" },
  ],
  "crow": [
    { word: "Baka", meaning: "crane" },
    { word: "āsana", rootId: "asana", meaning: "pose" },
  ],
  "pigeon": [
    { word: "Eka", rootId: "eka", meaning: "one" },
    { word: "Pāda", rootId: "pada", meaning: "foot / leg" },
    { word: "Rāja", meaning: "king" },
    { word: "Kapota", meaning: "pigeon" },
    { word: "āsana", rootId: "asana", meaning: "pose" },
  ],
  "bridge": [
    { word: "Setu", rootId: "setu", meaning: "bridge" },
    { word: "Bandha", rootId: "bandha", meaning: "lock" },
    { word: "Sarva", rootId: "sarva", meaning: "all" },
    { word: "aṅga", rootId: "anga", meaning: "limb" },
    { word: "āsana", rootId: "asana", meaning: "pose" },
  ],
  "corpse": [
    { word: "Śava", meaning: "corpse" },
    { word: "āsana", rootId: "asana", meaning: "pose" },
  ],
  "headstand": [
    { word: "Śīrṣa", rootId: "sirsa", meaning: "head" },
    { word: "āsana", rootId: "asana", meaning: "pose" },
  ],
  "half-moon": [
    { word: "Ardha", rootId: "ardha", meaning: "half" },
    { word: "Candra", rootId: "candra", meaning: "moon" },
    { word: "āsana", rootId: "asana", meaning: "pose" },
  ],
  "boat": [
    { word: "Nāva", meaning: "boat" },
    { word: "āsana", rootId: "asana", meaning: "pose" },
  ],
  "twisted-chair": [
    { word: "Parivṛtta", rootId: "parivrtta", meaning: "revolved" },
    { word: "Utkaṭa", rootId: "utkata", meaning: "fierce" },
    { word: "āsana", rootId: "asana", meaning: "pose" },
  ],
  "supine-twist": [
    { word: "Supta", rootId: "supta", meaning: "reclining" },
    { word: "Matsyendra", meaning: "lord of the fishes (a sage)" },
    { word: "āsana", rootId: "asana", meaning: "pose" },
  ],
  "camel": [
    { word: "Uṣṭra", meaning: "camel" },
    { word: "āsana", rootId: "asana", meaning: "pose" },
  ],
  "chair": [
    { word: "Utkaṭa", rootId: "utkata", meaning: "fierce / powerful" },
    { word: "āsana", rootId: "asana", meaning: "pose" },
  ],
  "eagle": [
    { word: "Garuḍa", meaning: "eagle (mythical bird)" },
    { word: "āsana", rootId: "asana", meaning: "pose" },
  ],
  "dancer": [
    { word: "Naṭarāja", meaning: "lord of the dance (Shiva)" },
    { word: "āsana", rootId: "asana", meaning: "pose" },
  ],
  "plank": [
    { word: "Phalaka", meaning: "plank / board" },
    { word: "āsana", rootId: "asana", meaning: "pose" },
  ],
  "side-plank": [
    { word: "Vasiṣṭha", meaning: "Vasiṣṭha (a sage)" },
    { word: "āsana", rootId: "asana", meaning: "pose" },
  ],
  "fish": [
    { word: "Matsya", meaning: "fish" },
    { word: "āsana", rootId: "asana", meaning: "pose" },
  ],
  "happy-baby": [
    { word: "Ānanda", rootId: "ananda", meaning: "bliss / happy" },
    { word: "Bāla", rootId: "bala", meaning: "child / baby" },
    { word: "āsana", rootId: "asana", meaning: "pose" },
  ],
  "legs-up-wall": [
    { word: "Viparīta", rootId: "viparita", meaning: "inverted" },
    { word: "Karaṇī", meaning: "action / doing" },
  ],
  "low-lunge": [
    { word: "Añjaneya", rootId: "anjaneya", meaning: "son of Añjanā (Hanuman)" },
    { word: "āsana", rootId: "asana", meaning: "pose" },
  ],
  "sphinx": [
    { word: "Sālamba", rootId: "salamba", meaning: "supported" },
    { word: "Bhujaṅga", rootId: "bhujanga", meaning: "serpent" },
    { word: "āsana", rootId: "asana", meaning: "pose" },
  ],
  "garland": [
    { word: "Māla", meaning: "garland" },
    { word: "āsana", rootId: "asana", meaning: "pose" },
  ],
  "extended-side-angle": [
    { word: "Utthita", rootId: "utthita", meaning: "extended" },
    { word: "Pārśva", rootId: "parsva", meaning: "side" },
    { word: "Koṇa", rootId: "kona", meaning: "angle" },
    { word: "āsana", rootId: "asana", meaning: "pose" },
  ],
  "shoulderstand": [
    { word: "Sarva", rootId: "sarva", meaning: "all" },
    { word: "aṅga", rootId: "anga", meaning: "limb" },
    { word: "āsana", rootId: "asana", meaning: "pose" },
  ],
  "plow": [
    { word: "Hala", meaning: "plow" },
    { word: "āsana", rootId: "asana", meaning: "pose" },
  ],
  "reverse-warrior": [
    { word: "Viparīta", rootId: "viparita", meaning: "reversed" },
    { word: "Vīrabhadra", rootId: "virabhadra", meaning: "fierce warrior" },
    { word: "āsana", rootId: "asana", meaning: "pose" },
  ],
  "halfway-lift": [
    { word: "Ardha", rootId: "ardha", meaning: "half" },
    { word: "Uttāna", meaning: "intense stretch" },
    { word: "āsana", rootId: "asana", meaning: "pose" },
  ],
  "low-plank": [
    { word: "Catur", rootId: "catur", meaning: "four" },
    { word: "aṅga", rootId: "anga", meaning: "limb" },
    { word: "Daṇḍa", rootId: "danda", meaning: "staff" },
    { word: "āsana", rootId: "asana", meaning: "pose" },
  ],
  "crescent-lunge": [
    { word: "Añjaneya", rootId: "anjaneya", meaning: "son of Añjanā (Hanuman)" },
    { word: "āsana", rootId: "asana", meaning: "pose" },
  ],
  "horse": [
    { word: "Utkaṭa", rootId: "utkata", meaning: "fierce" },
    { word: "Koṇa", rootId: "kona", meaning: "angle" },
    { word: "āsana", rootId: "asana", meaning: "pose" },
  ],
  "cat": [
    { word: "Mārjarya", meaning: "cat" },
    { word: "āsana", rootId: "asana", meaning: "pose" },
  ],
  "cow": [
    { word: "Bitila", meaning: "cow" },
    { word: "āsana", rootId: "asana", meaning: "pose" },
  ],
  "crescent-lunge-twist": [
    { word: "Parivṛtta", rootId: "parivrtta", meaning: "revolved" },
    { word: "Añjaneya", rootId: "anjaneya", meaning: "son of Añjanā" },
    { word: "āsana", rootId: "asana", meaning: "pose" },
  ],
  "mountain-twist": [
    { word: "Parivṛtta", rootId: "parivrtta", meaning: "revolved" },
    { word: "Tāḍa", meaning: "mountain" },
    { word: "āsana", rootId: "asana", meaning: "pose" },
  ],
  "baby-backbend": [
    { word: "Ardha", rootId: "ardha", meaning: "half" },
    { word: "Ānanda", rootId: "ananda", meaning: "bliss" },
    { word: "Bāla", rootId: "bala", meaning: "child" },
    { word: "āsana", rootId: "asana", meaning: "pose" },
  ],
  "star": [
    { word: "Utthita", rootId: "utthita", meaning: "extended" },
    { word: "Tāḍa", meaning: "mountain" },
    { word: "āsana", rootId: "asana", meaning: "pose" },
  ],
  "side-lunge": [
    { word: "Skanda", meaning: "Skanda (a deity)" },
    { word: "āsana", rootId: "asana", meaning: "pose" },
  ],
  "table-top": [
    { word: "Bharmana", meaning: "wandering / on all fours" },
    { word: "āsana", rootId: "asana", meaning: "pose" },
  ],
  "gate": [
    { word: "Parigha", meaning: "gate / iron beam" },
    { word: "āsana", rootId: "asana", meaning: "pose" },
  ],
  "three-legged-dog": [
    { word: "Tri", rootId: "tri", meaning: "three" },
    { word: "Pāda", rootId: "pada", meaning: "leg" },
    { word: "Adho", rootId: "adho", meaning: "downward" },
    { word: "Mukha", rootId: "mukha", meaning: "facing" },
    { word: "Śvāna", rootId: "svana", meaning: "dog" },
    { word: "āsana", rootId: "asana", meaning: "pose" },
  ],
  "forward-fold": [
    { word: "Uttāna", meaning: "intense stretch" },
    { word: "āsana", rootId: "asana", meaning: "pose" },
  ],
};

export const ROOT_CATEGORY_LABELS: Record<SanskritRoot["category"], { label: string; emoji: string }> = {
  number: { label: "Numbers", emoji: "🔢" },
  direction: { label: "Direction & Orientation", emoji: "🧭" },
  body: { label: "Body Parts", emoji: "🫀" },
  shape: { label: "Shapes & Figures", emoji: "🔷" },
  action: { label: "Actions", emoji: "⚡" },
  quality: { label: "Qualities", emoji: "✨" },
  core: { label: "Foundational", emoji: "🪷" },
};

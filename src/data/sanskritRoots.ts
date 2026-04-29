// Sanskrit root words used across the asana catalog.
// Curated for yoga teachers in training: each root includes devanāgarī,
// transliteration with diacritics, simple phonetic pronunciation,
// a teaching note, and related roots for cross-study.

export interface SanskritRoot {
  id: string;
  sanskrit: string; // transliterated with diacritics
  simple: string; // simplified spelling (no diacritics) for matching
  devanagari: string; // native script
  pronunciation: string; // simple phonetic, e.g. "ah-doh"
  meaning: string;
  category: "number" | "direction" | "body" | "shape" | "action" | "quality" | "core" | "deity" | "concept";
  example: string; // an asana that uses this root
  notes?: string; // teaching note: cueing, common confusions, etymology
  relatedRootIds?: string[];
}

export const sanskritRoots: SanskritRoot[] = [
  // ============ Foundational ============
  { id: "asana", sanskrit: "āsana", simple: "asana", devanagari: "आसन", pronunciation: "AH-suh-nuh", meaning: "pose / seat", category: "core", example: "Tāḍāsana (Mountain Pose)", notes: "Literally 'seat.' The third limb of Patañjali's eight-limbed path. Every pose name ends with this suffix." },
  { id: "ardha", sanskrit: "ardha", simple: "ardha", devanagari: "अर्ध", pronunciation: "ARD-hah", meaning: "half", category: "quality", example: "Ardha Candrāsana (Half Moon)", notes: "Marks a half-variation of a fuller pose — useful for cueing modifications." },

  // ============ Numbers ============
  { id: "eka", sanskrit: "eka", simple: "eka", devanagari: "एक", pronunciation: "AY-kah", meaning: "one", category: "number", example: "Eka Pāda Rājakapotāsana (One-Legged Pigeon)", notes: "Almost always paired with pāda (leg/foot) to mark a one-legged variation.", relatedRootIds: ["pada"] },
  { id: "dvi", sanskrit: "dvi", simple: "dvi", devanagari: "द्वि", pronunciation: "DVEE", meaning: "two", category: "number", example: "Dvi Pāda Viparīta Daṇḍāsana", notes: "Less common in beginner asanas but standard in inversions and arm balances." },
  { id: "tri", sanskrit: "tri", simple: "tri", devanagari: "त्रि", pronunciation: "TREE", meaning: "three", category: "number", example: "Trikoṇāsana (Triangle), Tri Pāda Adho Mukha Śvānāsana", notes: "Same root as the English 'tri-' prefix." },
  { id: "catur", sanskrit: "catur", simple: "catur", devanagari: "चतुर्", pronunciation: "CHAH-toor", meaning: "four", category: "number", example: "Caturaṅga Daṇḍāsana (Four-Limbed Staff)", notes: "Pronounced with a soft 'ch' — never 'kat-ur.'", relatedRootIds: ["anga"] },
  { id: "sapta", sanskrit: "sapta", simple: "sapta", devanagari: "सप्त", pronunciation: "SAHP-tah", meaning: "seven", category: "number", example: "Sapta Cakra (seven chakras) — used in pranayama and philosophy" },

  // ============ Direction & Orientation ============
  { id: "utthita", sanskrit: "utthita", simple: "utthita", devanagari: "उत्थित", pronunciation: "oo-TEE-tah", meaning: "extended / stretched out", category: "direction", example: "Utthita Pārśvakoṇāsana (Extended Side Angle)", notes: "Cues active reach through the limbs — opposite of the more passive ardha." },
  { id: "parivrtta", sanskrit: "parivṛtta", simple: "parivrtta", devanagari: "परिवृत्त", pronunciation: "puh-ree-VREE-tah", meaning: "revolved / twisted", category: "direction", example: "Parivṛtta Utkaṭāsana (Revolved Chair)", notes: "Marks a twist variation. Combine with any standing pose to deepen the spinal rotation." },
  { id: "parsva", sanskrit: "pārśva", simple: "parsva", devanagari: "पार्श्व", pronunciation: "PARSH-vah", meaning: "side / lateral", category: "direction", example: "Utthita Pārśvakoṇāsana (Extended Side Angle)", notes: "Refers to the side body / lateral plane." },
  { id: "adho", sanskrit: "adho", simple: "adho", devanagari: "अधो", pronunciation: "AH-doh", meaning: "downward", category: "direction", example: "Adho Mukha Śvānāsana (Downward-Facing Dog)", notes: "Often confused with ūrdhva (upward). Mnemonic: A-dho = down.", relatedRootIds: ["urdhva", "mukha"] },
  { id: "urdhva", sanskrit: "ūrdhva", simple: "urdhva", devanagari: "ऊर्ध्व", pronunciation: "OORD-vah", meaning: "upward", category: "direction", example: "Ūrdhva Mukha Śvānāsana (Upward-Facing Dog)", notes: "Direct opposite of adho. The long ū is pronounced like 'oo' in 'pool.'", relatedRootIds: ["adho", "mukha"] },
  { id: "viparita", sanskrit: "viparīta", simple: "viparita", devanagari: "विपरीत", pronunciation: "vih-pah-REE-tah", meaning: "inverted / reversed", category: "direction", example: "Viparīta Vīrabhadrāsana (Reverse Warrior)", notes: "Means a deliberate reversal of orientation, not just upside-down." },
  { id: "supta", sanskrit: "supta", simple: "supta", devanagari: "सुप्त", pronunciation: "SOOP-tah", meaning: "reclining / lying down", category: "direction", example: "Supta Matsyendrāsana (Supine Twist)", notes: "Always indicates a supine (back-lying) version of a pose." },
  { id: "prasarita", sanskrit: "prasārita", simple: "prasarita", devanagari: "प्रसारित", pronunciation: "prah-SAH-ree-tah", meaning: "spread / extended apart", category: "direction", example: "Prasārita Pādottānāsana (Wide-Legged Forward Fold)", notes: "Specifically refers to a wide stance — feet or hands spread apart." },
  { id: "upavistha", sanskrit: "upaviṣṭa", simple: "upavistha", devanagari: "उपविष्ट", pronunciation: "oo-pah-VEESH-tah", meaning: "seated (with legs open)", category: "direction", example: "Upaviṣṭa Koṇāsana (Wide-Angle Seated Forward Fold)" },
  { id: "pascima", sanskrit: "paścima", simple: "pascima", devanagari: "पश्चिम", pronunciation: "PUSH-chee-mah", meaning: "west / back of body", category: "direction", example: "Paścimottānāsana (Seated Forward Fold)", notes: "In yoga's directional system, the back body is 'west' (you face east at sunrise).", relatedRootIds: ["purva"] },
  { id: "purva", sanskrit: "pūrva", simple: "purva", devanagari: "पूर्व", pronunciation: "POOR-vah", meaning: "east / front of body", category: "direction", example: "Pūrvottānāsana (Upward Plank / East-Facing Stretch)", relatedRootIds: ["pascima"] },

  // ============ Body Parts ============
  { id: "pada", sanskrit: "pāda", simple: "pada", devanagari: "पाद", pronunciation: "PAH-dah", meaning: "foot / leg", category: "body", example: "Eka Pāda Rājakapotāsana, Tri Pāda Adho Mukha Śvānāsana", notes: "Same Indo-European root as 'pedal' and 'podiatry.'" },
  { id: "hasta", sanskrit: "hasta", simple: "hasta", devanagari: "हस्त", pronunciation: "HAH-stah", meaning: "hand", category: "body", example: "Hasta Pādāsana (Hand-to-Foot Pose)" },
  { id: "mukha", sanskrit: "mukha", simple: "mukha", devanagari: "मुख", pronunciation: "MOO-kah", meaning: "face / facing", category: "body", example: "Adho Mukha Śvānāsana (Downward-Facing Dog)", notes: "When paired with adho/ūrdhva, indicates which way the front body faces." },
  { id: "sirsa", sanskrit: "śīrṣa", simple: "sirsa", devanagari: "शीर्ष", pronunciation: "SHEER-shah", meaning: "head", category: "body", example: "Śīrṣāsana (Headstand)", notes: "Note the 'sh' sound — the ś is sibilant." },
  { id: "anga", sanskrit: "aṅga", simple: "anga", devanagari: "अङ्ग", pronunciation: "UNG-gah", meaning: "limb", category: "body", example: "Caturaṅga Daṇḍāsana, Sarvāṅgāsana (Shoulderstand)", notes: "Also the word for 'limb' in 'aṣṭāṅga' (eight-limbed path)." },
  { id: "janu", sanskrit: "jānu", simple: "janu", devanagari: "जानु", pronunciation: "JAH-noo", meaning: "knee", category: "body", example: "Jānu Śīrṣāsana (Head-to-Knee Pose)" },
  { id: "jathara", sanskrit: "jaṭhara", simple: "jathara", devanagari: "जठर", pronunciation: "JUH-tah-rah", meaning: "belly / abdomen", category: "body", example: "Jaṭhara Parivartanāsana (Revolved Belly Pose)" },

  // ============ Shapes & Objects ============
  { id: "kona", sanskrit: "koṇa", simple: "kona", devanagari: "कोण", pronunciation: "KOH-nah", meaning: "angle", category: "shape", example: "Trikoṇāsana, Utkaṭa Koṇāsana (Horse)" },
  { id: "danda", sanskrit: "daṇḍa", simple: "danda", devanagari: "दण्ड", pronunciation: "DUN-dah", meaning: "staff / rod", category: "shape", example: "Caturaṅga Daṇḍāsana (Four-Limbed Staff)", notes: "Cues the body to be straight and rigid like a staff." },
  { id: "candra", sanskrit: "candra", simple: "candra", devanagari: "चन्द्र", pronunciation: "CHUN-drah", meaning: "moon", category: "shape", example: "Ardha Candrāsana (Half Moon)", notes: "Pronounced with 'ch,' not 'k.' Paired with sūrya (sun) in classical pairings.", relatedRootIds: ["surya"] },
  { id: "setu", sanskrit: "setu", simple: "setu", devanagari: "सेतु", pronunciation: "SAY-too", meaning: "bridge", category: "shape", example: "Setu Bandha Sarvāṅgāsana (Bridge)", relatedRootIds: ["bandha"] },
  { id: "tada", sanskrit: "tāḍa", simple: "tada", devanagari: "ताड", pronunciation: "TAH-dah", meaning: "mountain", category: "shape", example: "Tāḍāsana (Mountain Pose)", notes: "The foundational posture — every standing pose starts here." },
  { id: "vrksa", sanskrit: "vṛkṣa", simple: "vrksa", devanagari: "वृक्ष", pronunciation: "VRIK-shah", meaning: "tree", category: "shape", example: "Vṛkṣāsana (Tree Pose)" },
  { id: "nava", sanskrit: "nāva", simple: "nava", devanagari: "नाव", pronunciation: "NAH-vah", meaning: "boat", category: "shape", example: "Nāvāsana (Boat Pose)" },
  { id: "hala", sanskrit: "hala", simple: "hala", devanagari: "हल", pronunciation: "HUH-lah", meaning: "plow", category: "shape", example: "Halāsana (Plow Pose)" },
  { id: "phalaka", sanskrit: "phalaka", simple: "phalaka", devanagari: "फलक", pronunciation: "PUH-lah-kah", meaning: "plank / board", category: "shape", example: "Phalakāsana (Plank Pose)" },
  { id: "mala", sanskrit: "māla", simple: "mala", devanagari: "माल", pronunciation: "MAH-lah", meaning: "garland", category: "shape", example: "Mālāsana (Garland / Squat)" },
  { id: "parigha", sanskrit: "parigha", simple: "parigha", devanagari: "परिघ", pronunciation: "puh-REE-gah", meaning: "gate / iron beam", category: "shape", example: "Parighāsana (Gate Pose)" },

  // ============ Animals ============
  { id: "svana", sanskrit: "śvāna", simple: "svana", devanagari: "श्वान", pronunciation: "SHVAH-nah", meaning: "dog", category: "shape", example: "Adho Mukha Śvānāsana (Downward Dog)" },
  { id: "bhujanga", sanskrit: "bhujaṅga", simple: "bhujanga", devanagari: "भुजङ्ग", pronunciation: "boo-JUN-gah", meaning: "serpent / cobra", category: "shape", example: "Bhujaṅgāsana (Cobra)" },
  { id: "ustra", sanskrit: "uṣṭra", simple: "ustra", devanagari: "उष्ट्र", pronunciation: "OOSH-trah", meaning: "camel", category: "shape", example: "Uṣṭrāsana (Camel)" },
  { id: "matsya", sanskrit: "matsya", simple: "matsya", devanagari: "मत्स्य", pronunciation: "MUTS-yah", meaning: "fish", category: "shape", example: "Matsyāsana (Fish)" },
  { id: "kapota", sanskrit: "kapota", simple: "kapota", devanagari: "कपोत", pronunciation: "kah-POH-tah", meaning: "pigeon / dove", category: "shape", example: "Eka Pāda Rājakapotāsana (Pigeon)" },
  { id: "baka", sanskrit: "baka", simple: "baka", devanagari: "बक", pronunciation: "BUH-kah", meaning: "crane (often translated 'crow')", category: "shape", example: "Bakāsana (Crow / Crane)", notes: "Commonly called 'crow' in English, though baka technically means crane." },
  { id: "marjarya", sanskrit: "mārjarya", simple: "marjarya", devanagari: "मार्जर्य", pronunciation: "mar-JAR-yah", meaning: "cat", category: "shape", example: "Mārjaryāsana (Cat)" },
  { id: "garuda", sanskrit: "garuḍa", simple: "garuda", devanagari: "गरुड", pronunciation: "guh-ROO-dah", meaning: "eagle (mythical mount of Viṣṇu)", category: "deity", example: "Garuḍāsana (Eagle)" },

  // ============ Deities, Sages & Figures ============
  { id: "virabhadra", sanskrit: "vīrabhadra", simple: "virabhadra", devanagari: "वीरभद्र", pronunciation: "veer-uh-BUH-drah", meaning: "Vīrabhadra (a fierce warrior)", category: "deity", example: "Vīrabhadrāsana I, II, III (Warrior series)", notes: "A warrior created by Śiva — vīra (hero) + bhadra (auspicious)." },
  { id: "anjaneya", sanskrit: "añjaneya", simple: "anjaneya", devanagari: "आञ्जनेय", pronunciation: "ahn-jah-NAY-yah", meaning: "son of Añjanā (Hanumān)", category: "deity", example: "Añjaneyāsana (Low / Crescent Lunge)", notes: "Honors Hanumān, the monkey god known for devotion and great leaps." },
  { id: "natraja", sanskrit: "naṭarāja", simple: "natraja", devanagari: "नटराज", pronunciation: "nuh-tuh-RAH-jah", meaning: "lord of the dance (Śiva)", category: "deity", example: "Naṭarājāsana (Dancer)", relatedRootIds: ["raja"] },
  { id: "matsyendra", sanskrit: "matsyendra", simple: "matsyendra", devanagari: "मत्स्येन्द्र", pronunciation: "muts-YEN-drah", meaning: "lord of the fishes (a sage)", category: "deity", example: "Ardha Matsyendrāsana (Half Lord of the Fishes)" },
  { id: "vasistha", sanskrit: "vasiṣṭha", simple: "vasistha", devanagari: "वसिष्ठ", pronunciation: "vah-SISH-tah", meaning: "Vasiṣṭha (a great sage)", category: "deity", example: "Vasiṣṭhāsana (Side Plank)" },
  { id: "skanda", sanskrit: "skanda", simple: "skanda", devanagari: "स्कन्द", pronunciation: "SKAN-dah", meaning: "Skanda (god of war, son of Śiva)", category: "deity", example: "Skandāsana (Side Lunge)" },

  // ============ Qualities ============
  { id: "baddha", sanskrit: "baddha", simple: "baddha", devanagari: "बद्ध", pronunciation: "BAH-dah", meaning: "bound", category: "quality", example: "Baddha Koṇāsana (Bound Angle)", notes: "Indicates a bind — usually hands clasped or wrapped.", relatedRootIds: ["bandha"] },
  { id: "salamba", sanskrit: "sālamba", simple: "salamba", devanagari: "सालम्ब", pronunciation: "SAH-lum-bah", meaning: "supported", category: "quality", example: "Sālamba Bhujaṅgāsana (Sphinx), Sālamba Sarvāṅgāsana (Supported Shoulderstand)", notes: "Marks a supported variation — typically with the forearms or props." },
  { id: "utkata", sanskrit: "utkaṭa", simple: "utkata", devanagari: "उत्कट", pronunciation: "OOT-kah-tah", meaning: "fierce / powerful", category: "quality", example: "Utkaṭāsana (Chair), Utkaṭa Koṇāsana (Horse)" },
  { id: "sarva", sanskrit: "sarva", simple: "sarva", devanagari: "सर्व", pronunciation: "SAR-vah", meaning: "all / whole", category: "quality", example: "Sarvāṅgāsana (Shoulderstand — 'all-limbs pose')", relatedRootIds: ["anga"] },
  { id: "ananda", sanskrit: "ānanda", simple: "ananda", devanagari: "आनन्द", pronunciation: "AH-nun-dah", meaning: "bliss / joy", category: "quality", example: "Ānanda Bālāsana (Happy Baby)" },
  { id: "bala", sanskrit: "bāla", simple: "bala", devanagari: "बाल", pronunciation: "BAH-lah", meaning: "child", category: "quality", example: "Bālāsana (Child's Pose)" },
  { id: "uttana", sanskrit: "uttāna", simple: "uttana", devanagari: "उत्तान", pronunciation: "oo-TAH-nah", meaning: "intense stretch", category: "quality", example: "Uttānāsana (Forward Fold), Paścimottānāsana", notes: "Literally 'intense extension' — uttānāsana is the foundational forward fold." },
  { id: "raja", sanskrit: "rāja", simple: "raja", devanagari: "राज", pronunciation: "RAH-jah", meaning: "king / royal", category: "quality", example: "Rājakapotāsana (King Pigeon)", notes: "Marks the 'king' or fullest expression of a pose family." },
  { id: "sukha", sanskrit: "sukha", simple: "sukha", devanagari: "सुख", pronunciation: "SOO-kah", meaning: "easy / comfortable / pleasant", category: "quality", example: "Sukhāsana (Easy Seat)", notes: "Literally 'good space.' Opposite of duḥkha (suffering). Cues a comfortable, sustainable seat for meditation." },
  { id: "sisu", sanskrit: "śiśu", simple: "sisu", devanagari: "शिशु", pronunciation: "SHEE-shoo", meaning: "child / puppy", category: "shape", example: "Uttāna Śiśoāsana (Puppy Pose)", notes: "Used for 'puppy pose' — the extended-child shape with the chest melting toward the floor." },
  { id: "cakra", sanskrit: "cakra", simple: "cakra", devanagari: "चक्र", pronunciation: "CHUK-rah", meaning: "wheel", category: "shape", example: "Ardha Cakrāsana (Half Wheel / standing backbend)", notes: "Pronounced with 'ch,' not 'k.' Same word as the energetic 'chakras.' Cues a rounded, wheel-like backbend." },

  // ============ Actions & Concepts ============
  { id: "bandha", sanskrit: "bandha", simple: "bandha", devanagari: "बन्ध", pronunciation: "BUN-dah", meaning: "lock / bind / energetic seal", category: "action", example: "Setu Bandha Sarvāṅgāsana; also Mūla Bandha, Uḍḍīyāna Bandha", notes: "In pranayama, refers to the three energetic locks — root, abdominal, throat.", relatedRootIds: ["baddha"] },
  { id: "namaskara", sanskrit: "namaskāra", simple: "namaskara", devanagari: "नमस्कार", pronunciation: "nuh-muh-SKAR-ah", meaning: "salutation / greeting", category: "concept", example: "Sūrya Namaskāra (Sun Salutation)", notes: "From namas (to bow) + kāra (action). The act of honoring." },
  { id: "surya", sanskrit: "sūrya", simple: "surya", devanagari: "सूर्य", pronunciation: "SOOR-yah", meaning: "sun", category: "concept", example: "Sūrya Namaskāra (Sun Salutation)", relatedRootIds: ["candra", "namaskara"] },
  { id: "prana", sanskrit: "prāṇa", simple: "prana", devanagari: "प्राण", pronunciation: "PRAH-nah", meaning: "life force / vital breath", category: "concept", example: "Prāṇāyāma (breath regulation)", notes: "Foundational concept across pranayama, philosophy, and energetics." },
  { id: "vinyasa", sanskrit: "vinyāsa", simple: "vinyasa", devanagari: "विन्यास", pronunciation: "vin-YAH-sah", meaning: "to place in a special way / sequence", category: "concept", example: "Vinyāsa Krama (sequenced flow)", notes: "Specifically: linking breath to movement in an intentional sequence." },
  { id: "drsti", sanskrit: "dṛṣṭi", simple: "drsti", devanagari: "दृष्टि", pronunciation: "DRISH-tee", meaning: "gaze / focal point", category: "concept", example: "Used in every Aṣṭāṅga pose to direct attention", notes: "Nine classical dṛṣṭis — a teaching tool for focus and alignment." },
];

// ============ Per-pose translation breakdowns ============
// Tokens link to root ids when possible.
export interface PoseBreakdownToken {
  word: string; // display word (with diacritics)
  rootId?: string; // links to sanskritRoots
  meaning: string;
}

export const poseBreakdowns: Record<string, PoseBreakdownToken[]> = {
  "mountain": [
    { word: "Tāḍa", rootId: "tada", meaning: "mountain" },
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
    { word: "Vṛkṣa", rootId: "vrksa", meaning: "tree" },
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
    { word: "Paścima", rootId: "pascima", meaning: "west / back of body" },
    { word: "uttāna", rootId: "uttana", meaning: "intense stretch" },
    { word: "āsana", rootId: "asana", meaning: "pose" },
  ],
  "crow": [
    { word: "Baka", rootId: "baka", meaning: "crane" },
    { word: "āsana", rootId: "asana", meaning: "pose" },
  ],
  "pigeon": [
    { word: "Eka", rootId: "eka", meaning: "one" },
    { word: "Pāda", rootId: "pada", meaning: "foot / leg" },
    { word: "Rāja", rootId: "raja", meaning: "king" },
    { word: "Kapota", rootId: "kapota", meaning: "pigeon" },
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
    { word: "Nāva", rootId: "nava", meaning: "boat" },
    { word: "āsana", rootId: "asana", meaning: "pose" },
  ],
  "twisted-chair": [
    { word: "Parivṛtta", rootId: "parivrtta", meaning: "revolved" },
    { word: "Utkaṭa", rootId: "utkata", meaning: "fierce" },
    { word: "āsana", rootId: "asana", meaning: "pose" },
  ],
  "supine-twist": [
    { word: "Supta", rootId: "supta", meaning: "reclining" },
    { word: "Matsyendra", rootId: "matsyendra", meaning: "lord of the fishes (a sage)" },
    { word: "āsana", rootId: "asana", meaning: "pose" },
  ],
  "camel": [
    { word: "Uṣṭra", rootId: "ustra", meaning: "camel" },
    { word: "āsana", rootId: "asana", meaning: "pose" },
  ],
  "chair": [
    { word: "Utkaṭa", rootId: "utkata", meaning: "fierce / powerful" },
    { word: "āsana", rootId: "asana", meaning: "pose" },
  ],
  "eagle": [
    { word: "Garuḍa", rootId: "garuda", meaning: "eagle (mythical bird)" },
    { word: "āsana", rootId: "asana", meaning: "pose" },
  ],
  "dancer": [
    { word: "Naṭarāja", rootId: "natraja", meaning: "lord of the dance (Śiva)" },
    { word: "āsana", rootId: "asana", meaning: "pose" },
  ],
  "plank": [
    { word: "Phalaka", rootId: "phalaka", meaning: "plank / board" },
    { word: "āsana", rootId: "asana", meaning: "pose" },
  ],
  "side-plank": [
    { word: "Vasiṣṭha", rootId: "vasistha", meaning: "Vasiṣṭha (a sage)" },
    { word: "āsana", rootId: "asana", meaning: "pose" },
  ],
  "fish": [
    { word: "Matsya", rootId: "matsya", meaning: "fish" },
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
    { word: "Añjaneya", rootId: "anjaneya", meaning: "son of Añjanā (Hanumān)" },
    { word: "āsana", rootId: "asana", meaning: "pose" },
  ],
  "sphinx": [
    { word: "Sālamba", rootId: "salamba", meaning: "supported" },
    { word: "Bhujaṅga", rootId: "bhujanga", meaning: "serpent" },
    { word: "āsana", rootId: "asana", meaning: "pose" },
  ],
  "garland": [
    { word: "Māla", rootId: "mala", meaning: "garland" },
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
    { word: "Hala", rootId: "hala", meaning: "plow" },
    { word: "āsana", rootId: "asana", meaning: "pose" },
  ],
  "reverse-warrior": [
    { word: "Viparīta", rootId: "viparita", meaning: "reversed" },
    { word: "Vīrabhadra", rootId: "virabhadra", meaning: "fierce warrior" },
    { word: "āsana", rootId: "asana", meaning: "pose" },
  ],
  "halfway-lift": [
    { word: "Ardha", rootId: "ardha", meaning: "half" },
    { word: "Uttāna", rootId: "uttana", meaning: "intense stretch" },
    { word: "āsana", rootId: "asana", meaning: "pose" },
  ],
  "low-plank": [
    { word: "Catur", rootId: "catur", meaning: "four" },
    { word: "aṅga", rootId: "anga", meaning: "limb" },
    { word: "Daṇḍa", rootId: "danda", meaning: "staff" },
    { word: "āsana", rootId: "asana", meaning: "pose" },
  ],
  "crescent-lunge": [
    { word: "Añjaneya", rootId: "anjaneya", meaning: "son of Añjanā (Hanumān)" },
    { word: "āsana", rootId: "asana", meaning: "pose" },
  ],
  "horse": [
    { word: "Utkaṭa", rootId: "utkata", meaning: "fierce" },
    { word: "Koṇa", rootId: "kona", meaning: "angle" },
    { word: "āsana", rootId: "asana", meaning: "pose" },
  ],
  "cat": [
    { word: "Mārjarya", rootId: "marjarya", meaning: "cat" },
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
    { word: "Tāḍa", rootId: "tada", meaning: "mountain" },
    { word: "āsana", rootId: "asana", meaning: "pose" },
  ],
  "baby-backbend": [
    { word: "Ardha", rootId: "ardha", meaning: "half" },
    { word: "Cakra", rootId: "cakra", meaning: "wheel" },
    { word: "āsana", rootId: "asana", meaning: "pose" },
  ],
  "star": [
    { word: "Utthita", rootId: "utthita", meaning: "extended" },
    { word: "Tāḍa", rootId: "tada", meaning: "mountain" },
    { word: "āsana", rootId: "asana", meaning: "pose" },
  ],
  "side-lunge": [
    { word: "Skanda", rootId: "skanda", meaning: "Skanda (a deity)" },
    { word: "āsana", rootId: "asana", meaning: "pose" },
  ],
  "table-top": [
    { word: "Bharmana", meaning: "wandering / on all fours" },
    { word: "āsana", rootId: "asana", meaning: "pose" },
  ],
  "gate": [
    { word: "Parigha", rootId: "parigha", meaning: "gate / iron beam" },
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
    { word: "Uttāna", rootId: "uttana", meaning: "intense stretch" },
    { word: "āsana", rootId: "asana", meaning: "pose" },
  ],
};

export const ROOT_CATEGORY_LABELS: Record<SanskritRoot["category"], { label: string; emoji: string }> = {
  number: { label: "Numbers", emoji: "🔢" },
  direction: { label: "Direction & Orientation", emoji: "🧭" },
  body: { label: "Body Parts", emoji: "🫀" },
  shape: { label: "Shapes & Animals", emoji: "🔷" },
  action: { label: "Actions", emoji: "⚡" },
  quality: { label: "Qualities", emoji: "✨" },
  core: { label: "Foundational", emoji: "🪷" },
  deity: { label: "Deities & Sages", emoji: "🕉️" },
  concept: { label: "Concepts & Practice", emoji: "🌬️" },
};

// Helper: find every pose whose breakdown references a given root id.
export function getPosesUsingRoot(rootId: string): string[] {
  const ids: string[] = [];
  for (const [poseId, tokens] of Object.entries(poseBreakdowns)) {
    if (tokens.some((t) => t.rootId === rootId)) ids.push(poseId);
  }
  return ids;
}

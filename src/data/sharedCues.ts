import type { CueCategory } from "@/lib/cueCategory";

export type SharedCue = {
  id: string;
  cue: string;
  category: CueCategory;
  teachingNote: string;
  poseIds: string[];
};

/**
 * Universal cues that recur across many poses.
 * Helps new teachers see how a single instruction transfers between shapes.
 */
export const sharedCues: SharedCue[] = [
  {
    id: "sweep-arms-overhead",
    cue: "Sweep your arms up overhead",
    category: "action",
    teachingNote:
      "Anywhere the spine is upright or extending, this cue lengthens the side body and lifts the chest.",
    poseIds: [
      "mountain",
      "chair",
      "warrior-1",
      "crescent-lunge",
      "twisted-chair",
      "horse",
      "star",
      "baby-backbend",
    ],
  },
  {
    id: "gaze-down-lengthen-neck",
    cue: "Gaze at your mat to lengthen the back of your neck",
    category: "gaze",
    teachingNote:
      "Use whenever the torso is parallel to the floor — keeps the cervical spine in line with the rest of the spine.",
    poseIds: [
      "plank",
      "low-plank",
      "table-top",
      "warrior-3",
      "crow",
      "low-lunge",
      "halfway-lift",
      "three-legged-dog",
      "cat",
      "cow",
    ],
  },
  {
    id: "root-four-corners",
    cue: "Root down through the four corners of your feet",
    category: "setup",
    teachingNote:
      "Establishes a stable base for any standing pose by spreading weight across the big-toe mound, little-toe mound, inner heel, and outer heel.",
    poseIds: [
      "mountain",
      "chair",
      "warrior-1",
      "warrior-2",
      "triangle",
      "tree",
      "horse",
      "star",
      "extended-side-angle",
      "garland",
    ],
  },
  {
    id: "draw-navel-in-up",
    cue: "Draw your navel in and up",
    category: "action",
    teachingNote:
      "Engages the deep core to protect the lower back; essential anywhere the spine is unsupported.",
    poseIds: [
      "plank",
      "low-plank",
      "boat",
      "crow",
      "warrior-3",
      "side-plank",
      "headstand",
      "halfway-lift",
      "table-top",
    ],
  },
  {
    id: "shoulders-away-ears",
    cue: "Slide your shoulders away from your ears",
    category: "action",
    teachingNote:
      "Creates space in the neck and engages the lower trapezius — useful in any weight-bearing arm pose or backbend.",
    poseIds: [
      "downward-dog",
      "plank",
      "side-plank",
      "cobra",
      "sphinx",
      "upward-dog",
      "headstand",
      "bridge",
      "camel",
      "warrior-1",
    ],
  },
  {
    id: "stack-knee-over-ankle",
    cue: "Stack your front knee directly over your ankle",
    category: "checkpoint",
    teachingNote:
      "Protects the knee joint in any lunge or warrior shape by keeping the shin vertical.",
    poseIds: [
      "warrior-1",
      "warrior-2",
      "extended-side-angle",
      "crescent-lunge",
      "low-lunge",
      "crescent-lunge-twist",
      "crescent-lunge-airplane",
      "side-lunge",
      "reverse-warrior",
    ],
  },
  {
    id: "lift-chest-toward-sky",
    cue: "Lift your chest toward the sky",
    category: "action",
    teachingNote:
      "Cues thoracic extension in backbends and heart-openers without crunching the lower back.",
    poseIds: [
      "cobra",
      "upward-dog",
      "camel",
      "bridge",
      "fish",
      "sphinx",
      "baby-backbend",
      "cow",
      "reverse-warrior",
      "dancer",
    ],
  },
  {
    id: "press-floor-away",
    cue: "Press the floor away from you with your hands",
    category: "action",
    teachingNote:
      "Activates the serratus anterior in any arm-bearing pose, broadening the upper back and protecting the shoulders.",
    poseIds: [
      "downward-dog",
      "plank",
      "table-top",
      "three-legged-dog",
      "cat",
      "puppy",
      "low-plank",
      "side-plank",
      "crow",
    ],
  },
  {
    id: "soften-jaw-throat",
    cue: "Soften your jaw and throat",
    category: "intention",
    teachingNote:
      "A universal release cue — invites parasympathetic calm in any held shape, especially restorative ones.",
    poseIds: [
      "childs-pose",
      "corpse",
      "happy-baby",
      "legs-up-wall",
      "easy-seat",
      "supine-twist",
      "seated-forward-fold",
      "pigeon",
      "puppy",
    ],
  },
  {
    id: "hug-midline",
    cue: "Hug your inner thighs toward the midline",
    category: "action",
    teachingNote:
      "Engages the adductors to create stability and lift through the pelvic floor in standing balances and inversions.",
    poseIds: [
      "mountain",
      "warrior-3",
      "tree",
      "headstand",
      "shoulderstand",
      "plow",
      "chair",
      "boat",
      "half-moon",
      "dancer",
    ],
  },
  {
    id: "lengthen-tailbone-down",
    cue: "Lengthen your tailbone toward the floor",
    category: "action",
    teachingNote:
      "Neutralizes the pelvis and prevents lumbar compression in standing poses and backbends alike.",
    poseIds: [
      "mountain",
      "chair",
      "warrior-1",
      "warrior-2",
      "crescent-lunge",
      "bridge",
      "camel",
      "cobra",
      "horse",
    ],
  },
  {
    id: "spread-fingers-wide",
    cue: "Spread your fingers wide and press through every knuckle",
    category: "setup",
    teachingNote:
      "Distributes weight across the whole hand to protect the wrists in any weight-bearing arm pose.",
    poseIds: [
      "downward-dog",
      "plank",
      "side-plank",
      "crow",
      "table-top",
      "three-legged-dog",
      "cat",
      "cow",
      "upward-dog",
      "low-plank",
    ],
  },
];

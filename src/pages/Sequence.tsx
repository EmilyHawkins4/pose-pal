import { useState, useMemo } from "react";
import { AnimatePresence } from "framer-motion";
import { Plus, Play, Trash2, X, Search, GripVertical, Sparkles } from "lucide-react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { poses, type YogaPose } from "@/data/poses";
import { useLanguagePreference } from "@/hooks/useLanguagePreference";
import BottomNav from "@/components/BottomNav";
import LanguageToggle from "@/components/LanguageToggle";
import SequencePlayer from "@/components/SequencePlayer";
import { Input } from "@/components/ui/input";

interface SequenceItem {
  uid: string;
  poseId: string;
}

const PRESET_SEQUENCES: { id: string; name: string; description: string; poseIds: string[] }[] = [
  {
    id: "sun-a",
    name: "Sun Salutation A",
    description: "Sūrya Namaskāra A",
    poseIds: [
      "mountain",
      "forward-fold",
      "halfway-lift",
      "plank",
      "low-plank",
      "upward-dog",
      "downward-dog",
      "halfway-lift",
      "forward-fold",
      "mountain",
    ],
  },
  {
    id: "sun-b",
    name: "Sun Salutation B",
    description: "Sūrya Namaskāra B",
    poseIds: [
      "mountain",
      "chair",
      "forward-fold",
      "halfway-lift",
      "plank",
      "low-plank",
      "upward-dog",
      "downward-dog",
      "warrior-1",
      "plank",
      "low-plank",
      "upward-dog",
      "downward-dog",
      "warrior-1",
      "plank",
      "low-plank",
      "upward-dog",
      "downward-dog",
      "forward-fold",
      "halfway-lift",
      "mountain",
    ],
  },
];

function makeUid(poseId: string, i: number) {
  return `${poseId}-${Date.now()}-${i}-${Math.random().toString(36).slice(2, 7)}`;
}

function SortableRow({
  item,
  pose,
  language,
  position,
  onRemove,
}: {
  item: SequenceItem;
  pose: YogaPose;
  language: "english" | "sanskrit" | "both";
  position: number;
  onRemove: () => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: item.uid,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="group flex items-center gap-3 rounded-lg bg-card shadow-soft hover:shadow-card transition-shadow p-2 pr-3"
    >
      <button
        {...attributes}
        {...listeners}
        className="touch-none cursor-grab active:cursor-grabbing text-muted-foreground hover:text-foreground p-1"
        aria-label="Drag to reorder"
      >
        <GripVertical className="w-4 h-4" />
      </button>
      <span className="text-xs font-body w-6 h-6 rounded-full bg-sage-light text-foreground flex items-center justify-center font-semibold shrink-0">
        {position}
      </span>
      <div className="w-12 h-12 rounded-md bg-sage-light flex items-center justify-center shrink-0">
        <img src={pose.image} alt={pose.englishName} className="w-full h-full object-contain p-1" />
      </div>
      <div className="flex-1 min-w-0">
        {language === "sanskrit" ? (
          <p className="font-display text-sm leading-tight truncate">{pose.sanskritName}</p>
        ) : language === "english" ? (
          <p className="font-display text-sm leading-tight truncate">{pose.englishName}</p>
        ) : (
          <>
            <p className="font-display text-sm leading-tight truncate">{pose.englishName}</p>
            <p className="text-[11px] text-muted-foreground font-body truncate">{pose.sanskritName}</p>
          </>
        )}
      </div>
      <button
        onClick={onRemove}
        className="p-1.5 rounded-full text-muted-foreground hover:bg-destructive hover:text-destructive-foreground transition-colors shrink-0"
        aria-label="Remove from sequence"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}

function BrowseRow({
  pose,
  language,
  onAdd,
}: {
  pose: YogaPose;
  language: "english" | "sanskrit" | "both";
  onAdd: () => void;
}) {
  return (
    <button
      onClick={onAdd}
      className="group w-full flex items-center gap-3 text-left rounded-lg bg-card shadow-soft hover:shadow-card transition-all p-2 active:scale-[0.99]"
    >
      <div className="w-12 h-12 rounded-md bg-sage-light flex items-center justify-center shrink-0">
        <img src={pose.image} alt={pose.englishName} className="w-full h-full object-contain p-1" />
      </div>
      <div className="flex-1 min-w-0">
        {language === "sanskrit" ? (
          <p className="font-display text-sm leading-tight truncate">{pose.sanskritName}</p>
        ) : language === "english" ? (
          <p className="font-display text-sm leading-tight truncate">{pose.englishName}</p>
        ) : (
          <>
            <p className="font-display text-sm leading-tight truncate">{pose.englishName}</p>
            <p className="text-[11px] text-muted-foreground font-body truncate">{pose.sanskritName}</p>
          </>
        )}
      </div>
      <span className="w-7 h-7 rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground flex items-center justify-center transition-colors shrink-0">
        <Plus className="w-4 h-4" />
      </span>
    </button>
  );
}

export default function Sequence() {
  const { language, setLanguage } = useLanguagePreference();
  const [sequence, setSequence] = useState<SequenceItem[]>([]);
  const [playerOpen, setPlayerOpen] = useState(false);
  const [search, setSearch] = useState("");

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 150, tolerance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const poseMap = useMemo(() => new Map(poses.map((p) => [p.id, p])), []);

  const filteredPoses = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return poses;
    return poses.filter(
      (p) =>
        p.englishName.toLowerCase().includes(q) ||
        p.sanskritName.toLowerCase().includes(q)
    );
  }, [search]);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setSequence((items) => {
        const oldIndex = items.findIndex((i) => i.uid === active.id);
        const newIndex = items.findIndex((i) => i.uid === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const addPose = (poseId: string) => {
    setSequence((s) => [
      ...s,
      { uid: makeUid(poseId, s.length), poseId },
    ]);
  };

  const loadPreset = (preset: typeof PRESET_SEQUENCES[number]) => {
    setSequence(preset.poseIds.map((poseId, i) => ({ uid: makeUid(poseId, i), poseId })));
  };

  const removePose = (uid: string) => {
    setSequence((s) => s.filter((i) => i.uid !== uid));
  };

  const sequencePoses = sequence
    .map((item) => ({ item, pose: poseMap.get(item.poseId) }))
    .filter((x): x is { item: SequenceItem; pose: YogaPose } => !!x.pose);

  return (
    <div className="min-h-screen bg-background pb-20">
      <header className="sticky top-0 z-30 bg-background/90 backdrop-blur-lg border-b border-border">
        <div className="px-4 py-3 flex items-center justify-between gap-2">
          <div>
            <h1 className="font-display text-2xl font-semibold leading-tight">Sequence</h1>
            <p className="text-xs text-muted-foreground font-body">
              {sequence.length} {sequence.length === 1 ? "pose" : "poses"}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <LanguageToggle language={language} onChange={setLanguage} />
            {sequence.length > 0 && (
              <button
                onClick={() => setSequence([])}
                className="p-2 text-muted-foreground hover:text-destructive transition-colors"
                aria-label="Clear sequence"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      </header>

      <main className="grid grid-cols-1 md:grid-cols-[320px_1fr] gap-4 px-4 py-4 md:h-[calc(100vh-8.5rem)]">
        {/* Left side panel: Browse */}
        <section className="flex flex-col min-h-0 rounded-xl border border-border bg-card/40">
          <div className="p-3 border-b border-border">
            <h2 className="font-display text-base font-semibold mb-2">Browse poses</h2>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search poses…"
                className="pl-9 h-9"
              />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto p-2 space-y-1.5 max-h-[60vh] md:max-h-none">
            {filteredPoses.length === 0 ? (
              <p className="text-center text-sm text-muted-foreground py-8 font-body">No poses match.</p>
            ) : (
              filteredPoses.map((pose) => (
                <BrowseRow
                  key={pose.id}
                  pose={pose}
                  language={language}
                  onAdd={() => addPose(pose.id)}
                />
              ))
            )}
          </div>
        </section>

        {/* Right side: Current sequence */}
        <section className="flex flex-col min-h-0 rounded-xl border border-border bg-card/40">
          <div className="p-3 border-b border-border flex items-center justify-between">
            <h2 className="font-display text-base font-semibold">Your sequence</h2>
            <p className="text-xs text-muted-foreground font-body">Drag to reorder</p>
          </div>
          <div className="flex-1 overflow-y-auto p-3">
            {sequence.length === 0 ? (
              <div className="h-full min-h-[240px] flex items-center justify-center">
                <div className="text-center">
                  <div className="w-14 h-14 mx-auto mb-3 rounded-full bg-sage-light flex items-center justify-center">
                    <Plus className="w-7 h-7 text-primary" />
                  </div>
                  <p className="text-sm text-muted-foreground font-body max-w-xs mx-auto">
                    Tap any pose on the left to add it. Drag rows to reorder.
                  </p>
                </div>
              </div>
            ) : (
              <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                <SortableContext
                  items={sequence.map((i) => i.uid)}
                  strategy={verticalListSortingStrategy}
                >
                  <div className="space-y-2">
                    {sequencePoses.map(({ item, pose }, i) => (
                      <SortableRow
                        key={item.uid}
                        item={item}
                        pose={pose}
                        language={language}
                        position={i + 1}
                        onRemove={() => removePose(item.uid)}
                      />
                    ))}
                  </div>
                </SortableContext>
              </DndContext>
            )}
          </div>
        </section>
      </main>

      {/* Floating play button */}
      {sequence.length > 0 && (
        <div className="fixed bottom-20 left-0 right-0 z-40 px-4 pointer-events-none">
          <div className="flex items-center justify-end">
            <button
              onClick={() => setPlayerOpen(true)}
              className="pointer-events-auto inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-accent text-accent-foreground font-body font-medium shadow-card"
            >
              <Play className="w-4 h-4" /> Play
            </button>
          </div>
        </div>
      )}

      {/* Full-screen player */}
      <AnimatePresence>
        {playerOpen && sequencePoses.length > 0 && (
          <SequencePlayer
            poses={sequencePoses.map((s) => s.pose)}
            onClose={() => setPlayerOpen(false)}
          />
        )}
      </AnimatePresence>

      <BottomNav />
    </div>
  );
}

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Play, Trash2, GripVertical, X, Search } from "lucide-react";
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

function SortableRow({
  item,
  pose,
  language,
  onRemove,
}: {
  item: SequenceItem;
  pose: YogaPose;
  language: "english" | "sanskrit" | "both";
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
      className="flex items-center gap-3 bg-card rounded-lg shadow-soft p-2 pr-3"
    >
      <button
        {...attributes}
        {...listeners}
        className="touch-none p-2 text-muted-foreground hover:text-foreground cursor-grab active:cursor-grabbing"
        aria-label="Drag to reorder"
      >
        <GripVertical className="w-5 h-5" />
      </button>
      <div className="w-12 h-12 bg-sage-light rounded-md flex items-center justify-center shrink-0 overflow-hidden">
        <img src={pose.image} alt={pose.englishName} className="w-full h-full object-contain" />
      </div>
      <div className="flex-1 min-w-0">
        {language === "sanskrit" ? (
          <p className="font-display text-base truncate">{pose.sanskritName}</p>
        ) : language === "english" ? (
          <p className="font-display text-base truncate">{pose.englishName}</p>
        ) : (
          <>
            <p className="font-display text-base truncate leading-tight">{pose.englishName}</p>
            <p className="text-xs text-muted-foreground font-body truncate">{pose.sanskritName}</p>
          </>
        )}
      </div>
      <button
        onClick={onRemove}
        className="p-2 text-muted-foreground hover:text-destructive transition-colors"
        aria-label="Remove from sequence"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}

export default function Sequence() {
  const { language, setLanguage } = useLanguagePreference();
  const [sequence, setSequence] = useState<SequenceItem[]>([]);
  const [pickerOpen, setPickerOpen] = useState(false);
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
    setSequence((s) => [...s, { uid: `${poseId}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`, poseId }]);
  };

  const removePose = (uid: string) => {
    setSequence((s) => s.filter((i) => i.uid !== uid));
  };

  const sequencePoses = sequence
    .map((item) => ({ item, pose: poseMap.get(item.poseId) }))
    .filter((x): x is { item: SequenceItem; pose: YogaPose } => !!x.pose);

  return (
    <div className="min-h-screen bg-background pb-24">
      <header className="sticky top-0 z-30 bg-background/90 backdrop-blur-lg border-b border-border">
        <div className="max-w-lg mx-auto px-4 py-3 flex items-center justify-between gap-2">
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

      <main className="max-w-lg mx-auto px-4 py-4">
        {sequence.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-sage-light flex items-center justify-center">
              <Plus className="w-10 h-10 text-primary" />
            </div>
            <h2 className="font-display text-xl mb-2">Build your flow</h2>
            <p className="text-sm text-muted-foreground font-body max-w-xs mx-auto mb-6">
              Add poses, drag to reorder, then play through pose-by-pose.
            </p>
            <button
              onClick={() => setPickerOpen(true)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary text-primary-foreground font-body font-medium shadow-soft hover:shadow-card transition-shadow"
            >
              <Plus className="w-4 h-4" /> Add poses
            </button>
          </div>
        ) : (
          <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext items={sequence.map((i) => i.uid)} strategy={verticalListSortingStrategy}>
              <div className="space-y-2">
                {sequencePoses.map(({ item, pose }) => (
                  <SortableRow
                    key={item.uid}
                    item={item}
                    pose={pose}
                    language={language}
                    onRemove={() => removePose(item.uid)}
                  />
                ))}
              </div>
            </SortableContext>
          </DndContext>
        )}
      </main>

      {/* Floating actions */}
      {sequence.length > 0 && (
        <div className="fixed bottom-20 left-0 right-0 z-40 px-4 pointer-events-none">
          <div className="max-w-lg mx-auto flex items-center justify-between gap-3">
            <button
              onClick={() => setPickerOpen(true)}
              className="pointer-events-auto inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-card text-foreground font-body font-medium shadow-card border border-border"
            >
              <Plus className="w-4 h-4" /> Add
            </button>
            <button
              onClick={() => setPlayerOpen(true)}
              className="pointer-events-auto inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-accent text-accent-foreground font-body font-medium shadow-card"
            >
              <Play className="w-4 h-4" /> Play
            </button>
          </div>
        </div>
      )}

      {/* Pose picker sheet */}
      <AnimatePresence>
        {pickerOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setPickerOpen(false)}
              className="fixed inset-0 z-50 bg-foreground/40 backdrop-blur-sm"
            />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 280 }}
              className="fixed inset-x-0 bottom-0 z-50 bg-background rounded-t-2xl shadow-card max-h-[85vh] flex flex-col"
            >
              <div className="px-4 pt-3 pb-2 border-b border-border">
                <div className="w-10 h-1 bg-border rounded-full mx-auto mb-3" />
                <div className="flex items-center justify-between mb-3">
                  <h2 className="font-display text-xl font-semibold">Add poses</h2>
                  <button
                    onClick={() => setPickerOpen(false)}
                    className="p-1.5 text-muted-foreground hover:text-foreground"
                    aria-label="Close"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search poses…"
                    className="pl-9"
                  />
                </div>
              </div>
              <div className="flex-1 overflow-y-auto p-3">
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2">
                  {filteredPoses.map((pose) => (
                    <button
                      key={pose.id}
                      onClick={() => addPose(pose.id)}
                      className="text-left bg-card rounded-lg shadow-soft hover:shadow-card transition-shadow overflow-hidden active:scale-[0.98]"
                    >
                      <div className="aspect-square bg-sage-light flex items-center justify-center p-2">
                        <img src={pose.image} alt={pose.englishName} className="w-full h-full object-contain" />
                      </div>
                      <div className="p-1.5">
                        <p className="font-display text-xs leading-tight truncate">{pose.englishName}</p>
                        <p className="text-[10px] text-muted-foreground font-body truncate">{pose.sanskritName}</p>
                      </div>
                    </button>
                  ))}
                </div>
                {filteredPoses.length === 0 && (
                  <p className="text-center text-sm text-muted-foreground py-8 font-body">No poses match.</p>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

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

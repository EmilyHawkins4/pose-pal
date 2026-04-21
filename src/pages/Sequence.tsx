import { useState, useMemo } from "react";
import { AnimatePresence } from "framer-motion";
import { Plus, Play, Trash2, X, Search } from "lucide-react";
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
  horizontalListSortingStrategy,
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

function SortableCard({
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
      {...attributes}
      {...listeners}
      className="group relative shrink-0 w-32 rounded-lg bg-card shadow-soft hover:shadow-card transition-shadow overflow-hidden touch-none cursor-grab active:cursor-grabbing"
    >
      <div className="relative aspect-square bg-sage-light flex items-center justify-center p-2">
        <img
          src={pose.image}
          alt={pose.englishName}
          className="w-full h-full object-contain pointer-events-none"
        />
        <span className="absolute top-1.5 left-1.5 text-[10px] font-body w-5 h-5 rounded-full bg-background/80 backdrop-blur-sm text-foreground flex items-center justify-center font-semibold">
          {position}
        </span>
        <button
          onPointerDown={(e) => e.stopPropagation()}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onRemove();
          }}
          className="absolute top-1.5 right-1.5 p-1 rounded-full bg-background/80 backdrop-blur-sm hover:bg-destructive hover:text-destructive-foreground transition-colors"
          aria-label="Remove from sequence"
        >
          <X className="w-3 h-3" />
        </button>
      </div>
      <div className="p-2">
        {language === "sanskrit" ? (
          <p className="font-display text-xs leading-tight truncate">{pose.sanskritName}</p>
        ) : language === "english" ? (
          <p className="font-display text-xs leading-tight truncate">{pose.englishName}</p>
        ) : (
          <>
            <p className="font-display text-xs leading-tight truncate">{pose.englishName}</p>
            <p className="text-[10px] text-muted-foreground font-body truncate">{pose.sanskritName}</p>
          </>
        )}
      </div>
    </div>
  );
}

function BrowseCard({
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
      className="group relative shrink-0 w-28 text-left rounded-lg bg-card shadow-soft hover:shadow-card transition-all overflow-hidden active:scale-[0.97]"
    >
      <div className="relative aspect-square bg-sage-light flex items-center justify-center p-2">
        <img src={pose.image} alt={pose.englishName} className="w-full h-full object-contain" />
        <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/10 transition-colors flex items-center justify-center">
          <div className="w-7 h-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-soft opacity-0 group-hover:opacity-100 transition-opacity">
            <Plus className="w-4 h-4" />
          </div>
        </div>
      </div>
      <div className="p-1.5">
        {language === "sanskrit" ? (
          <p className="font-display text-xs leading-tight truncate">{pose.sanskritName}</p>
        ) : language === "english" ? (
          <p className="font-display text-xs leading-tight truncate">{pose.englishName}</p>
        ) : (
          <>
            <p className="font-display text-xs leading-tight truncate">{pose.englishName}</p>
            <p className="text-[10px] text-muted-foreground font-body truncate">{pose.sanskritName}</p>
          </>
        )}
      </div>
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
      { uid: `${poseId}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`, poseId },
    ]);
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
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between gap-2">
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

      <main className="max-w-3xl mx-auto px-4 py-4 space-y-6">
        {/* Browse carousel */}
        <section>
          <div className="flex items-center justify-between mb-2">
            <h2 className="font-display text-lg font-semibold">Browse poses</h2>
            <p className="text-xs text-muted-foreground font-body">Tap to add</p>
          </div>
          <div className="relative mb-3">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search poses…"
              className="pl-9"
            />
          </div>
          {filteredPoses.length === 0 ? (
            <p className="text-center text-sm text-muted-foreground py-8 font-body">No poses match.</p>
          ) : (
            <div className="-mx-4 px-4 overflow-x-auto">
              <div className="flex gap-2 pb-2">
                {filteredPoses.map((pose) => (
                  <BrowseCard
                    key={pose.id}
                    pose={pose}
                    language={language}
                    onAdd={() => addPose(pose.id)}
                  />
                ))}
              </div>
            </div>
          )}
        </section>

        {/* Sequence */}
        <section>
          <h2 className="font-display text-lg font-semibold mb-2">Your sequence</h2>
          {sequence.length === 0 ? (
            <div className="text-center py-12 rounded-lg border border-dashed border-border">
              <div className="w-14 h-14 mx-auto mb-3 rounded-full bg-sage-light flex items-center justify-center">
                <Plus className="w-7 h-7 text-primary" />
              </div>
              <p className="text-sm text-muted-foreground font-body max-w-xs mx-auto">
                Tap any pose above to add it. Drag cards to reorder.
              </p>
            </div>
          ) : (
            <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
              <SortableContext
                items={sequence.map((i) => i.uid)}
                strategy={horizontalListSortingStrategy}
              >
                <div className="-mx-4 px-4 overflow-x-auto">
                  <div className="flex gap-2 pb-2">
                    {sequencePoses.map(({ item, pose }, i) => (
                      <SortableCard
                        key={item.uid}
                        item={item}
                        pose={pose}
                        language={language}
                        position={i + 1}
                        onRemove={() => removePose(item.uid)}
                      />
                    ))}
                  </div>
                </div>
              </SortableContext>
            </DndContext>
          )}
        </section>
      </main>

      {/* Floating play button */}
      {sequence.length > 0 && (
        <div className="fixed bottom-20 left-0 right-0 z-40 px-4 pointer-events-none">
          <div className="max-w-3xl mx-auto flex items-center justify-end">
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

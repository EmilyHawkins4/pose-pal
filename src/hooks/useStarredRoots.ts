import { useState, useCallback } from "react";

const STORAGE_KEY = "yoga-starred-roots";

function getStarred(): string[] {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  } catch {
    return [];
  }
}

/** Star/favorite Sanskrit roots. Persisted to localStorage. */
export function useStarredRoots() {
  const [starred, setStarred] = useState<string[]>(getStarred);

  const toggle = useCallback((rootId: string) => {
    setStarred((prev) => {
      const next = prev.includes(rootId) ? prev.filter((id) => id !== rootId) : [...prev, rootId];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const isStarred = useCallback((rootId: string) => starred.includes(rootId), [starred]);

  return { starred, toggle, isStarred };
}

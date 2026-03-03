import { useState, useCallback } from "react";

const STORAGE_KEY = "yoga-bookmarks";

function getBookmarks(): string[] {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  } catch {
    return [];
  }
}

export function useBookmarks() {
  const [bookmarks, setBookmarks] = useState<string[]>(getBookmarks);

  const toggle = useCallback((poseId: string) => {
    setBookmarks((prev) => {
      const next = prev.includes(poseId) ? prev.filter((id) => id !== poseId) : [...prev, poseId];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const isBookmarked = useCallback((poseId: string) => bookmarks.includes(poseId), [bookmarks]);

  return { bookmarks, toggle, isBookmarked };
}

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { LevelId, ProgressPayload, ScreenId, StationId } from "./types";

interface GameState extends ProgressPayload {
  screen: ScreenId;
  activeStation: StationId | null;
  roundSeed: number;
  setName: (name: string) => void;
  setLevel: (level: LevelId) => void;
  go: (screen: ScreenId) => void;
  openStation: (id: StationId) => void;
  completeStation: (id: StationId, clue: string, points: number) => void;
  certify: () => void;
  hydrate: (p: ProgressPayload) => void;
  resetCase: () => void;
  snapshot: () => ProgressPayload;
}

const empty: ProgressPayload = {
  detectiveName: "",
  level: "iniciante",
  completedStations: [],
  clues: {},
  score: 0,
  certified: false,
};

export const useGame = create<GameState>()(
  persist(
    (set, get) => ({
      ...empty,
      screen: "title",
      activeStation: null,
      roundSeed: Date.now(),
      setName: (detectiveName) => set({ detectiveName }),
      setLevel: (level) => set({ level, completedStations: [], clues: {}, score: 0, certified: false }),
      go: (screen) => set({ screen }),
      openStation: (id) =>
        set({ activeStation: id, screen: "station", roundSeed: Date.now() + Math.floor(Math.random() * 9999) }),
      completeStation: (id, clue, points) => {
        const { completedStations, clues, score } = get();
        if (completedStations.includes(id)) {
          set({ clues: { ...clues, [id]: clue }, screen: "hq", activeStation: null });
          return;
        }
        set({
          completedStations: [...completedStations, id],
          clues: { ...clues, [id]: clue },
          score: score + points,
          screen: id === "manuella" ? "certificate" : "hq",
          activeStation: null,
          certified: id === "manuella" ? true : get().certified,
        });
      },
      certify: () => set({ certified: true, screen: "certificate" }),
      hydrate: (p) => set({ ...p }),
      resetCase: () =>
        set({
          completedStations: [],
          clues: {},
          score: 0,
          certified: false,
          screen: "briefing",
          activeStation: null,
          roundSeed: Date.now(),
        }),
      snapshot: () => {
        const s = get();
        return {
          detectiveName: s.detectiveName,
          level: s.level,
          completedStations: s.completedStations,
          clues: s.clues,
          score: s.score,
          certified: s.certified,
        };
      },
    }),
    { name: "dlp-progress-v1", partialize: (s) => ({
      detectiveName: s.detectiveName,
      level: s.level,
      completedStations: s.completedStations,
      clues: s.clues,
      score: s.score,
      certified: s.certified,
    }) },
  ),
);

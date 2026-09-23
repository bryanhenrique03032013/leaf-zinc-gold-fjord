export type LevelId = "iniciante" | "intermediario" | "enem";
export type StationId = "anne" | "bryan" | "bedin" | "gabriel" | "manuella";
export type ScreenId = "title" | "briefing" | "hq" | "station" | "certificate";

export const STATION_ORDER: StationId[] = [
  "anne",
  "bryan",
  "bedin",
  "gabriel",
  "manuella",
];

export const LEVELS: { id: LevelId; label: string; blurb: string }[] = [
  {
    id: "iniciante",
    label: "Iniciante",
    blurb: "Erros evidentes. Ideal para treinar o olho.",
  },
  {
    id: "intermediario",
    label: "Intermediário",
    blurb: "Regência, crase e interpretação.",
  },
  {
    id: "enem",
    label: "ENEM",
    blurb: "Sutilezas de redação nota 1000.",
  },
];

export interface ProgressPayload {
  detectiveName: string;
  level: LevelId;
  completedStations: StationId[];
  clues: Partial<Record<StationId, string>>;
  score: number;
  certified: boolean;
}

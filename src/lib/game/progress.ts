import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { authMiddleware } from "@/lib/auth/middleware";
import { getSql } from "@/lib/db";
import type { LevelId, ProgressPayload, StationId } from "./types";

const payloadSchema = z.object({
  detectiveName: z.string().max(80),
  level: z.enum(["iniciante", "intermediario", "enem"]),
  completedStations: z.array(
    z.enum(["anne", "bryan", "bedin", "gabriel", "manuella"]),
  ),
  clues: z.record(z.string(), z.string()),
  score: z.number().int().min(0).max(5000),
  certified: z.boolean(),
});

export const getProgress = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const sql = await getSql();
    const rows = await sql<{
      detective_name: string;
      level: string;
      completed_stations: StationId[] | string;
      clues: Record<string, string> | string;
      score: number;
      certified: boolean;
    }>`
      select detective_name, level, completed_stations, clues, score, certified
      from detective_progress
      where user_id = ${context.userId}
    `;
    const row = rows[0];
    if (!row) return null;
    const completed =
      typeof row.completed_stations === "string"
        ? (JSON.parse(row.completed_stations) as StationId[])
        : row.completed_stations;
    const clues =
      typeof row.clues === "string"
        ? (JSON.parse(row.clues) as Record<string, string>)
        : row.clues;
    return {
      detectiveName: row.detective_name,
      level: row.level as LevelId,
      completedStations: completed,
      clues,
      score: Number(row.score),
      certified: Boolean(row.certified),
    } satisfies ProgressPayload;
  });

export const saveProgress = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator(payloadSchema)
  .handler(async ({ context, data }) => {
    const sql = await getSql();
    const completed = JSON.stringify(data.completedStations);
    const clues = JSON.stringify(data.clues);
    await sql`
      insert into detective_progress (
        user_id, detective_name, level, completed_stations, clues, score, certified, updated_at
      ) values (
        ${context.userId}, ${data.detectiveName}, ${data.level},
        ${completed}::jsonb, ${clues}::jsonb, ${data.score}, ${data.certified}, now()
      )
      on conflict (user_id) do update set
        detective_name = excluded.detective_name,
        level = excluded.level,
        completed_stations = excluded.completed_stations,
        clues = excluded.clues,
        score = excluded.score,
        certified = excluded.certified,
        updated_at = now()
    `;
    return { ok: true as const };
  });

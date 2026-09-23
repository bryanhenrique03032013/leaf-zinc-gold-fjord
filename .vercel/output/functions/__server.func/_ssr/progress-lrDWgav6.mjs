import { r as createServerFn } from "./ssr.mjs";
import { t as createServerRpc } from "./createServerRpc-CcvdN_gc.mjs";
import { A as boolean, D as _enum, F as object, L as record, P as number, R as string, k as array } from "../_libs/@better-auth/core+[...].mjs";
import { r as getSql } from "./db-DqFqaIMc.mjs";
import { t as authMiddleware } from "./middleware-DB1X0hm1.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/progress-lrDWgav6.js
var payloadSchema = object({
	detectiveName: string().max(80),
	level: _enum([
		"iniciante",
		"intermediario",
		"enem"
	]),
	completedStations: array(_enum([
		"anne",
		"bryan",
		"bedin",
		"gabriel",
		"manuella"
	])),
	clues: record(string(), string()),
	score: number().int().min(0).max(5e3),
	certified: boolean()
});
var getProgress_createServerFn_handler = createServerRpc({
	id: "1eb384ef09b83fd6fddaee213edb6af65eac98e36a8e0dbab7f93beede048233",
	name: "getProgress",
	filename: "src/lib/game/progress.ts"
}, (opts) => getProgress.__executeServer(opts));
var getProgress = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(getProgress_createServerFn_handler, async ({ context }) => {
	const row = (await (await getSql())`
      select detective_name, level, completed_stations, clues, score, certified
      from detective_progress
      where user_id = ${context.userId}
    `)[0];
	if (!row) return null;
	const completed = typeof row.completed_stations === "string" ? JSON.parse(row.completed_stations) : row.completed_stations;
	const clues = typeof row.clues === "string" ? JSON.parse(row.clues) : row.clues;
	return {
		detectiveName: row.detective_name,
		level: row.level,
		completedStations: completed,
		clues,
		score: Number(row.score),
		certified: Boolean(row.certified)
	};
});
var saveProgress_createServerFn_handler = createServerRpc({
	id: "a511ba3eeec90c26ed864141218723eded09ed746436ae6ccb6084aacfa6951d",
	name: "saveProgress",
	filename: "src/lib/game/progress.ts"
}, (opts) => saveProgress.__executeServer(opts));
var saveProgress = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator(payloadSchema).handler(saveProgress_createServerFn_handler, async ({ context, data }) => {
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
	return { ok: true };
});
//#endregion
export { getProgress_createServerFn_handler, saveProgress_createServerFn_handler };

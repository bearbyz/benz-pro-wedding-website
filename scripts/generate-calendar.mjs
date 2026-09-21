import { writeFile } from "node:fs/promises";
import { wedding } from "../src/data/wedding.ts";
import { buildCalendar } from "./calendar.mjs";

await writeFile(
  new URL("../public/benz-pro-wedding.ics", import.meta.url),
  buildCalendar(wedding),
  "utf8",
);
console.log("Generated public/benz-pro-wedding.ics from wedding data.");

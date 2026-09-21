import { test } from "node:test";
import assert from "node:assert/strict";
import { wedding } from "../src/data/wedding.ts";
import { buildCalendar } from "./calendar.mjs";

test("calendar preserves the Thai event and converts Bangkok time to UTC", () => {
  const calendar = buildCalendar(wedding);
  const unfolded = calendar.replace(/\r\n /g, "");
  assert.ok(unfolded.includes("DTSTART:20270130T013000Z\r\n"));
  assert.ok(unfolded.includes(wedding.bride.name));
  assert.ok(unfolded.includes(wedding.groom.name));
  assert.ok(unfolded.includes(wedding.mapsUrl));
  assert.ok(!unfolded.includes("DTEND"));
  assert.ok(calendar.endsWith("END:VCALENDAR\r\n"));
  for (const line of calendar.split("\r\n"))
    assert.ok(Buffer.byteLength(line, "utf8") <= 75);
});

test("calendar safely escapes separators and newlines in editable venue text", () => {
  const calendar = buildCalendar({
    ...wedding,
    venue: "เฮือน,คำ;หลวง\nลำปาง",
  }).replace(/\r\n /g, "");
  assert.ok(calendar.includes("LOCATION:เฮือน\\,คำ\\;หลวง\\nลำปาง"));
});

const encoder = new TextEncoder();

function escapeText(value) {
  return value
    .replace(/\\/g, "\\\\")
    .replace(/\r?\n/g, "\\n")
    .replace(/;/g, "\\;")
    .replace(/,/g, "\\,");
}

export function buildCalendar(wedding) {
  const start = new Date(wedding.dateISO)
    .toISOString()
    .replace(/[-:]/g, "")
    .replace(/\.\d{3}Z$/, "Z");
  const description = `ร่วมงานมงคลสมรส ${wedding.bride.name} และ ${wedding.groom.name}\nธีมสี แดง ครีม น้ำตาล (ล้านนา)\n${wedding.mapsUrl}`;
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Benz and Pro//Wedding Invitation//TH",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    "UID:benz-pro-20270130@wedding.local",
    "DTSTAMP:20260921T000000Z",
    `DTSTART:${start}`,
    `SUMMARY:${escapeText(`งานแต่งงาน ${wedding.bride.nickname} & ${wedding.groom.nickname}`)}`,
    `LOCATION:${escapeText(`${wedding.venue} ${wedding.address}`)}`,
    `DESCRIPTION:${escapeText(description)}`,
    `URL:${wedding.mapsUrl}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ];
  return (
    lines
      .map((line) => {
        let output = "",
          length = 0;
        for (const char of line) {
          const bytes = encoder.encode(char).length;
          if (length + bytes > 73) {
            output += "\r\n ";
            length = 1;
          }
          output += char;
          length += bytes;
        }
        return output;
      })
      .join("\r\n") + "\r\n"
  );
}

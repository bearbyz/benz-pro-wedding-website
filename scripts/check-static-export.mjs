import { readdir, readFile, stat } from "node:fs/promises";
import { join } from "node:path";

const base = process.env.NEXT_PUBLIC_BASE_PATH || "";
let checked = 0;
async function inspect(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const file = join(directory, entry.name);
    if (entry.isDirectory()) await inspect(file);
    else if (entry.name.endsWith(".html")) {
      const html = await readFile(file, "utf8");
      for (const match of html.matchAll(/(?:src|href)="(\/[^"\s]*)"/g)) {
        const url = match[1];
        if (url.startsWith("//")) continue;
        if (base && !url.startsWith(`${base}/`)) {
          throw new Error(`${file}: URL missing deployment prefix: ${url}`);
        }
        const path = decodeURIComponent(url.slice(base.length).split(/[?#]/)[0]);
        const target = join("out", path.endsWith("/") ? `${path}index.html` : path);
        if (!(await stat(target)).isFile()) throw new Error(`Missing exported file: ${target}`);
        checked++;
      }
    }
  }
}
await inspect("out");
console.log(`Verified ${checked} exported asset and page references (basePath: ${base || "/"}).`);

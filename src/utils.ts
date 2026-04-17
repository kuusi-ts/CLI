import { join } from "@std/path";
import type { File } from "./files.ts";

export function copyFiles(files: File[], projDir: string): void {
  for (const file of files) {
    if (file.dir) Deno.mkdirSync(join(projDir, file.dir));

    Deno.writeFileSync(
      join(projDir, file.name),
      new TextEncoder().encode(file.content),
    );
  }
}

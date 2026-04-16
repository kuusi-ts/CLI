import { copy } from "@std/fs";
import { join, toFileUrl } from "@std/path";
import { rgb24 } from "@std/fmt/colors";

export interface InitFlags {
  [x: string]: unknown;
  help: boolean;
  h: boolean;
  _: Array<string | number>;
}

export async function initProject(flags: InitFlags): Promise<void> {
  const projDir = String(flags._[0] ?? ".");
  let path = Deno.cwd();

  console.log(
    `Initializing a project in ${
      rgb24(join(path, projDir), { r: 100, g: 200, b: 100 })
    }`,
  );

  if (projDir !== ".") {
    try {
      Deno.mkdirSync(projDir);
    } catch (err) {
      console.log("An error occured while creating the project directory.");

      throw err;
    }
  }

  path = join(Deno.cwd(), projDir);

  await copy(toFileUrl(join(import.meta.url, "../../assets/")), path, {
    overwrite: true,
  });
}

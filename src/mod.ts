import { parseArgs } from "@std/cli";
import { join } from "@std/path";
import { defaultFiles, dockerFiles, type File } from "./files.ts";
import denoJsonData from "../deno.json" with { type: "json" };

interface Command {
  name: string;
  description: string;
  alias?: string;
}

const commands: Command[] = [
  {
    name: "help",
    description: "Helps you out!",
    alias: "h",
  },
  {
    name: "version",
    description: "Returns the version.",
    alias: "v",
  },
  {
    name: "docker",
    description: "Adds a simple Docker setup to your project.",
    alias: "d",
  },
];

const flags = parseArgs(Deno.args, {
  boolean: Object.keys(commands),
  default: {},
  alias: Object.fromEntries(commands.map(({ name, alias }) => [name, alias])),
});

if (flags.version) {
  console.log(`Kuusi init: ${denoJsonData.version}`);

  Deno.exit();
}

if (flags.help) {
  console.log("Kuusi init, here is help:");
  for (const command of commands) {
    console.log(`\t--${command.name}: ${command.description}`);
    if (command.alias) console.log(`\t -${command.alias}`);
  }

  console.log();

  Deno.exit();
}

const projDir = String(flags._[0] ?? ".");
const path = join(Deno.cwd(), projDir);

console.log(`Initializing a project in ${path}`);

if (projDir !== ".") Deno.mkdirSync(projDir);

function copyFiles(files: File[], projDir: string): void {
  for (const file of files) {
    if (file.dir) Deno.mkdirSync(join(projDir, file.dir));

    Deno.writeFileSync(
      join(projDir, file.name),
      new TextEncoder().encode(file.content),
    );
  }
}

copyFiles(defaultFiles, projDir);

if (flags.docker) copyFiles(dockerFiles, projDir);

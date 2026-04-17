import { parseArgs } from "@std/cli";
import { join } from "@std/path";
import { defaultFiles, dockerFiles } from "./files.ts";
import { copyFiles, multilog } from "./utils.ts";
import denoJsonData from "../deno.json" with { type: "json" };

const commands: {
  name: string;
  description: string;
  alias?: string;
}[] = [
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
  {
    name: "thing",
    description: "Adds a simple Docker setup to your project.",
  },
];

const aliases = [];

for (const command of commands) {
  if (command.alias) aliases.push([command.name, command.alias]);
}

const flags = parseArgs(Deno.args, {
  boolean: Object.keys(commands),
  alias: Object.fromEntries(aliases),
});

if (flags.version) {
  console.log(`Kuusi init: ${denoJsonData.version}`);

  Deno.exit();
}

if (flags.help) {
  console.log("Usage: deno run -Ar jsr:@kuusi/init [projectName] [flags]\n");

  for (const command of commands) {
    const fullAlias = command.alias ? ("-" + command.alias + ",") : "   ";
    console.log(`\t${fullAlias} --${command.name}: \t${command.description}`);
  }

  console.log();

  Deno.exit();
}

const projDir = String(flags._[0] ?? ".");
const path = join(Deno.cwd(), projDir);

console.log(`Initializing a project in ${path}`);

if (projDir !== ".") Deno.mkdirSync(projDir);

copyFiles(defaultFiles, projDir);

if (flags.docker) copyFiles(dockerFiles, projDir);

multilog(
  "To get started, run the following commands in your terminal:",
  `\tcd ${projDir}`,
  "\tdeno install",
  "\tdeno run dev"
)
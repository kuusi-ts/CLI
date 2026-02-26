import { copy } from "@std/fs";

interface Command {
  base: string;
  options: string[];
  exec: () => Promise<void> | void;
}

const commands: Command[] = [{
  base: "init",
  options: [],
  exec: async () => {
    console.log(`Initating a project at ${Deno.cwd()}`);

    await copy("../static/init/", Deno.cwd(), { overwrite: true });
  },
}];

console.log(Deno.args);

for (const command of commands) {
  if (Deno.args[0] === command.base) command.exec();
}

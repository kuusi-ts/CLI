import { copy } from "@std/fs";
import { join } from "@std/path";

type Command = {
  base: string;
  options: string[];
  exec: () => Promise<void>;
};

const initCommand: Command = {
  base: "init",
  options: [],
  exec: async () => {
    console.log("Initating a project", Deno.cwd());

    await copy("../static/init/", Deno.cwd(), { overwrite: true });

    new Deno.Command("deno add jsr:@kuusi/kuusi");
  },
};

if (Deno.args[0] === initCommand.base) initCommand.exec();

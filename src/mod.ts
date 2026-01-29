import { copy } from "@std/fs";

console.log(Deno.args);

type Command = {
  base: string;
  options: string[];
  exec: () => Promise<void>;
};

const initCommand: Command = {
  base: "init",
  options: [],
  exec: async () => {
    console.log("Initating a project");

    await copy("./static/init/", Deno.cwd());
  },
};

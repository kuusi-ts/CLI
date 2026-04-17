export type File = { dir?: string; name: string; content: string };

export const defaultFiles: File[] = [
  {
    name: "deno.json",
    content: `{
  "tasks": {
    "dev": "deno run --allow-env --allow-net --allow-read --watch src/index.ts",
    "prod": "deno run --allow-env --allow-net --allow-read  src/index.ts"
  },
  "imports": {
    "@kuusi/kuusi": "jsr:@kuusi/kuusi@^1.1.0"
  }
}
`,
  },
  {
    name: "kuusi.config.ts",
    content: `import { KuusiConfig } from "@kuusi/kuusi/types";

const config = new KuusiConfig({
  // Configure kuusi here
});

export default config;
`,
  },
  {
    dir: "src/",
    name: "src/index.ts",
    content: `import { getKuusiRoutes, kuusi } from "@kuusi/kuusi";

const routes = await getKuusiRoutes();

Deno.serve({ port: 1296 }, async function (req) {
  return await kuusi(req, routes);
});
`,
  },
  {
    dir: "routes/",
    name: "routes/index.source.ts",
    content: `import { WebSource } from "@kuusi/kuusi";

const route = new WebSource({
  GET: () => {
    return new Response(
      JSON.stringify({
        message: "Tervetuloa Kuusella!",
      }),
      {
        status: 200,
        headers: {
          "content-type": "application/json; charset=utf-8",
        },
      },
    );
  },
});

export default route;
`,
  },
];

export const dockerFiles: File[] = [
  {
    name: "Dockerfile", // Cockerfile
    content: `FROM denoland/deno:latest

WORKDIR /app

COPY . .

RUN deno install

CMD ["deno", "run", "--allow-net", "--allow-env", "--allow-read", "main.ts"]
`,
  },
];

FROM denoland/deno:latest

WORKDIR /app

COPY . .

RUN deno install

CMD ["deno", "run", "--allow-net", "--allow-env", "--allow-read", "main.ts"]

import { Route } from "@kuusi/kuusi";

export const route = new Route({
  GET: (req, patternResult) => {
    const nummeri = patternResult.pathname.groups.nummeri;

    return new Response(
      JSON.stringify({
        nummeri,
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

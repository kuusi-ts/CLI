import { WebSource } from "@kuusi/kuusi/types";

const route = new WebSource({
  GET: (req, patternResult) => {
    const id = patternResult.pathname.groups.id;

    return new Response(
      JSON.stringify({
        id,
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

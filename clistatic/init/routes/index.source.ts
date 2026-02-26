import { WebSource } from "@kuusi/kuusi/types";

const route = new WebSource({
  GET: (req, patternResult) => {
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

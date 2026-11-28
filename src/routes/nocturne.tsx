import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/nocturne")({
  beforeLoad: ({ location }) => {
    const search: Record<string, unknown> = { ...location.search };
    delete search.design;
    throw redirect({
      to: "/",
      search,
      hash: location.hash,
      statusCode: 301,
      replace: true,
    });
  },
});

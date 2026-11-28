import type { Design } from "@/data/cafe";

// The approved design is fixed on the server and client. Old URL selections,
// browser colour preferences, and saved light-mode choices cannot override it.
export function useDesign(): Design {
  return "nocturne";
}
export function useDesignSearch(): Record<string, never> {
  return {};
}

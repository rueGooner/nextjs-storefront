import { createClient } from "@sanity/client";

export const client = createClient({
  projectId: process.env.NEXT_SANITY_STUDIO_PROJECT_ID,
  dataset: process.env.NEXT_SANITY_STUDIO_DATASET,
  apiVersion: "2025-01-04",
  useCdn: true,
});

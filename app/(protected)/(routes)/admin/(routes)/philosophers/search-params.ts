import { createSearchParamsCache, parseAsString } from "nuqs/server";

// Define search param parsers that can be shared between client and server
export const philosophersSearchParams = {
  name: parseAsString.withDefault(""),
  era: parseAsString.withDefault("all"),
};

// Create a search params cache for server components
export const philosophersCache = createSearchParamsCache(
  philosophersSearchParams,
);

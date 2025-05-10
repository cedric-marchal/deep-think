import {
  createSearchParamsCache,
  parseAsArrayOf,
  parseAsString,
} from "nuqs/server";

export const philosopherFilterParams = {
  name: parseAsString.withDefault(""),
  eras: parseAsArrayOf(parseAsString).withDefault([]),
};

export const philosopherFilterParamsCache = createSearchParamsCache(
  philosopherFilterParams,
);

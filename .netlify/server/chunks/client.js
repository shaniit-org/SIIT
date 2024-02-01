import { createClient } from "@sanity/client";
const sanityClient = createClient({
  projectId: "za3lzlmc",
  dataset: "live",
  useCdn: false,
  // set to `true` to fetch from edge cache
  apiVersion: "2022-01-12"
  // use current date (YYYY-MM-DD) to target the latest API version
});
export {
  sanityClient as s
};

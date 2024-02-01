import { s as sanityClient } from "./client.js";
const pageQuery = (query) => query;
const getPageData = async (query, params) => {
  return await sanityClient.fetch(pageQuery(query), params ? params : {});
};
export {
  getPageData as g
};

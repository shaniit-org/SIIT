import { e as error } from "../../../../chunks/index.js";
import { g as getPageData } from "../../../../chunks/query.js";
const query = `*[_type =="term" && slug.current==$slug][0]`;
const load = async ({ params }) => {
  if (params.slug) {
    const data = await getPageData(query, {
      slug: params.slug
    });
    if (data)
      return { data };
    else
      throw error(404, "not found");
  }
  throw error(404, "not found");
};
export {
  load
};

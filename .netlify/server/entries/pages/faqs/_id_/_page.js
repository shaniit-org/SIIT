import { e as error } from "../../../../chunks/index.js";
import { g as getPageData } from "../../../../chunks/query.js";
const query = `*[_type =="faq" && _id==$id][0]`;
const load = async ({ params }) => {
  if (params.id) {
    const data = await getPageData(query, {
      id: params.id
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

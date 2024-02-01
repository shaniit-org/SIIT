import { g as getPageData } from "../../../chunks/query.js";
import { e as error } from "../../../chunks/index.js";
const query = `
  *[ _id=='donatePage'][0]{
    ...,
    "donors":*[_type=='donator'][0..100]{
          _id,
          "group":name,
          "value":amount
        }
      }
`;
const load = async () => {
  const data = await getPageData(query);
  if (!data)
    throw error(404, "Not Found");
  return {
    data
  };
};
export {
  load
};

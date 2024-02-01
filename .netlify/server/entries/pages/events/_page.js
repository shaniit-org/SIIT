import { g as getPageData } from "../../../chunks/query.js";
import { e as error } from "../../../chunks/index.js";
const query = `
  *[_id == 'eventsPage'][0]{
    ...,
    'events':*[_type =="event"][0...100]{
              "slug": slug.current,
                  title,
                  description,
                  coverImage ,
                  publishedAt,
                  categories[]->{ title , _id}
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

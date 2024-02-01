import { e as error } from "../../../../chunks/index.js";
import { g as getPageData } from "../../../../chunks/query.js";
const query = `*[_type =="event" && slug.current==$slug][0]{
    ...,
      "related": *[_type == "event" && _id != ^._id && count(categories[@._ref in ^.^.categories[]._ref]) > 0] | order(publishedAt desc, _createdAt desc) [0..2] {
          _type,
         title,
            coverImage,
         _id,
         "slug": slug.current,
         description,
       }
}`;
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

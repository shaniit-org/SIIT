import { g as getPageData } from "../../../chunks/query.js";
const query = `
    *[_id=="nlpPage"][0]{
        ...,
        "news" :*[_type=="news" && "NLP" in categories[]->title][0..5]{
            title,
              description,
              "slug":slug.current,
              publishedAt,
              coverImage
        }
    }
`;
const load = async () => {
  const data = await getPageData(query);
  return {
    data
  };
};
export {
  load
};

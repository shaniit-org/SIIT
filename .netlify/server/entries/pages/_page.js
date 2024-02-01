import { g as getPageData } from "../../chunks/query.js";
import { e as error } from "../../chunks/index.js";
const query = `{
  "homePage" : *[_id == 'homePage'][0]{
          ...,
      termsOfTheDay->{
          title,
          description,
          "slug":slug.current,
      },
       sections[] {
      	...,
        _type == 'Hero' => @->{
            _type,
            _key,
            heroImage,
            title,
        },

        _type == 'Highlight' => @->{
          "slug":slug.current,
          title,
          description,
            authors,
        },
      },
  },
  "events":*[_type =="event"] | order(publishedAt desc) [0...7] {
          "slug":slug.current,
          title,
          description,
          publishedAt,
          coverImage ,
    },
  "news":*[_type =="news"] | order(publishedAt desc)[0...7]  {
          "slug":slug.current,
          title,
          description,
          coverImage ,
          publishedAt
    },
}`;
const load = async () => {
  const data = await getPageData(query);
  if (!data.homePage)
    throw error(404, "Not Found");
  return {
    data
  };
};
export {
  load
};

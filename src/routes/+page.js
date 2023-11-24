import { getPageData } from '$lib/sanity/query';
import { error } from '@sveltejs/kit';

const query = `{
  "homePage" : *[_id == 'homePage'][0]{
       ...,
      'term': *[_type == 'term'][0]{title,description,slug,_createdAt},
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
  "events":*[_type =="event"] | order(publishedAt desc) [0...6] {
          "slug":slug.current,
          title,
          description,
          publishedAt
    },
  "news":*[_type =="news"] | order(publishedAt desc)[0...6]  {
          "slug":slug.current,
          title,
          description,
          coverImage ,
          publishedAt
    },
}`;

/**
 * @type {import('@sveltejs/kit').Load}
 */
export const load = async () => {
    /**
     * @type {import('$lib/types/homePage').HomePageData}
     */
    const data = await getPageData(query);
    if (!data.homePage) throw error(404, 'Not Found');
    return {
        data
    };
};

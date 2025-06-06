import { getPageData } from '$lib/sanity/query';
import { error } from '@sveltejs/kit';

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
          categories[]->{ title , _id}
    },
  "news":*[_type =="news"] | order(publishedAt desc)[0...7]  {
          "slug":slug.current,
          title,
          description,
          coverImage ,
          publishedAt,
          categories[]->{ title , _id}
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

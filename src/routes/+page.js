import { getPageData } from '$lib/sanity/query';

const query = `{
  "homePage" : *[_id == 'homePage'][0]{
       ...,
        'term': *[_type == 'term'][0]{title,description,slug},
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
        },
      },
  },
  "events":*[_type =="event"][0...5]{
          "slug":slug.current,
          title,
          description,
          publishedAt
    },
  "news":*[_type =="news"][0...5]{
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
	return {
		data
	};
};

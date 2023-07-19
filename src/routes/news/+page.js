import { getPageData } from '$lib/sanity/query';

const query = `
  *[_id == 'newsPage'][0]{
    ...,
        'news':*[_type =="news"][0...1000]{
              "slug": slug.current,
              title,
              description,
              coverImage ,
              publishedAt,
             categories[]->{ title , _id}
    }
  }
`;

export const load = async () => {
	/**
	 * @type {import('$lib/types').News[]} - data
	 */
	const data = await getPageData(query);
	return {
		data
	};
};

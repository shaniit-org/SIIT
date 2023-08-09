import { getPageData } from '$lib/sanity/query';
import { error } from '@sveltejs/kit';

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

export const load = async () => {
	/**
	 * @type {import('$lib/types').Event[]} - data
	 */
	const data = await getPageData(query);
	if (!data) throw error(404, 'Not Found');
	return {
		data
	};
};

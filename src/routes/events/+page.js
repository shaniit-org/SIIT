import { getPageData } from '$lib/sanity/query';

const query = `
*[_type =="event"][0...5]{
          "slug": slug.current,
          title,
          description,
          coverImage ,
          publishedAt,
        categories[]->{ title , _id}
}
`;

export const load = async () => {
	/**
	 * @type {import('$lib/types').Event[]} - data
	 */
	const data = await getPageData(query);
	console.log(data);
	return {
		data
	};
};

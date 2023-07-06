import { getPageData } from '$lib/sanity/query';

const query = `
  *[ _id=='contactPage'][0]
`;

/**
 * @type {import('@sveltejs/kit').Load}
 */
export const load = async () => {
	/**
	 * @type {import('$lib/types/contactPage').ContactPageData}
	 */
	const data = await getPageData(query);
	return {
		data
	};
};

import { getPageData } from '$lib/sanity/query';
import { error } from '@sveltejs/kit';
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
	if (!data) throw error(404, 'Not Found');
	return {
		data
	};
};

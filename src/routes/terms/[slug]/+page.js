import { error } from '@sveltejs/kit';
import { getPageData } from '$lib/sanity/query';

const query = `*[_type =="term" && slug.current==$slug][0]`;

/**
 * @type {import('@sveltejs/kit').Load}
 */
export const load = async ({ params }) => {
	/** @type {string} */
	if (params.slug) {
		/**
		 * @type {import('../../../lib/types/termPage').Term}
		 */
		const data = await getPageData(query, {
			slug: params.slug
		});
		if (data) return { data };
		else throw error(404, 'not found');
	}
	throw error(404, 'not found');
};

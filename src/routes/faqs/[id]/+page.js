import { error } from '@sveltejs/kit';
import { getPageData } from '$lib/sanity/query';

const query = `*[_type =="faq" && _id==$id][0]`;

/**
 * @type {import('@sveltejs/kit').Load}
 */
export const load = async ({ params }) => {
	/** @type {string} */
	if (params.id) {
		/**
		 * @type {import('$lib/types').EventDetail}
		 */
		const data = await getPageData(query, {
			id: params.id
		});
		if (data) return { data };
		else throw error(404, 'not found');
	}
	throw error(404, 'not found');
};

import { getPageData } from '$lib/sanity/query';

const query = `*[_id =="faqPage"][0]`;

/**
 * @type {import('@sveltejs/kit').Load}
 */
export const load = async () => {
	/**
	 * @type {import('$lib/types/faqPage').FAQList}
	 */
	const data = await getPageData(query);
	return {
		data
	};
};

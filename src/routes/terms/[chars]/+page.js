import { error } from '@sveltejs/kit';
import { getPageData } from '$lib/sanity/query';

const query = `
  *[_id == 'termsPage'][0]{
    ...,
  }
`;

export const load = async () => {
	/**
	 * @tytypespe {import('../../lib/types/termPage').TermPageData[]} - data
	 */
	const data = await getPageData(query);
	if (!data) throw error(404, 'Not Found');
	return {
		seo: data.seo
	};
};

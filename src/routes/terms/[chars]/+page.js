import { error } from '@sveltejs/kit';
import { getPageData } from '$lib/sanity/query';

const query = `
  *[_type == 'term' && character == $character]{
    ...,
  }
`;
/** @type {import('./$types').PageLoad} */
export const load = async ({ params }) => {
	const { chars: character } = params;
	/**
	 * @tytypespe {import('../../lib/types/termPage').TermPageData[]} - data
	 */
	const data = await getPageData(query, {
		character
	});
	if (!data) throw error(404, 'Not Found');
	return {
		seo: data.seo,
		data
	};
};

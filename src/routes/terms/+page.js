import { error } from '@sveltejs/kit';
import { getPageData } from '$lib/sanity/query';
import { groupByChar } from '$lib/utils/group-by-char';

const query = `
  *[_id == 'termsPage'][0]{
    ...,
    "terms": *[_type == "term"][0...1000]{
      ...,
      "slug": slug.current
    }
  }
`;

export const load = async () => {
	/**
	 * @tytypespe {import('../../lib/types/termPage').TermPageData[]} - data
	 */
	const data = await getPageData(query);
	if (!data) throw error(404, 'Not Found');
	const { grouped, chars } = groupByChar(data.terms);
	return {
		seo: data.seo,
		data: grouped,
		char: chars
	};
};

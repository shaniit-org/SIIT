import { getPageData } from '$lib/sanity/query';
import { groupByChar } from '$lib/utils/group-by-char';

const query = `
  *[_id == 'termsPage'][0]{
    ...,
    "terms": *[_type == "term"][0...1000]
  }
`;

export const load = async () => {
	/**
	 * @tytypespe {import('../../lib/types/termPage').TermPageData[]} - data
	 */
	const data = await getPageData(query);
	const { grouped, chars } = groupByChar(data.terms);
	return {
		seo: data.seo,
		data: grouped,
		char: chars
	};
};

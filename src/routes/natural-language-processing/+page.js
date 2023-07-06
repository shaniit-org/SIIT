import { getPageData } from '$lib/sanity/query';
const query = `
    *[_id=="nlpPage"][0]{
        ...,
        "news" :*[_type=="news" && "NLP" in categories[]->title][0..5]{
            title,
              description,
              "slug":slug.current,
              publishedAt,
              coverImage
        }
    }
`;

export const load = async () => {
	/**
	 * @type {import('$lib/types/nlpPage').NLPPage} - data
	 */
	const data = await getPageData(query);
	return {
		data
	};
};

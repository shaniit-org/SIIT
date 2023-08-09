import { getPageData } from '$lib/sanity/query';
import { error } from '@sveltejs/kit';

const query = `*[_type =="faqPage"][0]{
  ...,
   "faqs":faqs[]{
     category,
     qanda[]->{
       _id,
      question
     }
   }
}
`;
export const load = async () => {
	/**
	 * @type {import('$lib/types/faqPage').FaqPageData}
	 */
	const data = await getPageData(query);
	if (!data) throw error(404, 'Not Found');
	return {
		data
	};
};

import { getPageData } from '$lib/sanity/query';

const query = `*[_type =="faqPage"][0]{
  ...,
   "faqs":faqs[]{
     category,
     qanda[]->{
       _id,
      question
     }
   }
}`;
export const load = async () => {
    /**
     * @type {import('$lib/types/faqPage').FAQList}
     */
    const data = await getPageData(query);
    return {
        data
    };
};

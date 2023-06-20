import { getPageData } from '$lib/sanity/query';

const query = `*[_id =="faqPage"][0]`;

export const load = async () => {
    /**
     * @type {import('$lib/types/faqPage').FAQList}
     */
    const data = await getPageData(query);
    return {
        data
    };
};

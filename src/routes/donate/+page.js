import { getPageData } from '$lib/sanity/query';

const query = `
  *[ _id=='donatePage'][0]{
    ...,
  }
`;

/**
 * @type {import('@sveltejs/kit').Load}
 */
export const load = async () => {
    /**
     * @type {import('$lib/types/donatePage').DonatePageData}
     */
    const data = await getPageData(query);
    return {
        data
    };
};

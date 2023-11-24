import { getPageData } from '$lib/sanity/query';
import { error } from '@sveltejs/kit';

const query = `
  *[ _id=='donatePage'][0]{
    ...,
    "donors":*[_type=='donator'][0..100]{
          _id,
          "group":name,
          "value":amount
        }
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
	if (!data) throw error(404, 'Not Found');
	return {
		data
	};
};

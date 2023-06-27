import { getPageData } from '$lib/sanity/query';

const query = `
  *[ _id=='aboutPage'][0]{
    ...,
    "teamMembers":*[_type=="author" && isMember==true]{
      name,
      role,
     profile
    }
  }
`;

/**
 * @type {import('@sveltejs/kit').Load}
 */
export const load = async () => {
	/**
	 * @type {import('$lib/types/aboutPage').AboutPageData}
	 */
	const data = await getPageData(query);
	return {
		data
	};
};

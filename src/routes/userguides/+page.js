import { getPageData } from '$lib/sanity/query';
import { error } from '@sveltejs/kit';

const query = `
  *[_id == 'userGuidePage'][0]{
    ...,
          'userguides':  *[_type =="userguide"]{
           downloadlink,
          title,
          description,
          coverImage ,
          publishedAt,
        categories[]->{ title , _id}
  }
  }
`;

export const load = async () => {
    /**
     * @type {import('../../lib/types/userGuidesPage').UserGuidesPage} - data
     */
    const data = await getPageData(query);
    if (!data) throw error(404, 'Not Found');
    return {
        data
    };
};

import { getPageData } from '$lib/sanity/query';

const query = `
*[_type =="userguide"]{
           downloadlink,
          title,
          description,
          coverImage ,
          publishedAt,
        categories[]->{ title , _id}
}
`;

export const load = async () => {
    /**
     * @type {import('$lib/types').UserGuide[]} - data
     */
    const data = await getPageData(query);
    return {
        data
    };
};

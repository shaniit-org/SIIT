import { error } from '@sveltejs/kit';
import { getPageData } from '$lib/sanity/query';

const query = `*[_type =="event" && slug.current==$slug][0]{
    ...,
      "related": *[_type == "event" && _id != ^._id && count(categories[@._ref in ^.^.categories[]._ref]) > 0] | order(publishedAt desc, _createdAt desc) [0..2] {
          _type,
         title,
            coverImage,
         _id,
         "slug": slug.current,
         description,
       }
}`;

/**
 * @type {import('@sveltejs/kit').Load}
 */
export const load = async ({ params }) => {
    /** @type {string} */
    if (params.slug) {
        /**
         * @type {import('$lib/types').EventDetail}
         */
        const data = await getPageData(query, {
            slug: params.slug
        });
        if (data) return { data };
        else throw error(404, 'not found');
    }
    throw error(404, 'not found');
};

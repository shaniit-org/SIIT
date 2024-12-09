import { error } from '@sveltejs/kit';
import { getPageData } from '$lib/sanity/query';

const query = `*[_type =="news" && slug.current==$slug][0]{
 ...,
 "authors":authors[]->{
   _id,
   name,
   profile
 },
  "readingTime": round(length(pt::text(body)) / 5 / 180 ),
  "related": *[_type == "news" && _id != ^._id && count(categories[@._ref in ^.^.categories[]._ref]) > 0] | order(publishedAt desc, _createdAt desc) [0..2] {
     title,
     _id,
     "slug": slug.current,
     description,
     coverImage,
     categories[]->{ title , _id }
   }
}`;

/**
 * @type {import('@sveltejs/kit').Load}
 */
export const load = async ({ params }) => {
	/** @type {string} */
	if (params.slug) {
		/**
		 * @type {import('$lib/types').NewsDetail}
		 */
		const data = await getPageData(query, {
			slug: params.slug
		});
		if (data) return { data };
		else throw error(404, 'not found');
	}
	throw error(404, 'not found');
};

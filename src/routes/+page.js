import { getPageData } from '$lib/sanity/query';

const query = `{
  "homePage" : *[_id == 'homePage'][0],
  "events":*[_type =="event"][0...5]{
      "slug":slug.current,
      title,
      description,
      coverimage
    },
  "news":*[_type =="news"][0...5]{
      "slug":slug.current,
      title,
      description,
      coverimage
    },
}`;

/**
 * @type {import('@sveltejs/kit').Load}
 */
export const load = async () => {
	/**
	 * @type {import('$lib/types/homePage').HomePageData}
	 */
	const data = await getPageData(query);
	console.log(data, 'home');
	return {
		data
	};
};

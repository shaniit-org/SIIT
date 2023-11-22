import { searchClient } from '$lib/utils/algolia';
import { sanityClient } from '$lib/sanity/client';
const query = `{
        'news':*[_type =="news"][0...1000]{
             "objectID" : _id,
              "slug": slug.current,
              title,
              description
        },
        "events":*[_type =="event"][0...1000]{
                 "objectID" : _id,
                  "slug": slug.current,
                  title,
                  description
        }
}`;

/** @type {import('./$types').RequestHandler} */
export async function GET({ url }) {
	let secret = url.searchParams.get('secret');
	if (secret !== import.meta.env.FLY_ALGOLIA_SECRET) {
		return new Response(
			JSON.stringify({
				status: 403,
				body: 'forbidden'
			})
		);
	}
	try {
		const { news, events } = await sanityClient.fetch(query);
		const newsIndex = searchClient.initIndex('news');
		const eventsIndex = searchClient.initIndex('events');
		// @ts-ignore
		await newsIndex.saveObjects(news);
		// @ts-ignore
		await eventsIndex.saveObjects(events);
		return new Response(
			JSON.stringify({
				status: 200,
				body: 'success'
			})
		);
	} catch (e) {
		return new Response(
			JSON.stringify({
				status: 500,
				body: e
			})
		);
	}
}

import { s as searchClient } from "../../../../chunks/algolia.js";
import { s as sanityClient } from "../../../../chunks/client.js";
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
async function GET({ url }) {
  let secret = url.searchParams.get("secret");
  if (secret !== {}.FLY_ALGOLIA_SECRET) {
    return new Response(
      JSON.stringify({
        status: 403,
        body: "forbidden"
      })
    );
  }
  try {
    const { news, events } = await sanityClient.fetch(query);
    const newsIndex = searchClient.initIndex("blogs");
    const eventsIndex = searchClient.initIndex("events");
    await newsIndex.saveObjects(news);
    await eventsIndex.saveObjects(events);
    return new Response(
      JSON.stringify({
        status: 200,
        body: "success"
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
export {
  GET
};

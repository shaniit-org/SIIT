import { createClient } from '@sanity/client';

export const sanityClient = createClient({
	projectId: 'za3lzlmc',
	dataset: 'production',
	useCdn: false, // set to `true` to fetch from edge cache
	apiVersion: '2022-01-12' // use current date (YYYY-MM-DD) to target the latest API version
});

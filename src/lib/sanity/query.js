import { sanityClient } from './client';

/**
 * @param {string} query - Sanity query
 */
export const pageQuery = (query) => query;

/**
 * @param {string } query - Sanity pageQuery
 * @param {import('sanity').QueryParams | undefined} [params]- Sanity query params
 * @template T
 * @returns {Promise<T>} - Sanity document
 */
export const getPageData = async (query, params) => {
	return await sanityClient.fetch(pageQuery(query), params ? params : {});
};

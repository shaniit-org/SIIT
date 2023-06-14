/**
 * @param {any} data
 * @param {string} keyword
 * @return {Array<any>}
 */
export function searchByTitle(data, keyword) {
	let res = data.filter((item) => {
		return item.title.toLowerCase().includes(keyword.toLowerCase());
	});
	return res;
}

/**
 * @param {Array<any>} data
 * @param {string} order
 * @return {Array<any>}
 * */
export function sortByDate(data, order) {
	/**
	 * @param {any} a
	 * @param {any} b
	 * */
	return data.sort((a, b) => {
		if (order === 'Oldest') {
			return new Date(a.publishedAt) - new Date(b.publishedAt);
		} else {
			return new Date(b.publishedAt) - new Date(a.publishedAt);
		}
	});
}

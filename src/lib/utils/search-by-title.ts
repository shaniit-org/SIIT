// @ts-nocheck
// Still in the process of thinking of going back to TS instead of jsDocs
export function searchByTitle(data, keyword) {
	let res = data.filter((item) => {
		return item.title.toLowerCase().includes(keyword.toLowerCase());
	});
	return res;
}

export function sortByDate(data, order) {
	return data.sort((a, b) => {
		if (order === 'Oldest') {
			return new Date(a.publishedAt) - new Date(b.publishedAt);
		} else {
			return new Date(b.publishedAt) - new Date(a.publishedAt);
		}
	});
}

export function filterByCategory(data, category) {
	if (category.length > 0) {
		return data.filter((item) => {
			return item.categories.some((cat) => category.includes(cat.title));
		});
	}
	return data;
}

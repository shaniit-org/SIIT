/**
 * @param {import('../../lib/types/termPage').Term[]} words
 */
export function groupByChar(words) {
	/**
	 * @type {import('../types/termPage').TermGroup} - obj
	 */
	let obj = {};
	/**
	 * @type {string[]} - chars
	 */
	let chars = [];
	words.forEach((word) => {
		const char = word.character.toUpperCase();
		if (!obj[char]) {
			obj[char] = [];
			chars.push(char);
		}
		obj[char].push(word);
	});
	chars = chars.sort();
	return {
		grouped: obj,
		chars
	};
}

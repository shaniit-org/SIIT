/**
 * Breaks a Shan text into syllables using predefined character sets.
 * @param {string} inputStr - The input string to be syllable broken.
 * @param {string} breakWord - The delimiter to separate syllables (default is '|').
 * @returns {string} The syllable-broken string.
 */
export function syllable_breaker(inputStr, breakWord = '|') {
	// Define character sets for different Shan characters
	const tone = ['ႇ', 'ႈ', 'း', 'ႉ', 'ႊ'];

	const athet = ['်'];

	const vowel = ['ွ', 'ႂ', 'ႃ', 'ိ', 'ီ', 'ု', 'ူ', 'ဵ', 'ႅ', 'ၢ', 'ႆ', '်', 'ံ'];

	const f_vowel = ['ေ', 'ႄ'];

	const alphabet = [
		'ၵ',
		'ၶ',
		'ၷ',
		'ꧠ',
		'င',
		'ၸ',
		'ꧡ',
		'ၹ',
		'ꧢ',
		'ၺ',
		'ꩦ',
		'ꩧ',
		'ꩨ',
		'ꩩ',
		'ꧣ',
		'တ',
		'ထ',
		'ၻ',
		'ꩪ',
		'ၼ',
		'ပ',
		'ၽ',
		'ၾ',
		'ၿ',
		'ꧤ',
		'မ',
		'ယ',
		'ရ',
		'လ',
		'ဝ',
		'ႀ',
		'သ',
		'ႁ',
		'ꩮ',
		'ဢ'
	];

	// Initialize variables
	let start = 0;
	let end = 0;
	/** @type string[]*/
	const outputList = [];
	let cnt = 0;

	// Remove extra spaces and whitespace characters
	inputStr = inputStr.replace(/ /g, '  ').trim();

	// Function to add a syllable to the output list
	/**
	 * @param {number} endIndex
	 */
	const addSyllable = (endIndex) => {
		outputList.push(inputStr.slice(start, endIndex));
		start = endIndex;
	};

	for (const char of inputStr) {
		switch (true) {
			case tone.includes(char):
			case athet.includes(char) &&
				(cnt === inputStr.length - 1 || alphabet.includes(inputStr[cnt + 1])):
			case f_vowel.includes(char) && alphabet.includes(inputStr[cnt + 1]):
			case alphabet.includes(char) &&
				alphabet.includes(inputStr[cnt + 1]) &&
				inputStr[cnt + 2] !== '်':
			case vowel.includes(char) &&
				alphabet.includes(inputStr[cnt + 1]) &&
				inputStr[cnt + 2] !== '်':
				end = cnt + 1;
				addSyllable(end);
				break;
		}
		cnt++;
	}

	// Concatenate the syllables with the breakWord
	const result = outputList.join(breakWord);
	return result;
}

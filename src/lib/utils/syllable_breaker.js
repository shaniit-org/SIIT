let tone = ['ႇ', 'ႈ', 'း', 'ႉ', 'ႊ'];

let alphabet = [
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

let athet = ['်'];

let vowel = ['ွ', 'ႂ', 'ႃ', 'ိ', 'ီ', 'ု', 'ူ', 'ဵ', 'ႅ', 'ၢ', 'ႆ', '်', 'ံ'];

let f_vowel = ['ေ', 'ႄ'];
/**
 * @param {string} input_str
 */
export function syllable_breaker(input_str, break_word = '|') {
	// let alphabet_athet = ["မ", "ၼ", "င", "ၺ", "ပ", "တ", "ၵ", "ဝ"]
	let start_index = 0;
	let end_index = 0;
	/** @type string[]*/
	let output_list = [];
	let cnt = 0;

	input_str = input_str.replace(' ', '  ');
	input_str = input_str.replace('', ' ');
	input_str = input_str.replace(/ /g, '');
	input_str = input_str.replace(/\s/g, '');
	input_str = input_str.replaceAll(/\s/g, '');

	/** @param {number} end*/
	const addlist = (end) => {
		output_list.push(input_str.slice(start_index, end_index));
		start_index = end;
		return;
	};

	[...input_str].map((i) => {
		if (tone.includes(i)) {
			end_index = cnt + 1;
			addlist(end_index);
		} else if (athet.includes(i)) {
			if ([...input_str].length === cnt + 1) {
				end_index = cnt + 2;
				addlist(end_index);
			} else if (alphabet.includes(input_str[cnt + 1])) {
				end_index = cnt + 1;
				addlist(end_index);
			}
		} else if (f_vowel.includes(i)) {
			if (alphabet.includes(input_str[cnt + 1])) {
				end_index = cnt + 1;
				addlist(end_index);
			}
		} else if (alphabet.includes(i)) {
			if (alphabet.includes(input_str[cnt + 1])) {
				if (input_str[cnt + 2] !== '်') {
					end_index = cnt + 1;
					addlist(end_index);
				}
			}
		} else if (vowel.includes(i)) {
			if (alphabet.includes(input_str[cnt + 1])) {
				if (input_str[cnt + 2] !== '်') {
					end_index = cnt + 1;
					addlist(end_index);
				}
			}
		}
		cnt = cnt + 1;
		return 0;
	});

	let s = '';
	output_list.map((e) => {
		s += e + break_word;
		return 0;
	});
	return s;
}

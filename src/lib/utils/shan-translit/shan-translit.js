/* eslint-disable no-misleading-character-class */
import syllable_break from './syllable-breaker';

/**
 * @param {string} input
 * @param {boolean} includeToneMarks
 */
export function taiToEng(input, includeToneMarks) {
	// Syllable break the input
	let output = syllable_break(input);
	// "ၵ" "ၵျ" "တြ" ႁႂ်ႈပဵတ် ka kya tra
	output = output.replaceAll(
		/^([\u1075-\u1081\u1004\u101e\u1010\u1011\u1015\u1019\u101a\u101b\u101c\u101d\u1022])([\u103b\u103c])?$/g,
		'$1$2a'
	);

	// Without arrpot, arr yau, tang, tang sung, tit nin, tit sung, a sai, a tang, e sai, e tang, kwai, hwai, tay tay tin,
	output = output.replaceAll(
		/(\u0020)([\u1075-\u1081\u1004\u101e\u1010\u1011\u1015\u1019\u101a\u101b\u101c\u101d\u1022\u103b\u103c])([\u103b\u103c])?(?![\u1062\u1083\u102d\u102e\u102f\u1030\u1031\u1035\u1084\u1085\u1082\u103d\u1036\u1086\u101d\u107a\u1075\u1010\u1015\u1004\u1019\u107c\u103b\u103c])/g,
		'$1$2$3a'
	);
	output = output.replaceAll(
		/([\u1075-\u1081\u1004\u101e\u1010\u1011\u1015\u1019\u101a\u101b\u101c\u101d\u1022\u103b\u103c])([\u103b\u103c])?(\u0020)/g,
		'$1$2a$3'
	);
	output = output.replaceAll(
		/(\u0020)([\u1075-\u1081\u1004\u101e\u1010\u1011\u1015\u1019\u101a\u101b\u101c\u101d\u1022\u103b\u103c])([\u103b\u103c])?(\u0020)/g,
		'$1$2$3a$4'
	);

	// ၵႆ ပိၼ်ႇပဵၼ် ၵၺ်
	output = output.replaceAll(/\u1086/g, '\u107a\u103a');

	// ဢပ် - ဢaပ်
	output = output.replaceAll(
		/([\u1075-\u1081\u1004\u101e\u1010\u1011\u1015\u1019\u101a\u101b\u101c\u101d\u1022])([\u1075-\u1081\u1004\u101e\u1010\u1011\u1015\u1019\u101a\u101b\u101c\u101d\u1022])(\u103a)/g,
		'$1a\u030c$2$3'
	);

	// o - ဢူဝ်
	output = output.replaceAll(/([^\u102d])\u1030\u101d\u103a/g, '$1o\u030c');
	// ဢူမ် ၊ ဢိူမ် ( ၵူ becomes ku but ၵူမ် must become kom )
	output = output.replaceAll(
		/([^\u102d])(\u1030)([\u1075-\u1081\u1004\u101e\u1010\u1011\u1015\u1019\u101a\u101b\u101c\u101d\u1022])(\u103a)/g,
		'$1o\u030c$3$4'
	);
	// Omit - လိုဝ် ၊ ၵိူဝ်
	output = output.replaceAll(/(\u102d\u102f|\u1030)\u101d\u103a/g, '$1');

	// Shan Consonants

	// k - ၵ
	output = output.replaceAll(/\u1075\u103a?/g, 'k');
	// kh - ၶ
	output = output.replaceAll(/\u1076\u103a?/g, 'kh');
	// ng - င
	output = output.replaceAll(/\u1004\u103a?/g, 'ng');
	// ts - ၸ
	output = output.replaceAll(/\u1078\u103a?/g, 'j');
	// s - သ
	output = output.replaceAll(/\u101e\u103a?/g, 's');
	// i - ၵႆ ၊ ၵၺ်
	output = output.replaceAll(/\u1086|\u107a\u103a/g, 'i');
	// ny - ၺ
	output = output.replaceAll(/\u107a/g, 'ny');
	// t - တ
	output = output.replaceAll(/\u1010\u103a?/g, 't');
	// th - ထ
	output = output.replaceAll(/\u1011\u103a?/g, 'th');
	// n - ၼ
	output = output.replaceAll(/\u107c\u103a?/g, 'n');
	// p - ပ
	output = output.replaceAll(/\u1015\u103a?/g, 'p');
	// ph - ၽ
	output = output.replaceAll(/\u107d\u103a?/g, 'ph');
	// f - ၾ
	output = output.replaceAll(/\u107e\u103a?/g, 'f');
	// m - မ
	output = output.replaceAll(/\u1019\u103a?/g, 'm');
	// y - ယ
	output = output.replaceAll(/\u101a\u103a?/g, 'y');
	// r - ရ
	output = output.replaceAll(/\u101b\u103a?/g, 'r');
	// r - ြ
	output = output.replaceAll(/\u103c/g, 'r');
	// l - လ
	output = output.replaceAll(/\u101c\u103a?/g, 'l');
	// eao - ဢႅဝ်
	output = output.replaceAll(/\u1085\u101d\u103a/g, 'e\u030cao');
	// ဝ - ဝ်
	output = output.replaceAll(/\u101d\u103a/g, 'o');
	// w - ဝ
	output = output.replaceAll(/\u101d/g, 'w');
	// h - ႁ
	output = output.replaceAll(/\u1081\u103a?/g, 'h');
	// ‘ - ဢ
	output = output.replaceAll(/\u1022/g, 'ʼ');
	// y - ျ
	output = output.replaceAll(/\u103b/g, 'y');
	//
	output = output.replaceAll(/\u1036/g, 'a\u030cm');

	// End Tai Consonants

	// au - ဢေႃ ၊ ဢွ
	output = output.replaceAll(/(\u1031\u1083)|\u103d/g, 'a\u030cu');
	// ue - ဢို
	output = output.replaceAll(/\u102d\u102f/g, 'u\u030ce');
	// oe - ဢိူ
	output = output.replaceAll(/\u102d\u1030/g, 'o\u030ce');
	// aa - ဢႃ ၊ ဢၢ
	output = output.replaceAll(/\u1083|\u1062/g, 'a\u030ca');
	// i - ဢိ
	output = output.replaceAll(/\u102d/g, 'i\u030c');
	// ii - ဢီ
	output = output.replaceAll(/\u102e/g, 'i\u030ci');
	// ae - ဢေ ၊ ဢဵ
	output = output.replaceAll(/\u1031|\u1035/g, 'a\u030ce');
	// e - ဢႄ ၊ ဢႅ
	output = output.replaceAll(/\u1084|\u1085/g, 'e\u030c');
	// u - ဢု
	output = output.replaceAll(/\u102f/g, 'u\u030c');
	// uu - ဢူ
	output = output.replaceAll(/\u1030/g, 'u\u030c');
	// aue - ဢႂ်
	output = output.replaceAll(/(\u1082\u103a)|(\u103a\u1082)/g, 'a\u030cue');
	// w - ဢႂ
	output = output.replaceAll(/\u1082/g, 'w');

	/**
	 * တႃႇတူၼ်းသဵင် 6 တူၼ်း
	 * ယၵ်း ၊ ယၵ်းၸမ်ႈ ၊ ၸမ်ႈၼႃႈ ၊ ၸမ်ႈတႂ်ႈ ၊ ယၵ်းၶိုၼ်ႈ
	 */

	if (includeToneMarks === true) {
		// ယၵ်း
		output = output.replaceAll(
			/([khgjzsytnpfmrlwaʼ])([aeiou])(\u030c)([a-z]{0,3})\u1087/g,
			'$1$2\u0300$4'
		);
		// ယၵ်းၸမ်ႈ
		output = output.replaceAll(
			/([khgjzsytnpfmrlwaʼ])([aeiou])(\u030c)([a-z]{0,3})\u1088/g,
			'$1$2\u0304$4'
		);
		// ၸမ်ႈၼႃႈ
		output = output.replaceAll(
			/([khgjzsytnpfmrlwaʼ])([aeiou])(\u030c)([a-z]{0,3})\u1038/g,
			'$1$2\u0301$4'
		);
		// ၸမ်ႈတႂ်ႈ
		output = output.replaceAll(
			/([khgjzsytnpfmrlwaʼ])([aeiou])(\u030c)([a-z]{0,3})[\u1089\u1037]/g,
			'$1$2\u0302\u0330$4'
		);
		// ယၵ်းၶိုၼ်ႈ
		output = output.replaceAll(
			/([khgjzsytnpfmrlwaʼ])([aeiou])(\u030c)([a-z]{0,3})\u108a/g,
			'$1$2\u1dc8$4'
		);
	} else {
		// ယၵ်း
		output = output.replaceAll(
			/([khgjzsytnpfmrlwaʼ])([aeiou])(\u030c)([a-z]{0,3})\u1087/g,
			'$1$2$4'
		);
		// ယၵ်းၸမ်ႈ
		output = output.replaceAll(
			/([khgjzsytnpfmrlwaʼ])([aeiou])(\u030c)([a-z]{0,3})\u1088/g,
			'$1$2$4'
		);
		// ၸမ်ႈၼႃႈ
		output = output.replaceAll(
			/([khgjzsytnpfmrlwaʼ])([aeiou])(\u030c)([a-z]{0,3})\u1038/g,
			'$1$2$4'
		);
		// ၸမ်ႈတႂ်ႈ
		output = output.replaceAll(
			/([khgjzsytnpfmrlwaʼ])([aeiou])(\u030c)([a-z]{0,3})[\u1089\u1037]/g,
			'$1$2$4'
		);
		// ယၵ်းၶိုၼ်ႈ
		output = output.replaceAll(
			/([khgjzsytnpfmrlwaʼ])([aeiou])(\u030c)([a-z]{0,3})\u108a/g,
			'$1$2$4'
		);
		// ပဝ်ႇ
		output = output.replaceAll(/\u030c/g, '');
	}

	// Convert - ʼa => a
	//        output = output.replaceAll("ʼa[]", "a ");
	output = output.replaceAll(/([ .?,!])?ʼa([ .?,!])/g, '$1a$2');

	// ။ -> .
	output = output.replaceAll(/\u104b/g, '.');
	// ၊ -> ,
	output = output.replaceAll(/\u104a/g, ',');

	return output;
}

/**
 *
 * @param {string} input
 */
export function engToTai(input) {
	let output = input;

	// let checkIsToneMarkIncludingOrNot = "(?!.*(?:\u030c|\u0300|\u0304|\u0301|\u0302\u0330|\u1dc8))[\s\S]*";
	// if (Pattern.matches(checkIsToneMarkIncludingOrNot, output)) {
	//     output = output.replaceAll("(\u006b|\u006b\u0068|\u006e\u0067|\u006a|z|\u006a|\u0073|\u006e\u0079|\u0074|\u0074\u0068|\u006e|\u0070|\u0070\u0068|\u0066|\u006d|\u0079|\u0072|\u006c|\u0077|\u0068|ʼ)([ae\u0069ou])", "$1$2\u030c");
	// }

	// const checkIsToneMarkIncludingOrNot = /(?!.*(?:\u030c|\u0300|\u0304|\u0301|\u0302\u0330|\u1dc8))[\s\S]*/;
	// const checkIsToneMarkIncludingOrNot = /(?!.*(?:\\u030c|\\u0300|\\u0304|\\u0301|\\u0302\\u0330|\\u1dc8)).*/;
	const includToneMarks = /[\u030c|\u0300|\u0304|\u0301|\u0302\u0330|\u1dc8]/g;

	if (!includToneMarks.test(output)) {
		output = output.replaceAll(
			/(\u006b|\u006b\u0068|\u006e\u0067|\u006a|\u007a|\u006a|\u0073|\u006e\u0079|\u0074|\u0074\u0068|\u006e|\u0070|\u0070\u0068|\u0066|\u006d|\u0079|\u0072|\u006c|\u0077|\u0068|ʼ)([\u0061\u0065\u0069\u006f\u0075])/g,
			'$1$2\u030c'
		);
	}

	// y - ပျ
	output = output.replaceAll(
		/^(\u006b|\u006b\u0068|\u006e\u0067|\u006a|\u0073|\u006e\u0079|\u0074|\u0074\u0068|\u006e|\u0070|\u0070\u0068|\u0066|\u006d|\u0079|\u0072|\u006c|\u0077|\u0068|ʼ)\u0079(\u0061)$/g,
		'$1\u103b'
	);
	// r - တြ
	output = output.replaceAll(
		/^(\u006b|\u006b\u0068|\u006e\u0067|\u006a|\u0073|\u006e\u0079|\u0074|\u0074\u0068|\u006e|\u0070|\u0070\u0068|\u0066|\u006d|\u0079|\u0072|\u006c|\u0077|\u0068|ʼ)\u0072(\u0061)$/g,
		'$1\u103c'
	);
	// a - ဢ
	output = output.replaceAll(/^\u0061$/g, 'ʼ');
	output = output.replaceAll(
		/^(\u006b|\u006b\u0068|\u006e\u0067|\u006a|\u0073|\u006e\u0079|\u0074|\u0074\u0068|\u006e|\u0070|\u0070\u0068|\u0066|\u006d|\u0079|\u0072|\u006c|\u0077|\u0068|ʼ)?\u0061$/g,
		'$1'
	);

	// r - တြ
	output = output.replaceAll(
		/(\u006b|\u006b\u0068|\u006e\u0067|\u006a|\u0073|\u0074|\u0074\u0068|\u0070|\u0070\u0068|\u0066|\u006d|\u0079|\u0072|\u006c|\u0077|\u0068)\u0072/g,
		'$1\u103c'
	);
	// y - ပျ
	output = output.replaceAll(
		/(\u006b|\u006b\u0068|\u006e\u0067|\u006a|\u0073|\u0074|\u0074\u0068|\u0070|\u0070\u0068|\u0066|\u006d|\u0079|\u0072|\u006c|\u0077|\u0068)\u0079/g,
		'$1\u103b'
	);

	// \u030c , \u0300 , \u0304 , \u0301 , \u0302\u0330 , \u1dc8
	// ဢႃ
	output = output.replaceAll(
		/\u0061(\u030c|\u0300|\u0304|\u0301|\u0302\u0330|\u1dc8)\u0061/g,
		'$1\u1083'
	);
	// ဢီ
	output = output.replaceAll(
		/\u0069(\u030c|\u0300|\u0304|\u0301|\u0302\u0330|\u1dc8)\u0069/g,
		'$1\u102e'
	);
	output = output.replaceAll(
		/\u0069(\u030c|\u0300|\u0304|\u0301|\u0302\u0330|\u1dc8)/g,
		'$1\u102d'
	);
	// ဢႅဝ်
	output = output.replaceAll(
		/\u0065(\u030c|\u0300|\u0304|\u0301|\u0302\u0330|\u1dc8)\u0061/g,
		'$1\u1085'
	);
	// ဢႄ
	output = output.replaceAll(
		/\u0065(\u030c|\u0300|\u0304|\u0301|\u0302\u0330|\u1dc8)/g,
		'$1\u1084'
	);
	// ဢေ
	output = output.replaceAll(
		/\u0061(\u030c|\u0300|\u0304|\u0301|\u0302\u0330|\u1dc8)\u0065/g,
		'$1\u1031'
	);
	// ဢိုၼ်
	output = output.replaceAll(
		/\u0075(\u030c|\u0300|\u0304|\u0301|\u0302\u0330|\u1dc8)\u0065(\u006b|\u006b\u0068|\u006e\u0067|\u006a|\u0073|\u006e\u0079|\u0074|\u0074\u0068|\u006e|\u0070|\u0070\u0068|\u0066|\u006d|\u0079|\u0072|\u006c|\u0077|\u0068|\u0069|ʼ)/g,
		'$1ို$2'
	);

	// ဢိုဝ်
	output = output.replaceAll(
		/\u0075(\u030c|\u0300|\u0304|\u0301|\u0302\u0330|\u1dc8)\u0065/g,
		'$1ိုဝ'
	);

	// ဢုၼ်
	output = output.replaceAll(
		/\u0075(\u030c|\u0300|\u0304|\u0301|\u0302\u0330|\u1dc8)(\u006b|\u006b\u0068|\u006e\u0067|\u006a|\u0073|\u006e\u0079|\u0074|\u0074\u0068|\u006e|\u0070|\u0070\u0068|\u0066|\u006d|\u0079|\u0072|\u006c|\u0077|\u0068|\u0069|ʼ)/g,
		'$1ု$2'
	);
	// ဢူ
	output = output.replaceAll(
		/\u0075(\u030c|\u0300|\u0304|\u0301|\u0302\u0330|\u1dc8)/g,
		'$1\u1030'
	);
	// ဢိူၼ်
	output = output.replaceAll(
		/\u006f(\u030c|\u0300|\u0304|\u0301|\u0302\u0330|\u1dc8)\u0065(\u006b|\u006b\u0068|\u006e\u0067|\u006a|\u0073|\u006e\u0079|\u0074|\u0074\u0068|\u006e|\u0070|\u0070\u0068|\u0066|\u006d|\u0079|\u0072|\u006c|\u0077|\u0068|\u0069|ʼ)/g,
		'$1ိူ$2'
	);

	// ဢိူဝ်
	output = output.replaceAll(
		/\u006f(\u030c|\u0300|\u0304|\u0301|\u0302\u0330|\u1dc8)\u0065/g,
		'$1ိူဝ'
	);
	// ဢူၼ်
	output = output.replaceAll(
		/\u006f(\u030c|\u0300|\u0304|\u0301|\u0302\u0330|\u1dc8)(\u006b|\u006b\u0068|\u006e\u0067|\u006a|\u0073|\u006e\u0079|\u0074|\u0074\u0068|\u006e|\u0070|\u0070\u0068|\u0066|\u006d|\u0079|\u0072|\u006c|\u0077|\u0068|\u0069|ʼ)/g,
		'$1ူ$2'
	);
	// ဢူဝ်
	output = output.replaceAll(/\u006f(\u030c|\u0300|\u0304|\u0301|\u0302\u0330|\u1dc8)/g, '$1ူဝ');
	// ဢွမ်
	output = output.replaceAll(
		/\u0061(\u030c|\u0300|\u0304|\u0301|\u0302\u0330|\u1dc8)\u0075(\u006b|\u006b\u0068|\u006e\u0067|\u006a|\u0073|\u006e\u0079|\u0074|\u0074\u0068|\u006e|\u0070|\u0070\u0068|\u0066|\u006d|\u0079|\u0072|\u006c|\u0077|\u0068|\u0069|ʼ)/g,
		'$1\u103d$2'
	);

	// ဢႂ်
	output = output.replaceAll(
		/\u0061(\u030c|\u0300|\u0304|\u0301|\u0302\u0330|\u1dc8)\u0075\u0065/g,
		'$1ႂ်'
	);

	// ဢေႃ
	output = output.replaceAll(
		/\u0061(\u030c|\u0300|\u0304|\u0301|\u0302\u0330|\u1dc8)\u0075/g,
		'$1ေႃ'
	);

	// kh - ၶ
	output = output.replaceAll(/\u006b\u0068/g, 'ၶ');
	// ng - င
	output = output.replaceAll(/\u006e\u0067/g, 'င');
	// th - ထ
	output = output.replaceAll(/\u0074\u0068/g, 'ထ');
	// ny - ၺ
	output = output.replaceAll(/\u006e\u0079|\u0069/g, 'ၺ');
	// ts - ၸ
	output = output.replaceAll(/\u0074\u0073|\u006a|\u007a/g, 'ၸ');
	// ph - ၽ
	output = output.replaceAll(/\u0070\u0068/g, 'ၽ');
	// k - ၵ
	output = output.replaceAll(/\u006b/g, 'ၵ');
	// s - သ
	output = output.replaceAll(/\u0073/g, 'သ');
	// i - ၵႆ ၊ ၵၺ်
	// output = output.replaceAll("\u1086|\u107a\u103a", "i");
	// t - တ
	output = output.replaceAll(/\u0074/g, 'တ');
	// n - ၼ
	output = output.replaceAll(/\u006e/g, 'ၼ');
	// p - ပ
	output = output.replaceAll(/\u0070/g, 'ပ');
	// f - ၾ
	output = output.replaceAll(/\u0066/g, 'ၾ');
	// m - မ
	output = output.replaceAll(/\u006d/g, 'မ');
	// y - ယ
	output = output.replaceAll(/\u0079/g, 'ယ');
	// r - ရ
	output = output.replaceAll(/\u0072/g, 'ရ');
	// l - လ
	output = output.replaceAll(/\u006c/g, 'လ');
	// eao - ဢႅဝ်
	// output = output.replaceAll("\u1085\u101d\u103a", "e\u030cao");
	// ဝ - ဝ်
	// output = output.replaceAll("\u101d\u103a", "o");
	// h - ႁ
	output = output.replaceAll(/\u0068/g, 'ႁ');

	// aa -> ဢႃ
	// ‘ - ဢ
	output = output.replaceAll(/ʼ/g, 'ဢ');

	// kwam -> ၵႂမ်
	output = output.replaceAll(/([က-အၵ-ႁဢ])\u0077/g, '$1\u1082');
	// wam -> ဝမ်
	output = output.replaceAll(/\u0077|\u006f/g, 'ဝ');

	//
	// \u030c , \u0300 , \u0304 , \u0301 , \u0302\u0330 , \u1dc8
	output = output.replaceAll(
		/(\u030c|\u0300|\u0304|\u0301|\u0302\u0330|\u1dc8)(ႃ|ီ|ႄ|ႅ|ေႃ|ေ|ူ|ု|ွ|ို|ိူ|ိ)?([က-အၵ-ႁဢ])/g,
		'$1$2$3\u103a'
	);

	// FINAL : Replace a with blank
	output = output.replaceAll(/\u0061/g, '');
	// ပဝ်ႇ
	output = output.replaceAll(/(\u030c)(ႃ|ီ|ႄ|ႅ|ေႃ|ေ|ူ|ု|ွ|ို|ိူ|ိ)?([က-အၵ-ႁဢႂ]\u103a)?/g, '$2$3');
	// ယၵ်း
	output = output.replaceAll(
		/(\u0300)(ႃ|ီ|ႄ|ႅ|ေႃ|ေ|ူ|ု|ွ|ို|ိူ|ိ)?([က-အၵ-ႁဢႂ]\u103a)?/g,
		'$2$3\u1087'
	);
	// ယၵ်းၸမ်ႈ
	output = output.replaceAll(
		/(\u0304)(ႃ|ီ|ႄ|ႅ|ေႃ|ေ|ူ|ု|ွ|ို|ိူ|ိ)?([က-အၵ-ႁဢႂ]\u103a)?/g,
		'$2$3\u1088'
	);
	// ၸမ်ႈၼႃႈ
	output = output.replaceAll(
		/(\u0301)(ႃ|ီ|ႄ|ႅ|ေႃ|ေ|ူ|ု|ွ|ို|ိူ|ိ)?([က-အၵ-ႁဢႂ]\u103a)?/g,
		'$2$3\u1038'
	);
	// ၸမ်ႈတႂ်ႈ
	output = output.replaceAll(
		/(\u0302\u0330)(ႃ|ီ|ႄ|ႅ|ေႃ|ေ|ူ|ု|ွ|ို|ိူ|ိ)?([က-အၵ-ႁဢႂ]\u103a)?/g,
		'$2$3\u1089'
	);
	// ယၵ်းၶိုၼ်ႈ
	output = output.replaceAll(
		/(\u1dc8)(ႃ|ီ|ႄ|ႅ|ေႃ|ေ|ူ|ု|ွ|ို|ိူ|ိ)?([က-အၵ-ႁဢႂ]\u103a)?/g,
		'$2$3\u108a'
	);

	output = output.replaceAll(/ႃ([က-အၵ-ႁဢ])်/g, 'ၢ$1်');
	output = output.replaceAll(/ေ([က-အၵ-ႁဢ])်/g, 'ဵ$1်');
	output = output.replaceAll(/ႄ([က-အၵ-ႁဢ])်/g, 'ႅ$1်');
	// ၶၺ် ၊ ၶၢၺ် ၊ ၵႂၢၺ် -> ၶႆ ၊ ၶၢႆ ၊ ၵႂၢႆ
	output = output.replaceAll(/([က-အၵ-ႁဢ])(\u1082)?([\u1062\u103d])?ၺ်/g, '$1$2$3\u1086');

	// full stop, comma, question mark

	// ။ -> .
	output = output.replaceAll(/\u002e/g, '\u104b');
	// // ၊ -> ,
	output = output.replaceAll(/\u002c/g, '\u104a');

	return output;
}

/* eslint-disable no-misleading-character-class */
/**
 * @param {string} input_text
 */
export default function syllable_break(input_text) {
	let output_text = purification(input_text);
	output_text = output_text.replaceAll(/([\u1087\u1088\u1038\u1089\u1037\u108a])(\u103a)/g, '$2$1');
	// သေးသေးတင် မြင်ရင် break
	// ဒါပေမဲ့ သရသံနဲ့တွဲနေရင် ကျော်ပါ
	output_text = output_text.replaceAll(
		/(\u1036)(?![\u1087\u1088\u1038\u1089\u1037\u108a])/g,
		'$1\u0020'
	);
	// တူၼ်းသဵင် 6 တူၼ်း - ဢၢမ်ႇ ဢၢမ်ႈ ဢၢမ်း ဢၢမ်ႉ ဢၢမ့် ဢၢမ်ႊ
	output_text = output_text.replaceAll(/([\u1087\u1088\u1038\u1089\u1037\u108a])/g, '$1\u0020');
	output_text = output_text.replaceAll(
		/([\u1075-\u1081\u1004\u101e\u1010\u1011\u1015\u1019\u101a\u101b\u101c\u101d\u1022])([\u1062\u103d\u1082\u1031\u103b])?(\u1083|\u102e|\u1082\u103a|\u1086|\u1084|\u1031)(?![\u1087\u1088\u1038\u1089\u1037\u108a\u1083\u0020(\u1031\u1083)])/g,
		'$1$2$3\u0020'
	);
	output_text = output_text.replaceAll(
		/([\u1075-\u1081\u1004\u101e\u1010\u1011\u1015\u1019\u101a\u101b\u101c\u101d\u1022])([\u103b\u103c])?(\u102d)(?!(\u102f|\u1030|[\u1075-\u1081\u1004\u101e\u1010\u1011\u1015\u1019\u101a\u101b\u101c\u101d\u1022]\u103a))/g,
		'$1$2$3\u0020'
	);
	output_text = output_text.replaceAll(
		/([\u1075-\u1081\u1004\u101e\u1010\u1011\u1015\u1019\u101a\u101b\u101c\u101d\u1022])(\u103b)(?!(\u102f|\u1030|\u1083|\u102d|\u102e|\u1031|\u1084|\u1035|\u1085|\u103d|\u1062|\u103a|[\u1075-\u1081\u1004\u101e\u1010\u1011\u1015\u1019\u101a\u101b\u101c\u101d\u1022]\u103a))/g,
		'$1$2\u0020'
	);
	output_text = output_text.replaceAll(
		/([\u1075-\u1081\u1004\u101e\u1010\u1011\u1015\u1019\u101a\u101b\u101c\u101d\u1022])(\u103b\u1031\u1083)(?!([\u1087\u1088\u1038\u1089\u1037\u108a]))/g,
		'$1$2\u0020'
	);
	output_text = output_text.replaceAll(
		/(\u103a)(?![\u1087\u1088\u1038\u1089\u1037\u108a])/g,
		'$1\u0020'
	);
	output_text = output_text.replaceAll(
		/([\u1075-\u1081\u1004\u101e\u1010\u1011\u1015\u1019\u101a\u101b\u101c\u101d\u1022])([\u103b\u103c])?(\u1030|\u102f)(?!([\u1087\u1088\u1038\u1089\u1037\u108a])|([\u1075-\u1081\u1004\u101e\u1010\u1011\u1015\u1019\u101a\u101b\u101c\u101d\u1022](\u103a)))/g,
		'$1$2$3\u0020'
	);
	output_text = output_text.replaceAll(
		/([\u1075-\u1081\u1004\u101e\u1010\u1011\u1015\u1019\u101a\u101b\u101c\u101d\u1022])([\u1075-\u1081\u1004\u101e\u1010\u1011\u1015\u1019\u101a\u101b\u101c\u101d\u1022](?![\u103a]))([\u1075-\u1081\u1004\u101e\u1010\u1011\u1015\u1019\u101a\u101b\u101c\u101d\u1022](?![\u103a]))/g,
		'$1\u0020$2\u0020$3'
	);
	output_text = output_text.replaceAll(
		/([\u1075-\u1081\u1004\u101e\u1010\u1011\u1015\u1019\u101a\u101b\u101c\u101d\u1022])([\u1075-\u1081\u1004\u101e\u1010\u1011\u1015\u1019\u101a\u101b\u101c\u101d\u1022](?![\u103a]))/g,
		'$1\u0020$2'
	);
	output_text = output_text.replaceAll(/(\u0020)?([\u104b\u104a])/g, '$2\u0020');
	// output_text = output_text.replaceAll(/(\u0020)++/g, "\u0020");
	// output_text = output_text.replaceAll(/"null"/g, "");
	return output_text;
}

/**
 * @param {string} input_text
 */
function purification(input_text) {
	let output_text = input_text;
	//          ် +   ႂ ==    ႂ +   ်
	output_text = output_text.replaceAll(/(\u103a)(\u1082)/g, '$2$1');
	//      ု + ိ = ိ + ု
	output_text = output_text.replaceAll(/(\u102f)(\u102d)/g, '$2$1');
	//      ူ + ိ = ိ + ူ
	output_text = output_text.replaceAll(/(\u1030)(\u102d)/g, '$2$1');
	return output_text;
}

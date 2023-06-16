export interface FAQ {
	question: string;
	answer: PortableText;
}

export interface FAQList {
	category: string;
	qanda: FAQ[];
}

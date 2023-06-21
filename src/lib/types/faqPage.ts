export interface FAQ {
	qanda: {
		question: string;
		answer: PortableText;
	}[];
	category: string;
}

export interface FAQList {
	category: string;
	faqs: FAQ[];
}

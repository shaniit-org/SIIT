export interface FAQ {
	qanda: FAQData[];
	category: string;
}

export interface FAQData {
	question: string;
	answer: PortableText;
}

export interface FaqPageData {
	_id: string;
	category: string;
	faqs: FAQ[];
	seo: BaseMetaData;
}

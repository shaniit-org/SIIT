export interface FAQ {
	_id: string;
	qanda: FAQData[];
	category: string;
}

export interface FAQData {
	question: string;
	_id: string;
	answer: PortableText;
}

export interface FaqPageData {
	_id: string;
	category: string;
	faqs: FAQ[];
	seo: BaseMetaData;
}

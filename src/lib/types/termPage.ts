export interface Term {
	seo: BaseMetaData;
	_id: string;
	description: string;
	body: PortableText;
	character: string;
	slug: {
		current: string;
	};
}

export interface TermPageData {
	seo: BaseMetaData;
	terms: Term[];
}

export interface TermGroup {
	[key: string]: Term[];
}

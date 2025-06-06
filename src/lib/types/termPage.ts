export interface Term {
	seo: BaseMetaData;
	_id: string;
	description: string;
	type: string;
	_createdAt: string;
	title: string;
	body: PortableText;
	character: string;
	slug: string;
}

export interface TermPageData {
	seo: BaseMetaData;
	terms: Term[];
}

export interface TermGroup {
	[key: string]: Term[];
}

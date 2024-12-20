export interface Category {
	title: string;
	_id: string;
}
export interface RelatedArticle {
	seo: BaseMetaData;
	_type: string;
	title: string;
	description: string;
	coverImage: SanityImage;
	publishedAt: string;
	slug: string;
	_id: string;
	categories: Category[];
}
export interface Author {
	name: string;
	role: string;
	bio: string;
	story: PortableText;
	profile: SanityImage;
}

export interface Article {
	_type: string;
	_id: string;
	seo: BaseMetaData;
	title: string;
	description: string;
	coverImage: SanityImage;
	publishedAt: string;
	slug: string;
}

export interface UserGuide extends Article {
	file: string;
	downloadlink: string;
	slug: string;
	categories: Category[];
}

export interface News extends Article {
	categories: Category[];
}

export interface NewsDetail extends News {
	readingTime: number;
	categories: Category[];
	authors: Author[];
	body: PortableText;
	related?: News[];
}

export interface Event extends Article {
	categories: Category[];
}

export interface EventDetail extends Event {
	body: PortableText;
	readingTime: number;
	related?: RelatedArticle[];
	categories: Category[];
}
export interface Term extends Article {
	type: string;
	body: PortableText;
	characters: string;
	character: string;
}

export interface TermDetail extends Term {
	body: PortableText;
	related?: { title: string; slug: string; _id: string }[];
}

export interface RowBanner {
	_type: 'rowBanner';
	title: string;
	description: PortableText;
}

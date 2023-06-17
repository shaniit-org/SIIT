export interface Author {
	name: string;
	bio: string;
	story: PortableText;
}

export interface Article {
	title: string;
	description: string;
	coverImage: any;
	publishedAt: string;
	slug: string;
}

export interface UserGuide extends Article {
	file: string;
	link: string;
	slug: string;
}

export interface News extends Article {}

export interface NewsDetail extends News {
	categories: string[];
	body: PortableText;
}

export interface Event extends Article {}

export interface EventDetail extends Event {
	categories: string[];
	body: PortableText;
}
export interface Term extends Article {}

export interface TermDetail extends Term {
	body: PortableText;
}

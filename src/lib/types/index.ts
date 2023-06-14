export interface News {
	title: string;
	slug: string;
	description: string;
	coverImage: any;
	publishedAt: string;
}

export interface NewsDetail extends News {
	categories: string[];
	body: PortableText[];
}

export interface Event {
	title: string;
	slug: string;
	description: string;
	coverImage: any;
	publishedAt: string;
}

export interface EventDetail extends News {
	categories: string[];
	body: PortableText[];
}
export interface Term {
	title: string;
	slug: string;
	description: string;
	createdAt: string;
	coverImage: any;
}

export interface TermDetail extends News {
	body: PortableText[];
}

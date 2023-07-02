export interface Category {
    title: string;
    _id: string;
}
export interface RelatedArticle {
    title: string;
    slug: string;
    _id: string;
}
export interface Author {
    name: string;
    role: string;
    bio: string;
    story: PortableText;
    profile: SanityImage;
}

export interface Article {
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

export interface News extends Article { }

export interface NewsDetail extends News {
    authors: Author[];
    categories: Category[];
    body: PortableText;
    related?: RelatedArticle[];
}

export interface Event extends Article { }

export interface EventDetail extends Event {
    body: PortableText;
    related?: RelatedArticle[];
    categories: Category[];
}
export interface Term extends Article { }

export interface TermDetail extends Term {
    body: PortableText;
    related?: { title: string; slug: string; _id: string }[];
}

export interface RowBanner {
    _type: 'rowBanner';
    title: string;
    description: PortableText;
}

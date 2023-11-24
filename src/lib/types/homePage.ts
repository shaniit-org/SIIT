import type { Term } from '.';
import type { News, Event } from '.';

export interface HomePageHero {
    _type: 'Hero';
    title: string;
    heroImage: SanityImage;
}
export interface HighLightNews extends News {
    _type: 'Highlight';
    title: string;
    description: string;
    slug: string;
    authors: any;
}

export interface HomePageNews {
    _type: 'News';
    title: string;
    description: string;
}

export interface HomePageEvents {
    _type: 'Events';
    title: string;
    description: string;
}

export interface HomePageDonate {
    _type: 'Donate';
    title: string;
    description: string;
    link: Link;
}

export interface HomePage {
    _type: 'homePage';
    term: Term;
    seo: BaseMetaData;
    sections: HomePageSections[];
}

type HomePageSections =
    | HomePageHero
    | HomePageNews
    | HomePageEvents
    | HomePageDonate
    | HighLightNews;

export interface HomePageData {
    homePage: HomePage;
    news: News[];
    events: Event[];
}

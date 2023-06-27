import type { News } from '.';
export interface Tools {
    title: string;
    description: string;
    image: SanityImage;
    downloadlink: string;
}
export interface NLPPage {
    description: string;
    tools: Tools[];
    news: News[];
}

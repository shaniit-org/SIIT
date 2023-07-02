import { Event } from '.';

export interface EventsPage {
    seo: BaseMetaData;
    title: string;
    news: Event[];
}

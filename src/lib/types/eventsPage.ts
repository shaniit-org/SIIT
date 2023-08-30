import type { Event } from '.';

export interface EventsPage {
    seo: BaseMetaData;
    title: string;
    news: Event[];
    events: Event[];
}

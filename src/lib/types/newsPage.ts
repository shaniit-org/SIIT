import type { News } from '.';

export interface NewsPage {
	seo: BaseMetaData;
	title: string;
	news: News[];
	categories: {
		title: string;
		_id: string;
	}[];
}

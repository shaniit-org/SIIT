import { FaHome } from 'react-icons/fa';

export default {
	id: 'homePage',
	icon: FaHome,
	title: 'Home Page',
	name: 'homePage',
	type: 'document',
	fields: [
		{
			title: 'SEO',
			name: 'seo',
			type: 'seo'
		},
		{
			title: 'Sections',
			name: 'sections',
			type: 'array',
			of: [
				{
					name: 'Hero',
					type: 'homePage.hero'
				},
				{
					title: 'Highlight',
					name: 'Highlight',
					type: 'reference',
					to: [
						{
							type: 'news'
						},
						{
							type: 'event'
						}
					]
				},
				{
					name: 'News',
					type: 'homePage.news'
				},
				{
					name: 'Donate',
					title: 'Donate',
					type: 'banner'
				},
				{
					name: 'Events',
					type: 'homePage.events'
				}
			]
		}
	],
	preview: {
		select: {
			title: 'seo.title',
			media: 'seo.ogImage'
		},
		/**
		 * @param {import('sanity').PreviewProps} props
		 */
		prepare({ title, media, subtitle }) {
			return {
				title: title || 'Home Page',
				subtitle: subtitle,
				media
			};
		}
	}
};

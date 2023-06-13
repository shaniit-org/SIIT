export default {
	title: 'Hero',
	name: 'homePage.hero',
	type: 'object',
	fields: [
		{
			title: 'Hero Image',
			name: 'heroImage',
			type: 'image'
		},
		{
			title: 'Title',
			name: 'title',
			type: 'string'
		},
		{
			title: 'Term of the Day',
			name: 'termOfTheDay',
			type: 'reference',
			to: [
				{
					type: 'term',
					title: 'Term',
					name: 'term'
				}
			]
		},
		{
			title: 'Pinned News',
			name: 'pinnedNews',
			type: 'reference',
			to: [
				{
					type: 'term',
					title: 'Term',
					name: 'news'
				}
			]
		}
	]
};

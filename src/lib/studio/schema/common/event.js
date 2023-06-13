export default {
	title: 'Event',
	name: 'event',
	type: 'document',
	fields: [
		{
			type: 'seo',
			name: 'seo',
			title: 'SEO'
		},
		{
			name: 'coverImage',
			type: 'image',
			title: 'Cover Image',
			options: {
				hotspot: true
			}
		},
		{
			title: 'Title',
			name: 'title',
			type: 'string'
		},
		{
			title: 'Description',
			name: 'description',
			type: 'string'
		},
		{
			title: 'Slug',
			name: 'slug',
			type: 'slug',
			options: {
				source: 'title'
			}
		},
		{
			title: 'Body',
			name: 'body',
			type: 'blockContent'
		},
		{
			title: 'Pinned',
			name: 'pinned',
			type: 'boolean'
		},
		{
			title: 'Categories',
			name: 'categories',
			type: 'array',
			of: [
				{
					type: 'reference',
					to: [
						{
							type: 'category'
						}
					]
				}
			]
		}
	]
};

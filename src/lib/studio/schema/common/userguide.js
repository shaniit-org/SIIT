export default {
	title: 'User Guide',
	name: 'userguide',
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
			title: 'Publish Date',
			name: 'publishedAt',
			type: 'date'
		},
		{
			title: 'Download link',
			name: 'downloadlink',
			type: 'url'
		},
		{
			title: 'File',
			name: 'File',
			type: 'file'
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

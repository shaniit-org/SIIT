export default {
	type: 'object',
	title: 'Banner',
	name: 'banner',
	fields: [
		{
			name: 'title',
			type: 'string',
			title: 'Title'
		},
		{
			name: 'description',
			type: 'string',
			title: 'Description'
		},
		{
			name: 'link',
			type: 'link'
		},
		{
			name: 'background',
			type: 'string',
			title: 'Background Color',
			options: {
				list: [
					{ title: 'White', value: 'white' },
					{ title: 'Black', value: 'black' }
				]
			}
		}
	]
};

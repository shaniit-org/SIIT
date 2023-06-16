export default {
	title: 'Faq',
	name: 'faq',
	type: 'object',
	fields: [
		{
			title: 'Question',
			name: 'question',
			type: 'string'
		},
		{
			title: 'Slug',
			name: 'slug',
			type: 'slug',
			options: {
				source: 'question'
			}
		},
		{
			title: 'Answer',
			name: 'answer',
			type: 'blockContent'
		}
	]
};

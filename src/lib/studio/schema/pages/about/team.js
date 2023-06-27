export default {
	title: 'Team Member',
	name: 'teamMember',
	type: 'object',
	fields: [
		{ title: 'Title', name: 'title', type: 'string' },
		{ title: 'Description', name: 'description', type: 'string' },
		{
			title: 'Teams',
			name: 'teams',
			type: 'array',
			of: [
				{
					type: 'reference',
					to: [{ type: 'author' }]
				}
			]
		}
	],
	preview: {
		select: { title: 'title', media: 'ogImage' },
		/**
		 *
		 * @param {import('sanity').PreviewProps} props
		 */
		prepare({ title, media, subtitle }) {
			return { title: title || 'About Banner', subtitle: subtitle, media };
		}
	}
};

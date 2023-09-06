export default {
	id: 'nlpPage',
	title: 'NLP  Page',
	name: 'nlpPage',
	type: 'document',
	fields: [
		{
			title: 'SEO',
			name: 'seo',
			type: 'seo'
		},
		{
			title: 'Description',
			name: 'description',
			type: 'string'
		},
		{
			title: 'Tools',
			type: 'array',
			name: 'tools',
			of: [{ type: 'nlp_tool' }]
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
			return { title: title || 'NLP Page', subtitle: subtitle, media };
		}
	}
};

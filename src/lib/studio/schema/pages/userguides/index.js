export default {
	id: 'userGuidePage',
	title: 'User Guide Page',
	name: 'userGuidePage',
	type: 'document',
	fields: [
		{
			title: 'SEO',
			name: 'seo',
			type: 'seo'
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
			return { title: title || 'UserGuide Page', subtitle: subtitle, media };
		}
	}
};

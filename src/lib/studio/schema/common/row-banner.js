export default {
	title: 'Row Banner',
	name: 'rowBanner',
	type: 'object',
	fields: [
		{
			title: 'Title',
			name: 'title',
			type: 'string'
		},
		{
			title: 'Description',
			name: 'description',
			type: 'text'
		}
	],
	preview: {
		select: {
			title: 'title',
			media: 'ogImage'
		},
		/**
		 *
		 * @param {import('sanity').PreviewProps} props
		 */
		prepare({ title, media, subtitle }) {
			return { title: title || 'Row Banner', subtitle: subtitle, media };
		}
	}
};

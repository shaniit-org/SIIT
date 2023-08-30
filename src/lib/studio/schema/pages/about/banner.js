export default {
	title: 'About Banner',
	name: 'aboutBanner',
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
		},
		{
			title: 'Image',
			name: 'image',
			type: 'image'
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
			return { title: title || 'About Banner', subtitle: subtitle, media };
		}
	}
};

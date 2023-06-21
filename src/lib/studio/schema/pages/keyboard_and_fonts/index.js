export default {
	id: 'keyboardAndFont',
	title: 'Keyboard & Font Page',
	name: 'keyboard_or_font_page',
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
			return { title: title || 'Keyboard And Font Page', subtitle: subtitle, media };
		}
	}
};

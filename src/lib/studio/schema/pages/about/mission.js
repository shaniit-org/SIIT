export default {
	title: 'About Mission',
	name: 'aboutMission',
	type: 'object',
	fields: [
		{
			title: 'Title',
			name: 'title',
			type: 'string'
		},
		{
			title: 'Image',
			name: 'image',
			type: 'image'
		},
		{
			title: 'Description',
			name: 'description',
			type: 'blockContent'
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
			return { title: title || 'About Mission', subtitle: subtitle, media };
		}
	}
};

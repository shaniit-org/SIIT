export default [
	{
		group: 'header',
		name: 'headerLogo',
		type: 'image',
		title: 'Logo'
	},
	{
		group: 'header',
		title: 'Header Links',
		type: 'object',
		name: 'headerLinks',
		fields: [
			{
				name: 'links',
				type: 'array',
				title: 'Links',
				of: [{ type: 'link' }]
			}
		],
		preview: {
			select: {
				title: 'title'
			},
			/**
			 * @param {import('sanity').PreviewProps} props
			 */
			prepare({ title }) {
				return {
					title: title
					// media: MdLink,
				};
			}
		}
	}
];

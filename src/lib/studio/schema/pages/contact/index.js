import { FaAddressCard } from 'react-icons/fa';
export default {
	icon: FaAddressCard,
	id: 'contactPage',
	title: 'Contact Page',
	name: 'contactPage',
	type: 'document',
	fields: [
		{
			title: 'seo',
			name: 'seo',
			type: 'seo'
		},
		{
			title: 'Title',
			name: 'title',
			type: 'string'
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
			return { title: title || 'Contact Page', subtitle: subtitle, media };
		}
	}
};

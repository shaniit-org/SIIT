import { FaDollarSign } from 'react-icons/fa';
export default {
	icon: FaDollarSign,
	id: 'donatePage',
	title: 'Donate Page',
	name: 'donatePage',
	type: 'document',
	fields: [
		{ title: 'SEO', name: 'seo', type: 'seo' },
		{ title: 'Title', name: 'title', type: 'string' },
		{ title: 'CoverImage', name: 'coverImage', type: 'image' },
		{ title: 'Content', name: 'content', type: 'blockContent' },
		{
			title: 'Payment Methods Description',
			name: 'payment_methods_description',
			type: 'string'
		},
		{
			title: 'Payment Methods',
			name: 'payment_methods',
			type: 'array',
			of: [{ type: 'payment_method' }]
		},
		{
			title: 'Donate Roadmap',
			name: 'donate_roadmap',
			type: 'donate_roadmap'
		}
	],
	preview: { select: { title: 'seo.title', media: 'seo.ogImage' } }
};

import { FaCrosshairs } from 'react-icons/fa';

export default {
	icon: FaCrosshairs,
	title: 'Donate Raadmap',
	name: 'donate_roadmap',
	type: 'object',
	fields: [
		{
			title: 'Title',
			name: 'title',
			type: 'string'
		},
		{
			title: 'Target %',
			name: 'target',
			type: 'number'
		},
		{
			title: 'Description',
			name: 'description',
			type: 'blockContent'
		}
	]
};

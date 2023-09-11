import { FaPeopleCarry } from 'react-icons/fa';
export default {
	icon: FaPeopleCarry,
	title: 'Donor',
	name: 'donator',
	type: 'document',
	fields: [
		{
			title: 'Name',
			name: 'name',
			type: 'string'
		},
		{
			title: 'Amount in USD',
			name: 'amount',
			type: 'number'
		}
	]
};

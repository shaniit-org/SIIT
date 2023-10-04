import { FaQuestion } from 'react-icons/fa';
export default {
	icon: FaQuestion,
	title: 'Faq',
	name: 'faq',
	type: 'document',
	fields: [
		{
			title: 'Question',
			name: 'question',
			type: 'string'
		},
		{
			title: 'Answer',
			name: 'answer',
			type: 'blockContent'
		}
	]
};

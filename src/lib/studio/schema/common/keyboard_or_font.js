import { FaFont } from 'react-icons/fa';
export default {
	icon: FaFont,
	title: 'Keyboard & Font',
	name: 'keyboard_or_font',
	type: 'document',
	fields: [
		{
			title: 'Title',
			name: 'title',
			type: 'string'
		},
		{
			title: 'Description',
			name: 'description',
			type: 'string'
		},

		{
			title: 'Type',
			name: 'type',
			type: 'string',
			options: {
				list: [
					{ title: 'Keyboard', value: 'keyboard' },
					{ title: 'Font', value: 'font' }
				]
			}
		},
		{
			title: 'OS',
			name: 'os',
			type: 'string',
			options: {
				list: [
					{ title: 'Windows', value: 'windows' },
					{ title: 'Mac', value: 'mac' },
					{ title: 'Linux', value: 'linux' },
					{ title: 'Android', value: 'android' },
					{ title: 'iOS', value: 'ios' }
				]
			}
		},
		{
			title: 'Download link',
			name: 'downloadlink',
			type: 'url'
		}
	]
};

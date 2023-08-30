export default {
	title: 'Author',
	name: 'author',
	type: 'document',
	fields: [
		{
			type: 'image',
			name: 'profile',
			title: 'Profile'
		},
		{
			title: 'Name',
			name: 'name',
			type: 'string'
		},
		{
			title: 'Role',
			name: 'role',
			type: 'string'
		},
		{
			title: 'Bio',
			name: 'bio',
			type: 'string'
		},
		{
			title: 'IsMember',
			name: 'isMember',
			type: 'boolean'
		},
		{
			title: 'Story',
			name: 'story',
			type: 'blockContent'
		},
		{
			title: 'socials',
			name: 'socials',
			type: 'array',
			of: [
				{
					type: 'link'
				}
			]
		}
	]
};

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
            prepare({ title }) {
                return {
                    title: title
                    // media: MdLink,
                };
            }
        }
    }
];

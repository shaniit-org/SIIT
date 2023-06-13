export default [
    {
        group: 'footer',
        name: 'footerCopyRight',
        type: 'blockContent',
        title: 'Footer CopyRight'
    },
    {
        group: 'footer',
        name: 'footerSocials',
        type: 'object',
        title: 'Socials',
        fields: [
            {
                name: 'socials',
                type: 'array',
                title: 'Footer socials',
                of: [
                    {
                        name: 'social',
                        type: 'object',
                        fields: [
                            {
                                name: 'icon',
                                type: 'image',
                                title: 'Icon'
                            },
                            {
                                name: 'url',
                                type: 'string',
                                title: 'URL'
                            }
                        ]
                    }
                ],
                preview: {
                    select: {
                        media: 'icon',
                        prepare({ media }) {
                            return {
                                title: 'Social',
                                media
                            };
                        }
                    }
                }
            }
        ]
    },
    {
        group: 'footer',
        title: 'Footer Links',
        type: 'object',
        name: 'footerLinks',
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

export default {
    id: 'faqPage',
    title: 'Faq Page',
    name: 'faqPage',
    type: 'document',
    fields: [
        {
            title: 'SEO',
            name: 'seo',
            type: 'seo'
        },
        {
            title: 'FAQ',
            type: 'array',
            name: 'faqs',
            of: [
                {
                    name: 'qanda',
                    type: 'object',
                    title: 'QandA',
                    fields: [
                        {
                            type: 'string',
                            name: 'category',
                            title: 'Category'
                        },
                        {
                            type: 'array',
                            name: 'qanda',
                            title: 'QandA',
                            of: [
                                {
                                    type: 'reference',
                                    to: [{ type: 'faq' }]
                                }
                            ]
                        }
                    ]
                }
            ]
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
            return { title: title || 'Faq Page', subtitle: subtitle, media };
        }
    }
};

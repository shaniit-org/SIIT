export default {
    id: 'faqPage',
    title: 'Faq  Page',
    name: 'faqPage',
    type: 'document',
    fields: [
        {
            title: 'SEO',
            name: 'seo',
            type: 'seo'
        },
        {
            title: 'Q&A',
            name: 'qanda',
            type: 'array',
            of: [
                {
                    title: 'Q&A',
                    name: 'qanda',
                    type: 'object',
                    fields: [
                        {
                            title: 'Category',
                            name: 'category',
                            type: 'string'
                        },
                        {
                            title: 'Q&A',
                            name: 'qanda',
                            type: 'array',
                            of: [
                                {
                                    type: 'faq'
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

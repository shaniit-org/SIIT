import { FaFlag } from 'react-icons/fa';
export default {
    icon: FaFlag,
    title: 'Event',
    name: 'event',
    type: 'document',
    fields: [
        {
            type: 'seo',
            name: 'seo',
            title: 'SEO'
        },
        {
            name: 'coverImage',
            type: 'image',
            title: 'Cover Image',
            options: {
                hotspot: true
            }
        },
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
            title: 'Publish Date',
            name: 'publishedAt',
            type: 'date'
        },
        {
            title: 'Slug',
            name: 'slug',
            type: 'slug',
            options: {
                source: 'title'
            }
        },
        {
            title: 'Categories',
            name: 'categories',
            type: 'array',
            of: [
                {
                    type: 'reference',
                    to: [
                        {
                            type: 'category'
                        }
                    ]
                }
            ]
        },

        {
            title: 'Body',
            name: 'body',
            type: 'blockContent'
        }
    ]
};

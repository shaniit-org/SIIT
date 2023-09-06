import { FaNewspaper } from 'react-icons/fa';
export default {
    icon: FaNewspaper,
    id: 'newsPage',
    title: 'News Page',
    name: 'newsPage',
    type: 'document',
    fields: [
        {
            title: 'seo',
            name: 'seo',
            type: 'seo'
        },
        {
            title: 'Title',
            name: 'title',
            type: 'string'
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
            return { title: title || 'News Page', subtitle: subtitle, media };
        }
    }
};

import { FaAdversal } from 'react-icons/fa';
export default {
    icon: FaAdversal,
    id: 'termsPage',
    title: 'Terms Page',
    name: 'termsPage',
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
            return { title: title || 'Terms Page', subtitle: subtitle, media };
        }
    }
};

import { FaFlag } from 'react-icons/fa';

export default {
    icon: FaFlag,
    id: 'eventsPage',
    title: 'Event Page',
    name: 'eventsPage',
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
            return { title: title || 'Events Page', subtitle: subtitle, media };
        }
    }
};

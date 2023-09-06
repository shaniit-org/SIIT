import { FaFont } from 'react-icons/fa';
export default {
    icon: FaFont,
    id: 'keyboardAndFont',
    title: 'Keyboard & Font Page',
    name: 'keyboard_or_font_page',
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
            return { title: title || 'Keyboard And Font Page', subtitle: subtitle, media };
        }
    }
};

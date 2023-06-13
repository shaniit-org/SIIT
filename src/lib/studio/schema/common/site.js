import header from './header';
import footer from './footer';
export default {
    name: 'site',
    title: 'Site Config',
    type: 'document',
    groups: [
        {
            name: 'seo',
            title: 'SEO'
        },
        {
            name: 'header',
            title: 'Header'
        },
        {
            name: 'footer',
            title: 'Footer'
        }
    ],

    fields: [
        {
            group: 'seo',
            name: 'ogImage',
            type: 'image',
            title: 'Default SEO Image',
            options: {
                accept: 'image/png, image/jpeg, image/webp'
            }
        },
        {
            group: 'seo',
            name: 'favicon',
            type: 'image',
            title: 'Favicon',
            options: {
                accept: 'image/png, image/jpeg, image/webp'
            }
        },
        ...header,
        ...footer
    ],
    preview: {
        select: {
            media: 'logo'
        },
        prepare({ media }) {
            return {
                title: 'Site Config',
                media
            };
        }
    }
};

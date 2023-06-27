const ATOZ = Array.from(Array(26)).map((e, i) => ({
    title: String.fromCharCode(i + 65),
    value: String.fromCharCode(i + 65)
}));

export default {
    title: 'Term',
    name: 'term',
    type: 'document',
    fields: [
        {
            type: 'seo',
            name: 'seo',
            title: 'SEO'
        },
        {
            type: 'string',
            name: 'character',
            title: 'character',
            options: {
                list: ATOZ
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
            title: 'Slug',
            name: 'slug',
            type: 'slug',
            options: {
                source: 'title'
            }
        },
        {
            title: 'Body',
            name: 'body',
            type: 'blockContent'
        }
    ]
};

export default {
    title: 'NLP Tool',
    name: 'nlp_tool',
    type: 'object',
    fields: [
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
            title: 'Download link',
            name: 'downloadlink',
            type: 'url'
        }
    ]
};

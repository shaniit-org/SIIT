/**
 * @param {import('sanity/desk').StructureBuilder} S
 * @param  {{ schemaType: string, id: string, title: string }} param1
 */
const documentItem = (S, { schemaType, id, title }) => {
    return S.listItem()
        .title(title)
        .schemaType(schemaType)
        .child(S.document().schemaType(schemaType).id(id).title(title));
};

/**
 * @param {import('sanity/desk').StructureBuilder} S
 */
export function newDeskStructure(S) {
    return S.list()
        .title('Content')
        .id('__root__')
        .items([
            documentItem(S, {
                title: 'Site Config',
                id: 'site',
                schemaType: 'site'
            }),
            S.divider(),
            documentItem(S, {
                title: 'Home',
                id: 'homePage',
                schemaType: 'homePage'
            }),
            documentItem(S, {
                title: 'About Page',
                id: 'aboutPage',
                schemaType: 'aboutPage'
            }),
            documentItem(S, {
                title: 'Faq Page',
                id: 'faqPage',
                schemaType: 'faqPage'
            }),
            documentItem(S, {
                title: 'NLP Page',
                id: 'nlpPage',
                schemaType: 'nlpPage'
            }),
            documentItem(S, {
                title: 'Keyboard And Font Page',
                id: 'keyboard_or_font_page',
                schemaType: 'keyboard_or_font_page'
            }),
            documentItem(S, {
                title: 'News Page',
                id: 'newsPage',
                schemaType: 'newsPage'
            }),
            documentItem(S, {
                title: 'Events Page',
                id: 'eventsPage',
                schemaType: 'eventsPage'
            }),
            documentItem(S, {
                title: 'UserGuide Page',
                id: 'userGuidePage',
                schemaType: 'userGuidePage'
            }),
            documentItem(S, {
                title: 'Terms Page',
                id: 'termsPage',
                schemaType: 'termsPage'
            }),
            documentItem(S, {
                title: 'Contact Page',
                id: 'contactPage',
                schemaType: 'contactPage'
            }),
            documentItem(S, {
                title: 'Donate Page',
                id: 'donatePage',
                schemaType: 'donatePage'
            }),
            S.divider(),
            ...S.documentTypeListItems().filter(
                (item) =>
                    ![
                        'site',
                        'homePage',
                        'faqPage',
                        'keyboard_or_font_page',
                        'nlpPage',
                        'aboutPage',
                        'newsPage',
                        'termsPage',
                        'contactPage',
                        'eventsPage',
                        'userGuidePage',
                        'donatePage'
                    ].includes(item.getId() ?? '')
            )
        ]);
}

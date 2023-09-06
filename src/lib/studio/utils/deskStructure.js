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
                title: 'About',
                id: 'aboutPage',
                schemaType: 'aboutPage'
            }),
            documentItem(S, {
                title: 'Faqs',
                id: 'faqPage',
                schemaType: 'faqPage'
            }),
            documentItem(S, {
                title: 'NLP',
                id: 'nlpPage',
                schemaType: 'nlpPage'
            }),
            documentItem(S, {
                title: 'Keyboards & Fonts',
                id: 'keyboard_or_font_page',
                schemaType: 'keyboard_or_font_page'
            }),
            documentItem(S, {
                title: 'News Articles',
                id: 'newsPage',
                schemaType: 'newsPage'
            }),
            documentItem(S, {
                title: 'Events Articles',
                id: 'eventsPage',
                schemaType: 'eventsPage'
            }),
            documentItem(S, {
                title: 'UserGuides',
                id: 'userGuidePage',
                schemaType: 'userGuidePage'
            }),
            documentItem(S, {
                title: 'Terms',
                id: 'termsPage',
                schemaType: 'termsPage'
            }),
            documentItem(S, {
                title: 'Contact',
                id: 'contactPage',
                schemaType: 'contactPage'
            }),
            documentItem(S, {
                title: 'Donate',
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

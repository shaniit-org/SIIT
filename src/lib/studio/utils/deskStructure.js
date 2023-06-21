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
				title: 'Faq Page',
				id: 'faqPage',
				schemaType: 'faqPage'
			}),
			documentItem(S, {
				title: 'Keyboard And Font Page',
				id: 'keyboard_or_font_page',
				schemaType: 'keyboard_or_font_page'
			}),
			S.divider(),
			...S.documentTypeListItems().filter(
				(item) =>
					!['site', 'homePage', 'faqPage', 'keyboard_or_font_page'].includes(item.getId() ?? '')
			)
		]);
}

const documentItem = (S, { schemaType, id, title }) => {
	return S.listItem()
		.title(title)
		.schemaType(schemaType)
		.child(S.document().schemaType(schemaType).id(id).title(title));
};

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
				title: 'Faq',
				id: 'faqPage',
				schemaType: 'faqPage'
			}),
			S.divider(),
			...S.documentTypeListItems().filter(
				(item) => !['site', 'homePage', 'faqPage'].includes(item.getId() ?? '')
			)
		]);
}

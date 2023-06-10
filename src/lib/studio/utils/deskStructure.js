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
			S.divider(),
			...S.documentTypeListItems().filter(
				(item) => !['site', 'homePage'].includes(item.getId() ?? '')
			)
		]);
}

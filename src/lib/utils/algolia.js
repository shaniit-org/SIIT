import algoliasearch from 'algoliasearch/lite';

import { autocomplete, getAlgoliaResults } from '@algolia/autocomplete-js';

const APP_ID = import.meta.env.VITE_ALGOLIA_ID;
const API = import.meta.env.VITE_ALGOLIA_API;

const searchClient = algoliasearch(APP_ID, API);

export function init_autocomplete() {
	autocomplete({
		placeholder: 'Search',
		classNames: {
			detachedSearchButton: 'aa-input-d',
			detachedSearchButtonIcon: 'aa-input-d-i',
			detachedSearchButtonQuery: 'aa-input-d-q',
			detachedSearchButtonPlaceholder: 'aa-input-d-p',
			inputWrapper: 'form-group'
		},
		detachedMediaQuery: '',
		container: '#autocomplete',
		insights: true,
		getSources({ query }) {
			return [
				{
					sourceId: 'news',
					getItems() {
						return getAlgoliaResults({
							searchClient,
							queries: [
								{
									indexName: 'news',
									query,
									params: {
										hitsPerPage: 5,
										attributesToSnippet: ['title:10', 'description:35'],
										snippetEllipsisText: '…'
									}
								},

								{
									indexName: 'events',
									query,
									params: {
										hitsPerPage: 5,
										attributesToSnippet: ['title:10', 'description:35'],
										snippetEllipsisText: '…'
									}
								}
							]
						});
					},
					templates: {
						item({ item, components, html }) {
							return html`<a
								href="/${item.__autocomplete_indexName}/${item.slug}"
								class="flex flex-col cursor-pointer p-2"
							>
								<div class="text-theme-dark">
									${components.Highlight({
										hit: item,
										attribute: 'title'
									})}
									<span class="px-2 py-1 bx--tag bx--tag--blue bx--tax--sm max-w-max my-2">
										${item.__autocomplete_indexName}
									</span>
								</div>
								<div class="text-theme-dark/80 text-sm">
									${components.Snippet({
										hit: item,
										attribute: 'description'
									})}
								</div>
							</a>`;
						}
					}
				}
			];
		}
	});
}

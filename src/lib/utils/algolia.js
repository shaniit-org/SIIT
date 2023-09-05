import algoliasearch from 'algoliasearch/lite';
import instantsearch from 'instantsearch.js';
import { searchBox, hits } from 'instantsearch.js/es/widgets';

const APP_ID = import.meta.env.VITE_ALGOLIA_ID;
const API = import.meta.env.VITE_ALGOLIA_API;

const searchClient = algoliasearch(APP_ID, API);

export const search = instantsearch({
    indexName: 'news',
    searchClient
});

/*  check if on browser */
if (typeof window !== 'undefined') {
    search.addWidgets([
        searchBox({
            container: '#searchbox',
            placeholder: 'Search',
            showSubmit: false,
            cssClasses: {
                root: 'searchbox_input'
            },
            showReset: false
        }),
        hits({
            container: '#hits',
            cssClasses: {
                root: 'hits_result',
                item: 'hits_result_item'
            },
            templates: {
                item: `
                    <a href="/news/{{slug}}" class="hits_result_item_link">
                        <div class="hits_result_item_title">{{title}}</div>
                        <div class="hits_result_item_description">{{description}}</div>
                    </a>
                `
            }
        })
    ]);
}

export const algoliaConfig = {
    appId: APP_ID,
    apiKey: API,
    searchKey: API
};

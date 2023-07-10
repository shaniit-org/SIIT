<script>
	import { Modal } from 'carbon-components-svelte';
	import Search from 'svelte-algolia';
	import { algoliaConfig } from '../../../lib/utils/algolia';
	import Hits from './algolia/Hits.svelte';
	console.log(algoliaConfig);
	let open = true;
	console.log(algoliaConfig);
</script>

<Modal
	bind:open
	modalHeading="Search"
	selectorPrimaryFocus="#db-name"
	on:click:button--secondary={() => (open = false)}
	on:open
	size="xs"
	on:close
	on:submit
>
	<Search
		{...algoliaConfig}
		indices={{
			news: Hits
		}}
	/>
	<div id="hits" />
</Modal>

<script>
	import '@algolia/autocomplete-theme-classic';
	import '$lib/styles/onedark.css';
	import '$lib/styles/app.css';
	import 'iconify-icon';

	import { initializeStores } from '@skeletonlabs/skeleton';
	import Container from '$lib/components/common/Container.svelte';
	initializeStores();
</script>

<Container>
	<slot name="seo" />
	<slot />
</Container>

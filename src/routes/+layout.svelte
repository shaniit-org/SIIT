<script>
	import '@algolia/autocomplete-theme-classic';
	import '$lib/styles/onedark.css';
	import '$lib/styles/app.css';
	import 'iconify-icon';
  import { partytownSnippet } from '@builder.io/partytown/integration'

	import { initializeStores } from '@skeletonlabs/skeleton';
	import Container from '$lib/components/common/Container.svelte';
	initializeStores();
</script>

<svelte:head>
  {@html '<script>' + partytownSnippet() + '</script>'}
</svelte:head>

<Container>
	<slot name="seo" />
	<slot />
</Container>

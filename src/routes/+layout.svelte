<script>
	import '@algolia/autocomplete-theme-classic';
	import '$lib/styles/onedark.css';
	import '$lib/styles/app.css';
	import Container from '$lib/components/common/Container.svelte';
</script>

<Container>
	<slot name="seo" />
	<slot />
</Container>

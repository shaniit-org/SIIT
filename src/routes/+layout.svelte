<script>
	import { initAnalytics } from '$lib/utils/analytics';
	import 'carbon-components-svelte/css/g10.css';
	import '@algolia/autocomplete-theme-classic';
	import '@carbon/charts-svelte/styles.css';
	import '$lib/styles/onedark.css';
	import '$lib/styles/app.css';
	import Container from '$lib/components/common/Container.svelte';
	import { onMount } from 'svelte';

	onMount(() => {
		initAnalytics();
	});
</script>

<Container>
	<slot name="seo" />
	<slot />
</Container>

<script>
	import { init_autocomplete } from '../../utils/algolia';
	import { onMount } from 'svelte';
	onMount(() => {
		init_autocomplete();
	});
</script>

<div id="autocomplete" />

<style>
</style>

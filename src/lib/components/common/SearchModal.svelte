<script>
	import { Modal } from 'carbon-components-svelte';

	import { init_autocomplete } from '../../utils/algolia';

	import { onMount } from 'svelte';
	/**
	 * @type boolean
	 */
	export let open;
	/**
	 * @type any
	 * @returns void
	 */
	export let toggle;
	onMount(() => {
		init_autocomplete();
	});
</script>

<div id="autocomplete" />

<style>
</style>

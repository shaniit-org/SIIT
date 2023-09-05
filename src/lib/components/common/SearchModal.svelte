<script>
	import { Modal } from 'carbon-components-svelte';
	import { onMount } from 'svelte';
	import { search } from '../../../lib/utils/algolia';
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
		search.start();
	});
</script>

<Modal passiveModal hasScrollingContent on:close={toggle} bind:open modalHeading="Search" size="sm">
	<div class="search_modal">
		<div id="searchbox" />
		<div id="hits" class="hits_result" />
	</div>
</Modal>

<style>
	.search_modal :global(form) {
		display: flex;
		align-items: center;
		gap: 1em;
		position: sticky;
		top: 0;
	}
	.search_modal :global(form) :global(input) {
		width: 100%;
		padding-inline: 1em;
		padding-block: 0.7em;
		background: #f4f4f4;
		border-radius: 1px;
		outline: none;
		color: #222;
		margin-bottom: 2em;
	}

	.hits_result {
		color: black;
		display: flex;
		gap: 1em;
		flex-direction: column;
		max-height: 300px;
		min-height: 300px;
	}

	.hits_result :global(ol) {
		display: flex;
		flex-direction: column;
		gap: 1em;
		font-size: 1rem;
	}

	:global(.hits_result_item) {
		width: 100%;
		border-left: solid 2px transparent;
		padding-left: 0.7em;
	}

	:global(.hits_result_item):hover {
		border-color: #e8e8e8;
	}

	:global(.hits_result_item_link):hover {
		color: blue;
	}

	:global(.hits_result_item_description) {
		font-size: 0.8rem;
		margin-top: 0.5em;
		color: #666;
	}
</style>

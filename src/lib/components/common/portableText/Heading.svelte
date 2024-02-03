<script>
	/**
	 *  @type {import("@portabletext/svelte").BlockComponentProps}>
	 */
	export let portableText;
	const { style, children } = portableText.value;
	const anchorId = children[0]?._key;
</script>

{#if style === 'h1'}
	<h1 class="h1 font-bold mb-4 mt-4" id={anchorId}>
		<slot />
	</h1>
{:else if style === 'h2'}
	<h2 class="h2 font-bold mb-4 mt-4" id={anchorId}>
		<slot />
	</h2>
{:else if style === 'h3'}
	<h3 class="h3 font-bold mb-4 mt-4" id={anchorId}>
		<slot />
	</h3>
{:else}
	<h4 class="h4 font-bold mb-4 mt-4" id={anchorId}>
		<slot />
	</h4>
{/if}

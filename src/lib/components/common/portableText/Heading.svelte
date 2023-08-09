<script>
	/**
	 *  @type {import("@portabletext/svelte").BlockComponentProps}>
	 */
	export let portableText;
	const { style, children } = portableText.value;
	const anchorId = children[0]?._key;
</script>

{#if style === 'h1'}
	<h1
		class="font-bold text-3xl cursor-pointer lg:text-4xl lg:leading-[1.2] flex gap-2"
		id={anchorId}
	>
		<slot />
	</h1>
{:else if style === 'h2'}
	<h2 class="text-xl md:text-3xl font-bold" id={anchorId}>
		<slot />
	</h2>
{:else if style === 'h3'}
	<h3 class="text-lg md:text-2xl font-bold" id={anchorId}>
		<slot />
	</h3>
{:else}
	<h4 class="text-base md:text-xl font-bold" id={anchorId}>
		<slot />
	</h4>
{/if}

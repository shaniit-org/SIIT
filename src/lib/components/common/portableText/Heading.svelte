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
		class="font-bold text-3xl cursor-pointer lg:text-4xl lg:leading-[1.2] my-6 flex gap-2"
		id={anchorId}
	>
		<slot />
	</h1>
{:else if style === 'h2'}
	<h2 class="text-xl md:text-3xl mt-8 mb-4 md:mb-6 font-bold" id={anchorId}>
		<slot />
	</h2>
{:else if style === 'h3'}
	<h3 class="text-lg md:text-2xl mt-6 mb-2 md:mb-4 font-bold" id={anchorId}>
		<slot />
	</h3>
{:else}
	<h4 class="text-base md:text-xl mt-6 mb-2 md:mb-4 font-bold" id={anchorId}>
		<slot />
	</h4>
{/if}

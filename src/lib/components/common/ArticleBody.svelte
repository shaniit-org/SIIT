<script>
	import PortableText from '$lib/components/common/portableText/PortableText.svelte';

	/**
	 *  @type {import('@portabletext/svelte/dist/ptTypes').InputValue}
	 */
	export let data;
</script>

<article class="flex flex-row flex-wrap section-container mx-auto border box">
	<div class="grow basis-1/2">
		<PortableText value={data} />
	</div>
	<div class="basis-1/3 order-1" id="toc" />
</article>

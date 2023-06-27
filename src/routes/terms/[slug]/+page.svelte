<script>
	import PortableText from '$lib/components/common/portableText/PortableText.svelte';
	import TermHero from '$lib/components/common/TermHero.svelte';
	/**
	 * @type {{data: import('../../../lib/types/termPage').Term}} - data
	 */
	export let data;
</script>

<div class="min-h-screen">
	<TermHero charType={data.data.type} title={data.data.title} description={data.data.description} />

	<div class="p-4 md:p-12 max-w-[1000px] mx-auto">
		<PortableText value={data.data.body} />
	</div>
</div>

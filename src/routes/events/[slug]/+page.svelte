<script>
	import TableOfContents from '$lib/components/common/TableOfContents.svelte';
	import ArticleBanner from '$lib/components/common/ArticleBanner.svelte';
	import PortableText from '$lib/components/common/portableText/PortableText.svelte';
	/**
	 * @type {{ data : import('../../../lib/types').EventDetail}} - data
	 */
	export let data;
	const { data: event } = data;
</script>

<div class="min-h-screen">
	<ArticleBanner title={event.title} publishedAt={event.publishedAt} />
	<div
		class="relative p-4 md:p-12 grid grid-cols-1 lg:grid-cols-[1fr_300px] mx-auto section-container gap-4 md:gap-8"
	>
		<div class="md:col-start-2 min-w-[200px] scroll-pt-20" />
		<div class="md:col-start-1 md:row-start-1">
			<PortableText value={event.body} />
		</div>
	</div>
</div>

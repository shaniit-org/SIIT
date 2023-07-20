<script>
	import TableOfContents from '$lib/components/common/TableOfContents.svelte';
	import EventBanner from '$lib/components/common/EventBanner.svelte';
	import Meta from '$lib/components/common/Meta.svelte';
	import PortableText from '$lib/components/common/portableText/PortableText.svelte';
	import RelatedArticle from '$lib/components/common/RelatedArticle.svelte';
	/**
	 * @type {{ data : import('../../../lib/types').EventDetail}} - data
	 */
	export let data;
	$: ({ data: event } = data);
</script>

<Meta data={event.seo} />
<div class="min-h-screen">
	<EventBanner
		title={event.title}
		publishedAt={event.publishedAt}
		description={event.description}
		authors={event.authors}
		readingTime={event.readingTime}
	/>
	<div
		class="relative p-4 md:p-12 grid grid-cols-1 lg:grid-cols-[1fr_300px] mx-auto section-container gap-4 md:gap-8"
	>
		<div class="md:col-start-2 min-w-[200px] scroll-pt-20">
			<TableOfContents />
		</div>
		<div class="md:col-start-1 md:row-start-1">
			<PortableText value={event.body} />
		</div>
	</div>
	<RelatedArticle data={event.related} />
</div>

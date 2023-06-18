<script>
	import PortableText from '$lib/components/common/portableText/PortableText.svelte';
	import ArticleBanner from '$lib/components/common/ArticleBanner.svelte';
	import TableOfContents from '$lib/components/common/TableOfContents.svelte';

	/**
	 * @type {{ data : import('../../../lib/types').NewsDetail}} - data
	 */
	export let data;
	const { data: news } = data;
</script>

<div class="min-h-screen">
	<ArticleBanner title={news.title} authors={news.authors} publishedAt={news.publishedAt} />
	<div
		class="relative p-4 md:p-12 grid grid-cols-1 lg:grid-cols-[1fr_300px] mx-auto section-container gap-4 md:gap-8"
	>
		<div class="md:col-start-2 min-w-[200px] scroll-pt-20">
			<TableOfContents data={news.body} />
		</div>
		<div class="md:col-start-1 md:row-start-1">
			<PortableText value={news.body} />
		</div>
	</div>
</div>

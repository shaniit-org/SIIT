<script>
	import TableOfContents from '$lib/components/common/TableOfContents.svelte';
	import PortableText from '$lib/components/common/portableText/PortableText.svelte';
	import SocialShare from '$lib/components/common/SocialShare.svelte';
	import ArticleBanner from '$lib/components/common/ArticleBanner.svelte';
	import RelatedArticle from '$lib/components/common/RelatedArticle.svelte';
	import Meta from '$lib/components/common/Meta.svelte';
	/**
	 * @type {{ data : import('../../../lib/types').NewsDetail}} - data
	 */
	export let data;
	$: ({ data: news } = data);
</script>

<Meta data={news.seo} />
<div class="min-h-screen">
	<ArticleBanner
		description={news.description}
		title={news.title}
		authors={news.authors}
		publishedAt={news.publishedAt}
		readingTime={news.readingTime}
	/>
	<div class="relative p-4 md:p-12 grid grid-cols-1 mx-auto section-container gap-4 md:gap-8">
		<div class="md:col-start-2 min-w-[200px] lg:max-w-[300px] md:max-w-[200px] scroll-pt-20">
			<TableOfContents data={news.body} />
		</div>
		<div class="md:col-start-1 md:row-start-1 md:prose-lg lg:prose-xl max-w-[800px]">
			<PortableText value={news.body} />
			<SocialShare />
		</div>
	</div>
	<RelatedArticle data={news.related} />
</div>

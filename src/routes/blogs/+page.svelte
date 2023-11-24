<script>
	import SubHero from '$lib/components/common/SubHero.svelte';
	import Meta from '$lib/components/common/Meta.svelte';
	import News from '$lib/components/page/news/news.svelte';
	/**
	 * @type {{data:import('../../lib/types/newsPage').NewsPage}} - data
	 */
	export let data;
	let { title, news, seo, categories } = data.data;
	console.log(categories);
</script>

<Meta data={seo} />
<SubHero {title} />
<News data={news} {categories} />

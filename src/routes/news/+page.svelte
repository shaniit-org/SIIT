<script>
	import SubHero from '$lib/components/common/SubHero.svelte';
	import News from '$lib/components/page/news/news.svelte';
	/**
	 * @type {{data:import('../../lib/types').News[]}} - data
	 */
	export let data = { data: [] };
</script>

<SubHero title="Latest News" />

<News {data} />

<script>
	import Hero from '$lib/components/page/home/Hero.svelte';
	import HighLight from '$lib/components/page/home/Highlight.svelte';
	import News from '$lib/components/page/home/News.svelte';
	import Donate from '$lib/components/page/home/Donate.svelte';
	import Events from '$lib/components/page/home/Events.svelte';
	import Meta from '$lib/components/common/Meta.svelte';
	/*
	 * @type {import('$lib/types').PageData<import('../lib/types/homePage').HomePageData>}
	 */
	export let data;
	const { events, news } = data.data;
	const { homePage } = data.data;
	const { sections, seo, term } = homePage;
	console.log(term);
</script>

<Meta data={seo} />
<div>
	{#each sections as sec}
		{#if sec._type === 'Hero'}
			<Hero data={sec} {term} />
		{/if}
		{#if sec._type === 'Highlight'}
			<HighLight data={sec} />
		{/if}
		{#if sec._type === 'News'}
			<News data={news} />
		{/if}
		{#if sec._type === 'Events'}
			<Events data={events} />
		{/if}
		{#if sec._type === 'Donate'}
			<Donate data={sec} />
		{/if}
	{/each}
</div>

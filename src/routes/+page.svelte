<script>
	// @ts-nocheck

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
</script>

<Meta data={seo} />
{#each sections as s}
	{#if s._type === 'Hero'}
		<Hero data={s} />
	{/if}
	{#if s._type === 'Highlight'}
		<HighLight data={s} {term} />
	{/if}
	{#if s._type === 'News'}
		<News data={news} section={s} />
	{/if}
	{#if s._type === 'Events'}
		<Events data={events} section={s} />
	{/if}
	{#if s._type === 'Donate'}
		<Donate data={s} />
	{/if}
{/each}

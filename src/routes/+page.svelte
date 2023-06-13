<script>
	import Hero from '$lib/components/page/home/Hero.svelte';
	import HighLight from '$lib/components/page/home/Highlight.svelte';
	import News from '$lib/components/page/home/News.svelte';
	import Donate from '$lib/components/page/home/Donate.svelte';
	import Events from '$lib/components/page/home/Events.svelte';
	/*
	 * @type {import('$lib/types').PageData<import('$lib/types/homePage').HomePageData>}
	 */
	export let data;
	console.log(data);
</script>

<Hero />
<HighLight />
<News />
<Donate />
<Events />

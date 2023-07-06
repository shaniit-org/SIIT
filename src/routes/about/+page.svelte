<script>
	import SubHero from '$lib/components/common/SubHero.svelte';
	import Meta from '$lib/components/common/Meta.svelte';
	import Banner from '$lib/components/page/about/Banner.svelte';
	import About from '$lib/components/page/about/About.svelte';
	import Team from '$lib/components/page/about/Team.svelte';
	import Mission from '$lib/components/page/about/Mission.svelte';
	/**
	 * @type {{data:import('$lib/types/aboutPage').AboutPageData;}}
	 */
	export let data;
</script>

<Meta data={data.data.seo} />
<div class="w-full min-h-screen flex flex-col gap-6 md:gap-12">
	<SubHero title="About Us" />
	{#each data.data.sections as sec}
		{#if sec._type === 'aboutBanner'}
			<About data={sec} />
		{/if}
		{#if sec._type === 'rowBanner'}
			<Banner data={sec} />
		{/if}
		{#if sec._type === 'aboutMission'}
			<Mission data={sec} />
		{/if}
	{/each}
	<Team data={data.data.teamMembers} />
</div>

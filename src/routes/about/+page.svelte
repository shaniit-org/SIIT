<script>
	import SubHero from '$lib/components/common/SubHero.svelte';
	import Banner from '$lib/components/page/home/Banner.svelte';
	import About from '$lib/components/page/about/About.svelte';
	import Team from '$lib/components/page/about/Team.svelte';
	import Mission from '$lib/components/page/about/Mission.svelte';
</script>

<div class="w-full min-h-screen flex flex-col gap-6 md:gap-12">
	<SubHero title="About Us" />
	<About />
	<Banner />
	<Mission />
	<Team />
</div>

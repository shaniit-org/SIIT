<script>
	import PortableText from '$lib/components/common/portableText/PortableText.svelte';
	import { LinkedIn, Facebook, Twitter } from 'svelte-share-buttons-component';
	import TableOfContents from '$lib/components/common/TableOfContents.svelte';
	import TermHero from '$lib/components/common/TermHero.svelte';
	import { onMount } from 'svelte';
	/**
	 * @type {{data: import('../../../lib/types/termPage').Term}} - data
	 */
	export let data;
	let url;
	onMount(() => {
		url = window.location.href;
	});
</script>

<div class="min-h-screen">
	<TermHero charType={data.data.type} title={data.data.title} description={data.data.description} />

	<div class="relative p-4 md:p-12 grid grid-cols-1 mx-auto section-container gap-4 md:gap-8">
		<div class="md:col-start-2 min-w-[200px] lg:max-w-[300px] md:max-w-[200px] scroll-pt-20">
			<TableOfContents data={data.data.body} />
		</div>
		<div class="md:col-start-1 md:row-start-1 flex flex-col">
			<PortableText value={data.data.body} />

			<div class="flex gap-2 mt-4 ml-auto">
				<Twitter
					class="text-base bg-transparent flex items-center max-w-max"
					text={data.data.title}
					{url}
				/>
				<Facebook
					class="text-base bg-transparent flex items-center max-w-max"
					text={data.data.title}
					{url}
				/>
				<LinkedIn
					class="text-base bg-transparent flex items-center max-w-max"
					text={data.data.title}
					{url}
				/>
			</div>
		</div>
	</div>
</div>

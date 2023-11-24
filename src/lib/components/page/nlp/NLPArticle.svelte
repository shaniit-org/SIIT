<script>
	import SanityImage from '$lib/sanity/image/SanityImage.svelte';
	import { Button } from 'carbon-components-svelte';
	import { Link } from 'carbon-icons-svelte';
	/** @type {import('$lib/types').News}*/
	export let data;
</script>

<div class="cursor-pointer flex flex-col gap-8 md:flex-row md:gap-12">
	<div class="w-full h-full aspect-video md:max-w-[260px] shrink-0">
		<SanityImage image={data.coverImage} className="w-full " />
	</div>
	<div class="flex flex-col justify-center">
		<h2 class="text-2xl mb-2 md:mb-2">
			{data.title}
		</h2>
		<span class=" mb-4"> May 15th, 2023 </span>
		<p class="mb-4 text-sm">
			{data.description}
		</p>
		<Button
			size="field"
			href="/blogs/{data.slug}"
			class="text-white border border-blue-500  max-w-max"
			icon={Link}>Read More</Button
		>
	</div>
</div>

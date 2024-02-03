<script>
	import SanityImage from '$lib/sanity/image/SanityImage.svelte';
	/**
	 * @type {import('../../../types/aboutPage').AboutBanner} - data
	 */
	export let data;
</script>

<div
	class="section-container box flex gap-6 items-center md:gap-12 md:flex-row w-full flex-col py-12"
>
	<div class="basis-1/2 grow flex justify-center flex-col">
		<h2 class="h2 mb-4">{data.title}</h2>
		<p class="leading-loose">
			{data.description}
		</p>
	</div>
	<div class="basis-1/2 grow aspect-video flex items-center">
		<SanityImage
			image={data.image}
			alt="image"
			className="w-full aspect-video object-cover rounded-token"
		/>
	</div>
</div>

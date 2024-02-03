<script>
	import SanityImage from '$lib/sanity/image/SanityImage.svelte';
	import PortableText from '$lib/components/common/portableText/PortableText.svelte';
	/** @type {import('$lib/types/aboutPage').AboutMission} */
	export let data;
</script>

<div class="flex section-container box">
	<div class="flex gap-6 items-center md:gap-12 md:flex-row w-full flex-col md:py-12">
		<div class="basis-1/2 grow aspect-video flex items-center">
			<SanityImage
				maxWidth={600}
				image={data.image}
				alt="image"
				className="w-full aspect-video object-cover rounded-token"
			/>
		</div>
		<div class="basis-1/2 grow flex justify-center flex-col">
			<h2 class="h2 mb-2">{data.title}</h2>
			<div class="w-full">
				<PortableText value={data.description} />
			</div>
		</div>
	</div>
</div>

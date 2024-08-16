<script>
	import moment from 'moment';
	import SanityImage from '$lib/sanity/image/SanityImage.svelte';
	/**
	 * @type {import('../../types').Event}
	 */
	export let data;
</script>

<a
	href={`/events/${data.slug}`}
	class=" card card-hover p-6 cursor-pointer flex flex-col gap-8 md:flex-row md:gap-6 items-center"
>
	<div class="w-full h-full basis-[20%] aspect-video md:aspect-square md:max-w-[230px] shrink-0 overflow-hidden">
		<SanityImage
			className="rounded-xl w-full h-full object-cover"
			maxWidth={300}
			image={data.coverImage}
			alt={data.title}
		/>
	</div>
	<div class="flex flex-col mt-4">
		<h3 class="h3 font-bold md:mb-2">
			{data.title}
		</h3>
		<span class="md:mb-2 block font-domine text-surface-200 text-base mt-2 mb-6">
			{moment(data.publishedAt).format('LL')}
		</span>
		<p class="text-surface-300 text-sm leading-relaxed line-clamp-3 ">
			{data.description}
		</p>
	</div>
</a>

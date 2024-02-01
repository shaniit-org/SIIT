<script>
	import moment from 'moment';
	import SanityImage from '$lib/sanity/image/SanityImage.svelte';
	/**
	 * @type {import('../../types').News}
	 */
	export let data;
</script>

<a
	href={`/events/${data.slug}`}
	class="cursor-pointer card flex flex-col gap-4 p-4 md:p-6 variant-glass"
>
	<h3 class="h3 mb-2">
		{data.title}
	</h3>

	<SanityImage
		maxWidth={450}
		image={data.coverImage}
		alt={data.title}
		className="  rounded-2xl aspect-video w-full object-cover"
	/>
	<div class="flex flex-col">
		<p class="mb-2 leading-relaxed line-clamp-2">{data.description}</p>
		<span> {moment(data.publishedAt).format('LL')}</span>
	</div>
</a>

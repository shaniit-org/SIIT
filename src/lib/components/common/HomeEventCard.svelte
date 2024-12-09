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
	<h3 class="h3 mb-2 font-semibold dark:text-surface-100 text-xl">
		{data.title}
	</h3>

	<SanityImage
		maxWidth={450}
		image={data.coverImage}
		alt={data.title}
		className="mb-2 rounded-token aspect-video w-full object-cover"
	/>
	<div class="flex flex-col gap-4">
		<p class="dark:text-surface-200 leading-relaxed line-clamp-2">{data.description}</p>
		<span class="mb-4 dark:text-surface-300 text-sm"> {moment(data.publishedAt).format('LL')}</span>
	</div>
</a>

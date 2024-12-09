<script>
	import moment from 'moment';
	import SanityImage from '$lib/sanity/image/SanityImage.svelte';
	/**
	 * @type {import('../../../types').Event}
	 */
	export let data;
</script>

<a
	href={`/blogs/${data.slug}`}
	class=" card card-hover p-6 cursor-pointer flex flex-col gap-4 md:flex-row md:gap-6 items-center"
>
	<div class="w-full h-full basis-[24%] aspect-video md:max-w-[350px] shrink-0 overflow-hidden">
		<SanityImage
			className="rounded-token w-full h-full object-cover"
			maxWidth={300}
			image={data.coverImage}
			alt={data.title}
		/>
	</div>
	<div class="flex flex-col mt-4">
		<h3 class="h3 mb-3 font-semibold dark:text-surface-100 text-xl lg:text-2xl">
			{data.title}
		</h3>
		<span
			class="max-w-max mb-4 badge variant-ghost-surface font-san text-xs px-2 pt-2 rounded-token dark:text-surface-300 capitalize"
		>
			{moment(data.publishedAt).format('LL')}</span
		>
		<p class="dark:text-surface-200 leading-relaxed">{data.description}</p>
	</div>
</a>

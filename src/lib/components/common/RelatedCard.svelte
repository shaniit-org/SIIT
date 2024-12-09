<script>
	import moment from 'moment';
	import SanityImage from '$lib/sanity/image/SanityImage.svelte';
	/**
	 * @type {import('../../types').News}
	 */
	export let data;
	$: url = data._type === 'event' ? `/events/${data.slug}` : `/blogs/${data.slug}`;
</script>

<a href={url} class="cursor-pointer card flex flex-col gap-4 p-4 md:p-6">
	<h3 class="h3 mb-2 font-semibold dark:text-surface-100 text-xl">
		{data.title}
	</h3>
	<SanityImage
		maxWidth={450}
		image={data.coverImage}
		alt={data.title}
		className="rounded-token aspect-video w-full object-cover"
	/>
	<div class="flex flex-col">
		<span class="mb-4 dark:text-surface-300 text-sm"> {moment(data.publishedAt).format('LL')}</span>
		<p class="dark:text-surface-200 leading-relaxed line-clamp-2">{data.description}</p>
	</div>
	<div class="flex gap-2">
		{#each data.categories as item}
			<span
				class="badge variant-ghost-surface font-san text-xs px-2 pt-2 rounded-token dark:text-surface-300 capitalize"
				>{item.title}</span
			>
		{/each}
	</div>
</a>

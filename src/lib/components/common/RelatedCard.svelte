<script>
	import moment from 'moment';
	import SanityImage from '$lib/sanity/image/SanityImage.svelte';
	/**
	 * @type {import('../../types').News}
	 */
	export let data;
	$: url = data._type === 'event' ? `/events/${data.slug}` : `/blogs/${data.slug}`;
</script>

<a href={url} class="cursor-pointer hover:bg-theme-muted bg-white flex flex-col">
	<SanityImage
		maxWidth={450}
		image={data.coverImage}
		alt={data.title}
		className=" aspect-video w-full object-cover"
	/>
	<div class="flex-col justify-between p-4 flex gap-6">
		<h3 class="text-xl">
			{data.title}
		</h3>
		<div class="flex flex-col">
			<span class="text-gray-800 mb-2"> {data.description} </span>
			<span> {moment(data.publishedAt).format('LL')}</span>
		</div>
	</div>
</a>

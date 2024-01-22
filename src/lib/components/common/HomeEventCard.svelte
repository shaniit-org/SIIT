<script>
	import moment from 'moment';
	import SanityImage from '$lib/sanity/image/SanityImage.svelte';
	/**
	 * @type {import('../../types').News}
	 */
	export let data;
</script>

<a href={`/events/${data.slug}`} class="cursor-pointer card flex flex-col">
	<div class="p-4 md:p-8 md:pb-0 overflow-hidden">
		<SanityImage
			maxWidth={450}
			image={data.coverImage}
			alt={data.title}
			className=" aspect-video w-full object-cover"
		/>
	</div>
	<div class="flex-col md:p-8 justify-between p-4 flex gap-6">
		<h3 class="h3">
			{data.title}
		</h3>
		<div class="flex flex-col">
			<p>{data.description}</p>
			<span> {moment(data.publishedAt).format('LL')}</span>
		</div>
	</div>
</a>
